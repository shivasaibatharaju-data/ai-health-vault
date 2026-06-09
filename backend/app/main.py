from pathlib import Path
from uuid import uuid4

from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .ai import answer_question, summarize_record
from .config import settings
from .db import Base, engine, get_db
from .extract import extract_pdf_text
from .models import Record
from .storage import persist_file


Base.metadata.create_all(bind=engine)
settings.upload_dir.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="AI Health Vault API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AskRequest(BaseModel):
    question: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/records/upload")
def upload_record(file: UploadFile = File(...), db: Session = Depends(get_db)):
    original_name = Path(file.filename or "record.pdf").name
    if Path(original_name).suffix.lower() != ".pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported in this MVP.")

    max_bytes = settings.max_upload_size_mb * 1024 * 1024
    contents = file.file.read(max_bytes + 1)
    if len(contents) > max_bytes:
        raise HTTPException(
            status_code=413,
            detail=f"PDF exceeds the {settings.max_upload_size_mb} MB upload limit.",
        )
    if not contents.startswith(b"%PDF"):
        raise HTTPException(status_code=400, detail="The uploaded file is not a valid PDF.")

    local_path = settings.upload_dir / f"{uuid4().hex}.pdf"
    local_path.write_bytes(contents)
    try:
        text = extract_pdf_text(str(local_path))
    except Exception as exc:
        local_path.unlink(missing_ok=True)
        raise HTTPException(status_code=422, detail="The PDF could not be processed.") from exc

    if not text:
        local_path.unlink(missing_ok=True)
        raise HTTPException(status_code=422, detail="No text found. Add OCR for scanned PDFs.")

    try:
        summary = summarize_record(text)
        stored_path = persist_file(local_path)
        record = Record(
            filename=original_name,
            file_path=stored_path,
            extracted_text=text,
            summary=summary,
        )
        db.add(record)
        db.commit()
        db.refresh(record)
    except Exception:
        db.rollback()
        local_path.unlink(missing_ok=True)
        raise

    return {"id": record.id, "filename": record.filename, "summary": record.summary}


@app.get("/records")
def list_records(db: Session = Depends(get_db)):
    records = db.query(Record).order_by(Record.created_at.desc()).all()
    return [
        {
            "id": record.id,
            "filename": record.filename,
            "summary": record.summary,
            "created_at": record.created_at,
        }
        for record in records
    ]


@app.post("/ask")
def ask(payload: AskRequest, db: Session = Depends(get_db)):
    question = payload.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question is required.")

    records = db.query(Record).all()
    combined = "\n\n".join(record.extracted_text for record in records)
    if not combined:
        raise HTTPException(status_code=404, detail="Upload a record first.")
    return {"answer": answer_question(question, combined)}
