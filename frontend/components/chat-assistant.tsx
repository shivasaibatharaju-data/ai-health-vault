"use client";

import {
  AlertCircle,
  Bot,
  FileSearch,
  Loader2,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import {FormEvent, useRef, useState} from "react";

import {api, ApiError} from "@/lib/api";
import {starterQuestions} from "@/lib/mock-data";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
  sources?: string[];
};

const initialMessage: Message = {
  id: 1,
  role: "assistant",
  content:
    "Hello, Alex. I can help you find and summarize information in your uploaded medical records. What would you like to know?",
};

const demoAnswer =
  "I found relevant references across your synthetic demo records. The latest documents include an annual wellness visit, a laboratory panel, a cardiology consultation, and a consolidated medication list. Connect the FastAPI service and upload records to receive answers grounded in your own document text.";

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const nextId = useRef(2);

  const ask = async (submittedQuestion?: string) => {
    const text = (submittedQuestion || question).trim();
    if (!text || loading) return;

    setMessages((items) => [
      ...items,
      {id: nextId.current++, role: "user", content: text},
    ]);
    setQuestion("");
    setLoading(true);
    setNotice("");

    try {
      const response = await api.askQuestion(text);
      setMessages((items) => [
        ...items,
        {
          id: nextId.current++,
          role: "assistant",
          content: response.answer,
          sources: ["Uploaded records"],
        },
      ]);
    } catch (error) {
      setMessages((items) => [
        ...items,
        {
          id: nextId.current++,
          role: "assistant",
          content: demoAnswer,
          sources: ["Annual Physical 2025", "Lab Results November"],
        },
      ]);
      setNotice(
        error instanceof ApiError
          ? `${error.message} A labeled demo response was shown instead.`
          : "The request failed. A labeled demo response was shown instead.",
      );
    } finally {
      setLoading(false);
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void ask();
  };

  return (
    <div className="panel mt-7 grid min-h-[680px] overflow-hidden lg:grid-cols-[300px_1fr]">
      <aside className="border-b border-ink-100 bg-ink-50 p-5 dark:border-white/10 dark:bg-ink-950/60 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-brand-600 text-white dark:bg-brand-400 dark:text-ink-950">
            <Bot className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-bold">Health record assistant</h2>
            <p className="text-xs text-brand-700 dark:text-brand-300">
              Ready to help
            </p>
          </div>
        </div>
        <div className="mt-7">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-500">
            Suggested questions
          </p>
          <div className="mt-3 space-y-2">
            {starterQuestions.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => void ask(starter)}
                disabled={loading}
                className="w-full rounded-xl border border-ink-200 bg-white p-3 text-left text-xs font-semibold leading-5 text-ink-700 transition hover:border-brand-300 hover:bg-brand-50 disabled:opacity-60 dark:border-white/10 dark:bg-ink-900 dark:text-ink-200 dark:hover:bg-brand-950"
              >
                {starter}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-900 dark:bg-brand-950/40">
          <ShieldCheck
            className="size-4 text-brand-700 dark:text-brand-300"
            aria-hidden="true"
          />
          <p className="mt-2 text-xs leading-5 text-brand-900 dark:text-brand-100">
            Answers should use only retrieved record context. Always verify
            important details in the source document.
          </p>
        </div>
      </aside>

      <div className="flex min-h-[640px] flex-col bg-white dark:bg-ink-900">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4 dark:border-white/10">
          <div>
            <h2 className="text-sm font-bold">New conversation</h2>
            <p className="text-xs text-ink-500">
              Grounded in your uploaded medical records
            </p>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-800 sm:inline-flex dark:bg-brand-950 dark:text-brand-200">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Retrieval enabled
          </span>
        </div>

        <div
          className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7"
          aria-live="polite"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-600 text-white dark:bg-brand-400 dark:text-ink-950">
                  <Bot className="size-4" aria-hidden="true" />
                </span>
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[72%] ${
                  message.role === "user"
                    ? "rounded-tr-sm bg-ink-950 text-white dark:bg-brand-700"
                    : "rounded-tl-sm bg-ink-100 text-ink-800 dark:bg-ink-950 dark:text-ink-100"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.sources && (
                  <div className="mt-3 border-t border-ink-200 pt-3 dark:border-white/10">
                    <p className="flex items-center gap-1.5 text-[11px] font-bold text-brand-700 dark:text-brand-300">
                      <FileSearch className="size-3.5" aria-hidden="true" />
                      Sources
                    </p>
                    <p className="mt-1 text-[11px] text-ink-500 dark:text-ink-400">
                      {message.sources.join(" · ")}
                    </p>
                  </div>
                )}
              </div>
              {message.role === "user" && (
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink-200 text-ink-700 dark:bg-white/10 dark:text-white">
                  <User className="size-4" aria-hidden="true" />
                </span>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-brand-600 text-white dark:bg-brand-400 dark:text-ink-950">
                <Bot className="size-4" aria-hidden="true" />
              </span>
              <div className="inline-flex items-center gap-2 rounded-2xl rounded-tl-sm bg-ink-100 px-4 py-3 text-sm text-ink-600 dark:bg-ink-950 dark:text-ink-300">
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Searching your records...
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-ink-100 p-4 dark:border-white/10 sm:p-5">
          {notice && (
            <div
              className="mb-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"
              role="alert"
            >
              <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              {notice}
            </div>
          )}
          <form onSubmit={submit} className="flex items-end gap-2">
            <label htmlFor="chat-question" className="sr-only">
              Ask a question about your medical records
            </label>
            <textarea
              id="chat-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void ask();
                }
              }}
              rows={2}
              placeholder="Ask about medications, visits, labs, or follow-up actions..."
              className="min-h-12 flex-1 resize-none rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm dark:border-white/15 dark:bg-ink-950"
            />
            <button
              type="submit"
              disabled={!question.trim() || loading}
              className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-brand-400 dark:text-ink-950"
              aria-label="Send question"
            >
              <Send className="size-[18px]" aria-hidden="true" />
            </button>
          </form>
          <p className="mt-2 text-center text-[11px] text-ink-500">
            AI can make mistakes. Verify clinical details with your provider.
          </p>
        </div>
      </div>
    </div>
  );
}
