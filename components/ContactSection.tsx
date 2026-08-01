"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Copy, Check, Calendar, MessageSquare, Clock, Sparkles, X } from "lucide-react";
import { submitContactForm } from "@/lib/actions";
import { PERSONA } from "@/lib/seed-data";

interface ContactSectionProps {
  scheduleOpen: boolean;
  onCloseSchedule: () => void;
  onOpenSchedule: () => void;
}

export default function ContactSection({ scheduleOpen, onCloseSchedule, onOpenSchedule }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const res = await submitContactForm(null, formData);
    setLoading(false);

    if (res.success) {
      setFeedback({ success: true, message: res.message });
      (e.target as HTMLFormElement).reset();
    } else {
      setFeedback({ success: false, message: res.error });
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#fbf9f5] dark:bg-[#0c0a09] text-stone-900 dark:text-stone-100 relative transition-colors border-t border-stone-200 dark:border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-amber-700 dark:text-amber-400 text-xs font-mono mb-3 shadow-sm">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Let&apos;s Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 dark:from-amber-400 dark:to-yellow-400">
              Extraordinary Together
            </span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm max-w-xl mt-2 font-sans">
            Available for full-time software engineering roles, high agency projects, and system architecture design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Info & Quick Copy Badge (Left 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Email Copy Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
                <h3 className="text-xs uppercase font-mono tracking-wider text-amber-700 dark:text-amber-400 mb-3 font-bold">Direct Email</h3>
                <div className="flex items-center justify-between bg-[#fbf9f5] dark:bg-stone-950 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800">
                  <span className="text-sm font-mono text-stone-900 dark:text-stone-100 font-bold select-all">{PERSONA.contact.email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500 hover:text-stone-950 transition-colors flex items-center gap-1.5 text-xs font-semibold font-mono"
                    title="Copy Email Address"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Schedule Call Button Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm font-heading">Schedule a Discussion</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">Book a quick technical discussion or interview slot</p>
                  </div>
                </div>

                <button
                  onClick={onOpenSchedule}
                  className="w-full py-3 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 text-white dark:text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm font-mono"
                >
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Schedule 15-Min Meeting</span>
                </button>
              </div>

              {/* Phone & Location */}
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4 text-xs font-mono text-stone-700 dark:text-stone-300 shadow-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{PERSONA.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{PERSONA.contact.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2 font-heading">
                <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>Send a Direct Inquiry</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-stone-500 dark:text-stone-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-500 dark:text-stone-400 mb-2">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-500 dark:text-stone-400 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="e.g. Software Engineer Opportunity / Project Inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-500 dark:text-stone-400 mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project, team, or opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                {feedback && (
                  <div
                    className={`p-4 rounded-xl text-xs font-mono ${
                      feedback.success
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {feedback.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-opacity disabled:opacity-50 font-mono"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Sending Message..." : "Submit Inquiry"}</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Schedule Call Modal Overlay */}
      <AnimatePresence>
        {scheduleOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseSchedule}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-2xl z-10 text-stone-900 dark:text-stone-100"
            >
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-bold text-lg font-heading">Schedule Call with Abhishek</h3>
                </div>
                <button onClick={onCloseSchedule} className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 mb-4 leading-relaxed font-sans">
                Connect directly for engineering interviews, technical discussions, or collaboration inquiries.
              </p>

              <div className="space-y-3 mb-6 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex justify-between">
                  <span className="text-stone-500">Email:</span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">{PERSONA.contact.email}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex justify-between">
                  <span className="text-stone-500">Phone / WhatsApp:</span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">{PERSONA.contact.phone}</span>
                </div>
              </div>

              <a
                href={`mailto:${PERSONA.contact.email}?subject=Interview / Discussion Schedule Request`}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md font-mono"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Calendar Invite via Email</span>
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
