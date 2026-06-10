# Deployment Guide

This guide deploys AI Health Vault with Vercel, Render, Neon PostgreSQL, and AWS S3. The public portfolio environment must use synthetic data.

## Deployment Architecture

```text
Browser
  -> Vercel: Next.js frontend
  -> Render: FastAPI backend
       -> Neon: PostgreSQL records
       -> AWS S3: private PDF objects
       -> OpenAI API: optional summaries and answers
```

## 1. Create a Neon PostgreSQL Database

1. Create a project at Neon.
2. Create or select a database.
3. Copy the pooled PostgreSQL connection string.
4. Keep SSL enabled in the connection string.
5. Save the full string for the Render `DATABASE_URL`.
6. For the planned vector implementation, run:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

The current backend creates its `records` table through SQLAlchemy at startup. Add Alembic migrations before evolving a production schema.

## 2. Configure Private AWS S3 Storage

1. Create an S3 bucket in the same region as the backend where possible.
2. Enable **Block all public access**.
3. Enable default server-side encryption.
4. Enable versioning and an appropriate lifecycle policy.
5. Create an IAM role or user limited to the bucket's `medical-records/*` prefix.
6. Permit only the required actions, such as `s3:PutObject`, `s3:GetObject`, and `s3:DeleteObject`.
7. Prefer an IAM workload role. Use access keys only when the host cannot assume a role.

## 3. Deploy FastAPI on Render

The repository includes a root-level `render.yaml` Blueprint for a one-click
portfolio deployment:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/shivasaibatharaju-data/ai-health-vault)

The Blueprint uses Render's free web-service plan with SQLite and ephemeral
local uploads. Configure Neon and S3 after the initial launch for durable data.

1. Push the repository to GitHub.
2. Open Render and create a **Web Service**.
3. Connect `shivasaibatharaju-data/ai-health-vault`.
4. Set **Root Directory** to `backend`.
5. Select the Python runtime.
6. Use this build command:

```bash
pip install -r requirements.txt
```

7. Use this start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

8. Add these environment variables:

```text
DATABASE_URL=<neon-pooled-postgresql-url>
OPENAI_API_KEY=<optional-openai-key>
AWS_REGION=<bucket-region>
S3_BUCKET_NAME=<private-bucket-name>
AWS_ACCESS_KEY_ID=<only-if-required>
AWS_SECRET_ACCESS_KEY=<only-if-required>
CORS_ORIGINS=https://<vercel-domain>
```

9. Deploy the service.
10. Verify `https://<render-service>.onrender.com/health` returns:

```json
{"status":"ok"}
```

Keep the Render service URL for the Vercel configuration.

## 4. Deploy Next.js 15 on Vercel

1. Open Vercel and choose **Add New > Project**.
2. Import `shivasaibatharaju-data/ai-health-vault`.
3. Set **Root Directory** to `frontend`.
4. Vercel should automatically detect **Next.js**.
5. Confirm these settings:

```text
Framework Preset: Next.js
Install Command: npm install
Build Command: npm run build
Output Directory: leave blank
Node.js Version: 22.x
```

6. Add the environment variable for Production, Preview, and Development:

```text
NEXT_PUBLIC_API_URL=https://<render-service>.onrender.com
```

7. Select **Deploy**.
8. Open the generated Vercel domain and verify the landing page and `/dashboard`.
9. Copy the final production domain.
10. Return to Render and set:

```text
CORS_ORIGINS=https://<production-domain>,https://<optional-preview-domain>
```

11. Redeploy the Render service after changing CORS.
12. Trigger one final Vercel deployment if the API URL changed.

The repository includes `frontend/vercel.json`, but selecting `frontend` as the Vercel root directory is still required for the monorepo.

### Automatic Vercel Deployment from GitHub Actions

The repository includes `.github/workflows/vercel-deploy.yml`. It deploys the
`frontend` directory to the production Vercel project whenever frontend code is
pushed to `main`. It can also be started manually from the GitHub Actions page.

Configure these encrypted repository secrets:

```text
VERCEL_TOKEN=<Vercel access token>
VERCEL_ORG_ID=<Vercel user or team ID>
VERCEL_PROJECT_ID=<Vercel project ID>
```

In GitHub, open **Settings > Secrets and variables > Actions**, add the three
repository secrets, and then run **Deploy Frontend to Vercel**. The workflow:

1. Pulls the production Vercel project settings.
2. Builds the Next.js application in GitHub Actions.
3. Uploads the prebuilt output to Vercel.
4. Promotes the deployment to the production domain.

Use this workflow when the Vercel and GitHub browser accounts do not share the
same repository ownership. If the accounts are aligned later, the native Vercel
GitHub integration can replace the workflow.

## 5. Verification Checklist

1. Visit the landing, features, pricing, login, and signup pages.
2. Test mobile navigation and light/dark mode.
3. Confirm `/dashboard` loads without browser console errors.
4. Upload a small synthetic text-based PDF.
5. Confirm the record appears in `/records`.
6. Ask a question in `/chat` whose answer exists in the record.
7. Confirm the uploaded object is private in S3.
8. Confirm record metadata is present in Neon.
9. Review Render logs without logging document contents or secrets.
10. Verify Vercel contains only `NEXT_PUBLIC_API_URL`, not backend secrets.

## 6. Preview Deployments

Every pull request can create a Vercel preview deployment. Because preview URLs change, either:

- add the specific preview domain to `CORS_ORIGINS`, or
- use a controlled origin-matching strategy in FastAPI for trusted Vercel preview domains.

Do not use an unrestricted `*` origin with credentialed requests.

## 7. Current Backend Gaps

The UI includes labeled demonstration behavior for capabilities without backend contracts:

- user registration, login, password reset, and session management
- per-user authorization and tenant isolation
- normalized timeline event extraction and retrieval
- profile and notification preference persistence
- contact form delivery
- billing, subscriptions, and entitlements
- record detail, source citation, deletion, and export endpoints
- account deletion and storage cleanup

## Production Hardening

Before processing sensitive health information, add authenticated authorization, row-level data isolation, database migrations, field-level encryption, audit logging, malware scanning, rate limiting, document retention and deletion, backups, monitoring, incident response, vendor agreements, threat modeling, and formal legal and compliance review.
