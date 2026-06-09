from app.ai import retrieve_relevant_context


def test_retrieval_prioritizes_relevant_content():
    records = (
        "Routine visit. Blood pressure was recorded.\n\n"
        + ("General notes. " * 180)
        + "\n\nMedication list: metformin 500 mg daily."
    )

    context = retrieve_relevant_context("Which metformin dose is listed?", records, max_chars=3000)

    assert "metformin 500 mg daily" in context
