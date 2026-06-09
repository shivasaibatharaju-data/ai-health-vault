import json
import re

from openai import OpenAI

from .config import settings
from .extract import rule_based_summary


WORD_RE = re.compile(r"[a-zA-Z0-9]+")


def _chunk_text(text: str, chunk_size: int = 1800, overlap: int = 250) -> list[str]:
    compact = re.sub(r"\n{3,}", "\n\n", text).strip()
    if not compact:
        return []

    chunks = []
    start = 0
    while start < len(compact):
        end = min(start + chunk_size, len(compact))
        chunks.append(compact[start:end])
        if end == len(compact):
            break
        start = end - overlap
    return chunks


def retrieve_relevant_context(question: str, records_text: str, max_chars: int = 16000) -> str:
    """Return the most relevant record chunks using lightweight lexical retrieval."""
    terms = {
        word.lower()
        for word in WORD_RE.findall(question)
        if len(word) > 2
    }
    chunks = _chunk_text(records_text)
    if not chunks:
        return ""
    if not terms:
        return "\n\n".join(chunks)[:max_chars]

    ranked = []
    for index, chunk in enumerate(chunks):
        lower = chunk.lower()
        score = sum(lower.count(term) for term in terms)
        ranked.append((score, -index, chunk))

    ranked.sort(reverse=True)
    selected = [chunk for score, _, chunk in ranked if score > 0]
    if not selected:
        selected = chunks
    return "\n\n---\n\n".join(selected)[:max_chars]


def summarize_record(text: str) -> str:
    if not settings.openai_api_key:
        return json.dumps(rule_based_summary(text), indent=2)

    client = OpenAI(api_key=settings.openai_api_key)
    prompt = f"""
You are organizing a patient's medical records. Do not give medical advice.
Return JSON with: conditions, medications, allergies, lab_results, procedures, dates, follow_up_questions.
Text:
{text[:12000]}
"""
    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role":"user","content":prompt}],
        temperature=0.1,
    )
    return res.choices[0].message.content or "{}"


def answer_question(question: str, records_text: str) -> str:
    context = retrieve_relevant_context(question, records_text)
    if not settings.openai_api_key:
        terms = {
            word.lower()
            for word in WORD_RE.findall(question)
            if len(word) > 3
        }
        lines = [line.strip() for line in context.splitlines() if line.strip()]
        hits = [line for line in lines if any(term in line.lower() for term in terms)]
        return "\n".join(hits[:12]) or "I could not find a clear answer in the uploaded records."

    client = OpenAI(api_key=settings.openai_api_key)
    prompt = f"""
Use only the medical record text below. Do not diagnose or give medical advice.
If the answer is not present, say you cannot find it in the records.
Question: {question}
Retrieved record context:
{context}
"""
    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
    )
    return res.choices[0].message.content or "No answer found."
