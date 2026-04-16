"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      if (!formRef.current) return;

      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      if (result.text === "OK") {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        router.push("/contact/success");
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setErrorMessage(err?.text || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 w-full">
      <div className="glass-card bg-[#111117]/80 backdrop-blur-md rounded-2xl border border-white/20 p-8 md:p-10 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

        {status === "error" && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <span className="text-red-400 text-sm font-medium">{errorMessage}</span>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          {/* Hidden time field for EmailJS template */}
          <input
            type="hidden"
            name="time"
            value={new Date().toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short"
            })}
          />

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-white/70 text-sm mb-1 font-medium italic">
              Sender_Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              disabled={status === "loading"}
              placeholder="e.g. Rajesh ai"
              className={`w-full bg-white/5 border text-white rounded-lg px-4 py-3 transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none placeholder:text-white/10 ${errors.name ? "border-red-400/50" : "border-white/10"
                }`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1 font-bold italic tracking-tighter">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-white/70 text-sm mb-1 font-medium italic">
              Secure_Endpoint
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={status === "loading"}
              placeholder="e.g. contact@matrix.io"
              className={`w-full bg-white/5 border text-white rounded-lg px-4 py-3 transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none placeholder:text-white/10 ${errors.email ? "border-red-400/50" : "border-white/10"
                }`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1 font-bold italic tracking-tighter">{errors.email}</p>}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-white/70 text-sm mb-1 font-medium italic">
              Protocol_Header
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              disabled={status === "loading"}
              placeholder="e.g. AI System Integration"
              className={`w-full bg-white/5 border text-white rounded-lg px-4 py-3 transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none placeholder:text-white/10 ${errors.subject ? "border-red-400/50" : "border-white/10"
                }`}
            />
            {errors.subject && <p className="text-red-400 text-xs mt-1 font-bold italic tracking-tighter">{errors.subject}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-white/70 text-sm mb-1 font-medium italic">
              Encrypted_Payload
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              disabled={status === "loading"}
              placeholder="Explain your project requirements..."
              className={`w-full bg-white/5 border text-white rounded-lg px-4 py-3 transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none resize-none placeholder:text-white/10 ${errors.message ? "border-red-400/50" : "border-white/10"
                }`}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1 font-bold italic tracking-tighter">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full relative group cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-500 transition-all group-hover:opacity-90 active:scale-[0.98]" />
            <div className="relative py-4 text-white font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3">
              {status === "loading" ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Initialize Transmission</span>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
