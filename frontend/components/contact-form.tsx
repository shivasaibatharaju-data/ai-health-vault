"use client";

import {CheckCircle2, Loader2, Send} from "lucide-react";
import {FormEvent, useState} from "react";

import {Button} from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    // TODO: Connect this form to an email or support ticket endpoint.
    window.setTimeout(() => setStatus("sent"), 700);
  };

  if (status === "sent") {
    return (
      <div className="grid min-h-96 place-items-center text-center">
        <div>
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            <CheckCircle2 className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-2xl font-bold">Message received</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-ink-600 dark:text-ink-300">
            Thanks for reaching out. This demo has captured the interaction;
            production delivery is pending a support endpoint.
          </p>
          <Button
            type="button"
            variant="secondary"
            className="mt-5"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold">
            Name
          </label>
          <input
            id="contact-name"
            required
            autoComplete="name"
            className="min-h-12 w-full rounded-xl border border-ink-200 bg-white px-4 text-sm dark:border-white/15 dark:bg-ink-950"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            className="min-h-12 w-full rounded-xl border border-ink-200 bg-white px-4 text-sm dark:border-white/15 dark:bg-ink-950"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-topic" className="mb-1.5 block text-sm font-semibold">
          Topic
        </label>
        <select
          id="contact-topic"
          className="min-h-12 w-full rounded-xl border border-ink-200 bg-white px-4 text-sm dark:border-white/15 dark:bg-ink-950"
        >
          <option>Product feedback</option>
          <option>Technical question</option>
          <option>Security and privacy</option>
          <option>Career or collaboration</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={6}
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm dark:border-white/15 dark:bg-ink-950"
          placeholder="Tell us how we can help..."
        />
      </div>
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        Send message
      </Button>
    </form>
  );
}
