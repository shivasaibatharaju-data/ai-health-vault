import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState(0);

  const loadRecords = async () => {
    const response = await axios.get(`${API}/records`);
    setRecords(response.data);
  };

  useEffect(() => {
    loadRecords().catch(() => {
      setError('The API is unavailable. Start the FastAPI server and refresh.');
    });
  }, []);

  const messageFromError = (requestError) =>
    requestError.response?.data?.detail || 'Something went wrong. Please try again.';

  const upload = async () => {
    if (!file) {
      setError('Choose a PDF before uploading.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post(`${API}/records/upload`, formData);
      setFile(null);
      setInputKey((key) => key + 1);
      await loadRecords();
    } catch (requestError) {
      setError(messageFromError(requestError));
    } finally {
      setLoading(false);
    }
  };

  const ask = async () => {
    if (!question.trim()) {
      setError('Enter a question about your uploaded records.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API}/ask`, {question});
      setAnswer(response.data.answer);
    } catch (requestError) {
      setError(messageFromError(requestError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <header className="hero">
        <span className="eyebrow">Healthcare document intelligence</span>
        <h1>AI Health Vault</h1>
        <p>
          Turn medical record PDFs into organized summaries and grounded answers.
        </p>
        <div className="notice">Portfolio MVP only. Not medical advice or a HIPAA-certified service.</div>
      </header>

      {error && <div className="error" role="alert">{error}</div>}

      <div className="workspace">
        <section>
          <span className="step">01</span>
          <h2>Upload a record</h2>
          <p className="section-copy">Select a text-based PDF up to 10 MB.</p>
          <input
            key={inputKey}
            type="file"
            accept="application/pdf"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
          <button onClick={upload} disabled={loading}>
            {loading ? 'Working...' : 'Upload and analyze'}
          </button>
        </section>

        <section>
          <span className="step">02</span>
          <h2>Ask your records</h2>
          <p className="section-copy">Answers are grounded in retrieved document passages.</p>
          <div className="question-row">
            <input
              className="question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="What medications are listed?"
            />
            <button onClick={ask} disabled={loading}>Ask</button>
          </div>
          {answer && <pre className="answer">{answer}</pre>}
        </section>
      </div>

      <section className="records">
        <div className="records-heading">
          <div>
            <span className="step">03</span>
            <h2>Record summaries</h2>
          </div>
          <span className="count">{records.length} uploaded</span>
        </div>
        {!records.length && <p className="empty">No records uploaded yet.</p>}
        {records.map((record) => (
          <article className="card" key={record.id}>
            <strong>{record.filename}</strong>
            <pre>{record.summary}</pre>
          </article>
        ))}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
