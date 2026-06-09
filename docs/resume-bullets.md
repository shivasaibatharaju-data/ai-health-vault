# Resume Bullets

- Built a full-stack healthcare document intelligence SaaS with Next.js 15, TypeScript, Tailwind CSS, FastAPI, PyMuPDF, SQLAlchemy, and OpenAI APIs to extract, summarize, and query medical record PDFs.
- Designed a retrieval-grounded question-answering workflow that chunks record text, ranks relevant context, and constrains generated answers to uploaded documents.
- Developed a configurable data layer supporting local SQLite and managed PostgreSQL/Neon, with a documented migration path to pgvector semantic search.
- Implemented secure-by-default document handling with PDF validation, upload limits, randomized object names, private AWS S3 storage, and server-side encryption.
- Prepared a cloud deployment architecture spanning Vercel, Render, Neon PostgreSQL, and AWS S3, including environment isolation and production hardening guidance.
