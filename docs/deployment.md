# Deployment Guide

This guide describes a portfolio deployment using Vercel, Render, Neon PostgreSQL, and AWS S3. Do not upload real patient data to a demonstration environment.

## 1. Neon PostgreSQL

1. Create a Neon project and database.
2. Copy the pooled PostgreSQL connection string.
3. Keep SSL enabled in the connection string.
4. Save the value as `DATABASE_URL` in Render.
5. For the future vector implementation, enable the `vector` extension:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

The current MVP creates its `records` table through SQLAlchemy on startup. Use Alembic migrations before evolving the production schema.

## 2. AWS S3

1. Create a private bucket in the deployment region.
2. Enable "Block all public access."
3. Enable default encryption, versioning, and an appropriate lifecycle policy.
4. Create an IAM role or user limited to `s3:PutObject`, `s3:GetObject`, and `s3:DeleteObject` for the bucket's `medical-records/*` prefix.
5. Add `AWS_REGION` and `S3_BUCKET_NAME` to Render.
6. Prefer a workload IAM role. If that is unavailable, add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as Render secrets.

The backend automatically uploads PDFs to S3 when `S3_BUCKET_NAME` is set. Otherwise it uses local disk, which is ephemeral on Render and suitable only for short-lived demos.

## 3. Backend on Render

1. Push the repository to GitHub.
2. In Render, create a new **Web Service** from the repository.
3. Set **Root Directory** to `backend`.
4. Set **Runtime** to Python.
5. Use this build command:

```bash
pip install -r requirements.txt
```

6. Use this start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

7. Add `DATABASE_URL`, `OPENAI_API_KEY`, AWS variables, and `S3_BUCKET_NAME` as secrets.
8. Set `CORS_ORIGINS` to the final Vercel URL.
9. Deploy and verify `https://<render-service>/health`.

## 4. Frontend on Vercel

1. Import the same GitHub repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Select the Vite framework preset.
4. Keep the build command as `npm run build`.
5. Keep the output directory as `dist`.
6. Add `VITE_API_URL=https://<render-service>` as an environment variable.
7. Deploy the frontend.
8. Update the Render `CORS_ORIGINS` value with the final Vercel domain and redeploy the API.

## 5. Verification

1. Confirm the backend health endpoint returns `{"status":"ok"}`.
2. Open the Vercel application and check that the record list loads.
3. Upload a synthetic text-based PDF.
4. Confirm its metadata is stored in Neon and the object is stored privately in S3.
5. Ask a question whose answer appears in the synthetic record.
6. Review Render, Neon, AWS, and Vercel logs for errors without logging document contents or secrets.

## Production Hardening

Before processing sensitive data, add authentication, per-user authorization, database migrations, field-level encryption, audit logging, deletion workflows, malware scanning, OCR isolation, rate limits, backups, monitoring, and formal security and compliance review.
