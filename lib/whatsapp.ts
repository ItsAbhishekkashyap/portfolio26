import "server-only";
import type { ContactRecord } from "@/lib/contacts-store";

// WhatsApp Cloud API (developers.facebook.com/documentation/business-messaging/whatsapp).
// Free-form text only reaches you inside the 24-hour window after you last messaged the bot,
// so new-message alerts use an approved template when WHATSAPP_TEMPLATE is set.

const env = () => ({
  token: process.env.WHATSAPP_TOKEN || "",
  phoneId: process.env.WHATSAPP_PHONE_NUMBER_ID || "",
  to: (process.env.WHATSAPP_NOTIFY_TO || "").replace(/\D/g, ""),
  template: process.env.WHATSAPP_TEMPLATE || "",
  lang: process.env.WHATSAPP_TEMPLATE_LANG || "en",
  version: process.env.WHATSAPP_API_VERSION || "v23.0",
});

export interface WhatsAppStatus { configured: boolean; mode: "template" | "text" | "off"; to: string }

export function whatsappStatus(): WhatsAppStatus {
  const e = env();
  const configured = Boolean(e.token && e.phoneId && e.to);
  return {
    configured,
    mode: !configured ? "off" : e.template ? "template" : "text",
    to: e.to ? `+${e.to.slice(0, 2)} ••••• ${e.to.slice(-4)}` : "",
  };
}

export const ownerNumber = () => env().to;

type SendResult = { ok: true; id?: string } | { ok: false; error: string };

async function send(payload: Record<string, unknown>): Promise<SendResult> {
  const e = env();
  if (!e.token || !e.phoneId) return { ok: false, error: "WhatsApp is not configured (WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID)." };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(`https://graph.facebook.com/${e.version}/${e.phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${e.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", ...payload }),
      signal: ctrl.signal,
    });
    const data: any = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data?.error?.message || `WhatsApp API returned ${res.status}` };
    return { ok: true, id: data?.messages?.[0]?.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error && err.name === "AbortError" ? "WhatsApp API timed out." : String(err) };
  } finally {
    clearTimeout(timer);
  }
}

export const sendText = (to: string, body: string) =>
  send({ to, type: "text", text: { body: body.slice(0, 4096), preview_url: false } });

// Template parameters may not contain newlines, tabs or more than four spaces in a row.
const param = (s: string, max: number) => {
  const flat = s.replace(/[\r\n\t]+/g, " / ").replace(/ {4,}/g, "   ").trim();
  return flat.length > max ? flat.slice(0, max - 1) + "…" : flat || "-";
};

const istDate = (d: string | Date) =>
  new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

/** Sends the "new portfolio message" alert to WHATSAPP_NOTIFY_TO. Never throws. */
export async function notifyNewContact(c: ContactRecord): Promise<SendResult> {
  const e = env();
  if (!e.token || !e.phoneId || !e.to) return { ok: false, error: "WhatsApp alerts are off." };
  if (e.template) {
    return send({
      to: e.to,
      type: "template",
      template: {
        name: e.template,
        language: { code: e.lang },
        components: [{
          type: "body",
          parameters: [param(c.name, 60), param(c.email, 120), param(c.subject, 120), param(c.message, 700)].map((text) => ({ type: "text", text })),
        }],
      },
    });
  }
  return sendText(e.to, [
    "*New message from your portfolio*",
    "",
    `*From:* ${c.name} (${c.email})`,
    `*Subject:* ${c.subject}`,
    `*When:* ${istDate(c.createdAt)}`,
    "",
    c.message.slice(0, 1500),
    "",
    "Reply *inbox* to see recent messages.",
  ].join("\n"));
}

export function formatInbox(list: ContactRecord[], title: string) {
  if (!list.length) return `${title}\n\nNothing here yet.`;
  return [
    title,
    ...list.map((c, i) => {
      const unread = !c.status || c.status === "unread" ? " 🔵" : "";
      const msg = c.message.length > 280 ? c.message.slice(0, 279) + "…" : c.message;
      return `\n*${i + 1}. ${c.name}*${unread}\n${c.email}\n_${c.subject}_ · ${istDate(c.createdAt)}\n${msg}`;
    }),
  ].join("\n");
}

export const HELP_TEXT = [
  "*Portfolio inbox bot*",
  "",
  "*inbox* – the 5 latest messages",
  "*unread* – unread messages only",
  "*read* – mark everything as read",
  "*help* – this list",
  "",
  "New messages from the contact form arrive here automatically.",
].join("\n");
