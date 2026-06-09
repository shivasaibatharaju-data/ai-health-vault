from app.extract import rule_based_summary


def test_rule_based_summary_extracts_common_clinical_fields():
    text = """
    Assessment: Type 2 diabetes
    Medications: Metformin 500 mg
    Allergies: NKDA
    HbA1c 6.8 percent
    """

    summary = rule_based_summary(text)

    assert summary["medications_found"] == ["metformin"]
    assert summary["allergy_lines"] == ["Allergies: NKDA"]
    assert summary["diagnosis_related_lines"] == ["Assessment: Type 2 diabetes"]
    assert summary["lab_related_lines"] == ["HbA1c 6.8 percent"]
