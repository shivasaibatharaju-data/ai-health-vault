from pathlib import Path

import boto3

from .config import settings


def persist_file(local_path: Path) -> str:
    """Persist a PDF locally or upload it to S3 when a bucket is configured."""
    if not settings.s3_bucket_name:
        return str(local_path)

    client_options = {}
    if settings.aws_region:
        client_options["region_name"] = settings.aws_region
    if settings.aws_access_key_id and settings.aws_secret_access_key:
        client_options["aws_access_key_id"] = settings.aws_access_key_id
        client_options["aws_secret_access_key"] = settings.aws_secret_access_key

    object_key = f"medical-records/{local_path.name}"
    s3_client = boto3.client("s3", **client_options)
    s3_client.upload_file(
        str(local_path),
        settings.s3_bucket_name,
        object_key,
        ExtraArgs={
            "ContentType": "application/pdf",
            "ServerSideEncryption": "AES256",
        },
    )
    local_path.unlink(missing_ok=True)
    return f"s3://{settings.s3_bucket_name}/{object_key}"
