"use client";

import { useState, type FormEvent } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const EMAIL = "nolysereno75@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard permission is blocked
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${name || "Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${senderEmail}\n\n${message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="section-padding border-t border-white/[0.06]"
    >
      <RevealGroup className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <RevealItem>
            <p className="mb-3 font-mono text-sm text-[#a78bfa]">
              03 / GET IN TOUCH
            </p>
          </RevealItem>

          <RevealItem>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Let&apos;s build something together.
            </h2>
          </RevealItem>

          <RevealItem>
            <p className="mx-auto mt-5 max-w-lg leading-7 text-zinc-400">
              Have an idea, internship opportunity, or project in mind? Send me
              a message or copy my email below.
            </p>
          </RevealItem>

          {/* Quick action buttons: Say hello, Copy email, LinkedIn */}
          <RevealItem>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[#8b5cf6] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#7c3aed]"
              >
                <Mail size={16} />
                Say hello
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-[#111116] px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-[#a78bfa]/50 hover:text-white"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    <span className="text-emerald-300">Copied {EMAIL}</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="text-[#a78bfa]" />
                    Copy email
                  </>
                )}
              </button>

              <a
                href="https://linkedin.com/in/noly-sereno-1b1b3b337/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-lg border border-zinc-800 px-5 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
              >
                LinkedIn ↗
              </a>
            </div>
          </RevealItem>
        </div>

        {/* Interactive Quick Message Form */}
        <RevealItem>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 max-w-xl rounded-2xl border border-zinc-800 bg-[#111116] p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block font-mono text-xs text-zinc-400"
                >
                  YOUR NAME
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-zinc-800 bg-[#09090b] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#a78bfa]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block font-mono text-xs text-zinc-400"
                >
                  YOUR EMAIL
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-zinc-800 bg-[#09090b] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#a78bfa]"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="contact-message"
                className="mb-2 block font-mono text-xs text-zinc-400"
              >
                MESSAGE
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project or opportunity..."
                className="w-full resize-none rounded-lg border border-zinc-800 bg-[#09090b] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#a78bfa]"
              />
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#8b5cf6] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#7c3aed]"
            >
              <Send size={16} />
              Send message
            </button>
          </form>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
