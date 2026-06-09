# LinkedIn Project Announcement

I’m excited to share **AI Health Vault**, an AI-powered healthcare document intelligence platform I built to make medical records easier to organize and understand.

The application allows users to upload text-based medical record PDFs, extract clinical information, generate structured summaries, and ask natural-language questions grounded in their uploaded documents.

**What I built:**

- Next.js 15, TypeScript, and Tailwind CSS frontend with a responsive public website and SaaS dashboard
- FastAPI backend with validated PDF processing
- PyMuPDF-based document text extraction
- OpenAI-assisted summarization with a rule-based fallback
- Retrieval-grounded question answering
- SQLAlchemy persistence with SQLite and PostgreSQL support
- Optional encrypted AWS S3 document storage
- Deployment path using Vercel, Render, Neon, and AWS

One important engineering decision was to keep the project honest about its maturity: the MVP uses lightweight lexical retrieval today, while the architecture documents the path to embeddings and pgvector for production-grade semantic search.

This is a portfolio and learning project, not medical advice software or a HIPAA-certified service. All demonstrations use synthetic data.

I’d love to connect with data engineering and GenAI practitioners working on secure document intelligence, RAG systems, and healthcare technology.

#GenerativeAI #RAG #FastAPI #React #DataEngineering #HealthcareAI #PostgreSQL #AWS #OpenAI
