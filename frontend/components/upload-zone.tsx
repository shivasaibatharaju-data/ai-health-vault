"use client";

import {
  CheckCircle2,
  FileText,
  Loader2,
  ShieldCheck,
  UploadCloud,
  X,
  XCircle,
} from "lucide-react";
import {DragEvent, useRef, useState} from "react";

import {Button, ButtonLink} from "@/components/ui/button";
import {api, ApiError, type UploadResponse} from "@/lib/api";
import {cn} from "@/lib/utils";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export function UploadZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "ready" | "uploading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<UploadResponse | null>(null);

  const validate = (candidate: File) => {
    if (
      candidate.type !== "application/pdf" &&
      !candidate.name.toLowerCase().endsWith(".pdf")
    ) {
      setStatus("error");
      setMessage("Only PDF files are supported.");
      return false;
    }
    if (candidate.size > MAX_FILE_SIZE) {
      setStatus("error");
      setMessage("This file is larger than the 10 MB upload limit.");
      return false;
    }
    return true;
  };

  const selectFile = (candidate?: File) => {
    if (!candidate || !validate(candidate)) return;
    setFile(candidate);
    setStatus("ready");
    setMessage("");
    setProgress(0);
    setResult(null);
  };

  const drop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files[0]);
  };

  const upload = async () => {
    if (!file) return;
    setStatus("uploading");
    setProgress(4);
    setMessage("");
    try {
      const response = await api.uploadRecord(file, setProgress);
      setProgress(100);
      setResult(response);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof ApiError
          ? error.message
          : "The file could not be uploaded. Please try again.",
      );
    }
  };

  const reset = () => {
    setFile(null);
    setProgress(0);
    setMessage("");
    setResult(null);
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  };

  if (status === "success" && result) {
    return (
      <div className="panel p-6 sm:p-10">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            <CheckCircle2 className="size-8" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-2xl font-bold">Record analyzed successfully</h2>
          <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
            <strong>{result.filename}</strong> is now available in your records
            library and can be used by the AI assistant.
          </p>
          <div className="mt-6 rounded-2xl bg-ink-50 p-5 text-left dark:bg-ink-950">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
              AI summary preview
            </p>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-ink-700 dark:text-ink-200">
              {result.summary}
            </p>
          </div>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button type="button" onClick={reset} variant="secondary">
              Upload another
            </Button>
            <ButtonLink href="/records">View records library</ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel p-5 sm:p-8">
      <div
        className={cn(
          "relative grid min-h-[340px] place-items-center rounded-2xl border-2 border-dashed px-5 py-10 text-center transition",
          dragging
            ? "border-brand-500 bg-brand-50 dark:bg-brand-950/40"
            : "border-ink-200 bg-ink-50/70 hover:border-brand-300 dark:border-white/15 dark:bg-ink-950/50",
        )}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={drop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={(event) => selectFile(event.target.files?.[0])}
          className="sr-only"
          aria-label="Choose a PDF medical record"
        />
        {!file ? (
          <div>
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              <UploadCloud className="size-7" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-xl font-bold">
              Drop a medical record PDF here
            </h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
              or choose a file from your device
            </p>
            <Button
              type="button"
              className="mt-6"
              onClick={() => inputRef.current?.click()}
            >
              Browse files
            </Button>
            <p className="mt-4 text-xs text-ink-500">
              Text-based PDF · Maximum 10 MB
            </p>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <div className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-4 text-left dark:border-white/10 dark:bg-ink-900">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                <FileText className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{file.name}</p>
                <p className="mt-1 text-xs text-ink-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB · PDF document
                </p>
              </div>
              {status !== "uploading" && (
                <button
                  type="button"
                  onClick={reset}
                  className="grid size-9 place-items-center rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-white/10"
                  aria-label="Remove selected file"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
            {status === "uploading" && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                    Uploading and analyzing
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-[width]"
                    style={{width: `${progress}%`}}
                  />
                </div>
                <p className="mt-3 text-xs text-ink-500">
                  Extracting text and generating a structured summary. Keep this
                  page open.
                </p>
              </div>
            )}
            {status !== "uploading" && (
              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                <Button type="button" variant="secondary" onClick={reset}>
                  Choose another
                </Button>
                <Button type="button" onClick={upload}>
                  <UploadCloud className="size-4" aria-hidden="true" />
                  Upload and analyze
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      {status === "error" && (
        <div
          className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200"
          role="alert"
        >
          <XCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-bold">Upload not completed</p>
            <p className="mt-1">{message}</p>
          </div>
        </div>
      )}
      <div className="mt-5 flex items-start gap-3 rounded-xl bg-brand-50 p-4 text-sm text-brand-900 dark:bg-brand-950/40 dark:text-brand-100">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <p>
          Use synthetic records in this public portfolio demo. Production health
          data requires authentication, access controls, and compliance review.
        </p>
      </div>
    </div>
  );
}
