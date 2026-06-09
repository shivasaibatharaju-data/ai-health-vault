import re

import fitz

MED_PATTERNS = [
    r"metformin",
    r"lisinopril",
    r"atorvastatin",
    r"amlodipine",
    r"insulin",
    r"omeprazole",
]
ALLERGY_WORDS = ["allergy", "allergic", "allergies", "nkda"]
DIAGNOSIS_WORDS = ["diagnosis", "impression", "assessment", "condition", "history of"]
LAB_RE = re.compile(
    r"\b(A1C|HbA1c|glucose|cholesterol|HDL|LDL|triglycerides|creatinine|hemoglobin)\b[^\n]{0,80}",
    re.I,
)


def extract_pdf_text(path: str) -> str:
    with fitz.open(path) as document:
        pages = [page.get_text("text") for page in document]
        return "\n".join(pages).strip()


def rule_based_summary(text: str) -> dict:
    lower = text.lower()
    meds = sorted({m for m in MED_PATTERNS if re.search(m, lower)})
    allergies = []
    diagnoses = []
    for line in text.splitlines():
        clean = line.strip()
        if not clean:
            continue
        l = clean.lower()
        if any(w in l for w in ALLERGY_WORDS):
            allergies.append(clean[:220])
        if any(w in l for w in DIAGNOSIS_WORDS):
            diagnoses.append(clean[:220])
    labs = [m.group(0).strip() for m in LAB_RE.finditer(text)]
    return {
        "medications_found": meds[:20],
        "allergy_lines": allergies[:10],
        "diagnosis_related_lines": diagnoses[:10],
        "lab_related_lines": labs[:20],
    }
