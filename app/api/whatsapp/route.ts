import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { listContacts, markAllRead } from "@/lib/contacts-store";
import { HELP_TEXT, formatInbox, ownerNumber, sendText } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Meta calls GET once with hub.challenge when you save the webhook URL in the app dashboard.
export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const expected = process.env.WHATSAPP_VERIFY_TOKEN;
  if (expected && p.get("hub.mode") === "subscribe" && p.get("hub.verify_token") === expected) {
    return new Response(p.get("hub.challenge") || "", { status: 200, headers: { "Content-Type": "text/plain" } });
  }
  return new Response("Forbidden", { status: 403 });
}

function validSignature(raw: string, header: string | null) {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret || !header?.startsWith("sha256=")) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(raw).digest("hex"));
  const got = Buffer.from(header.slice(7));
  return expected.length === got.length && timingSafeEqual(expected, got);
}

async function handleCommand(from: string, text: string) {
  const cmd = text.trim().toLowerCase();
  if (["inbox", "latest", "messages", "list"].includes(cmd)) {
    return sendText(from, formatInbox(await listContacts(5), "*Latest portfolio messages*"));
  }
  if (cmd === "unread") {
    const unread = (await listContacts(50)).filter((c) => !c.status || c.status === "unread").slice(0, 5);
    return sendText(from, formatInbox(unread, "*Unread portfolio messages*"));
  }
  if (["read", "mark read", "clear"].includes(cmd)) {
    const n = await markAllRead();
    return sendText(from, n ? `Marked ${n} message${n === 1 ? "" : "s"} as read.` : "Everything was already read.");
  }
  return sendText(from, HELP_TEXT);
}

export async function POST(req: Request) {
  const raw = await req.text();
  if (!validSignature(raw, req.headers.get("x-hub-signature-256"))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let body: any;
  try { body = JSON.parse(raw); } catch { return new Response("Bad JSON", { status: 400 }); }

  const owner = ownerNumber();
  const jobs: Promise<unknown>[] = [];
  for (const entry of body?.entry ?? []) {
    for (const change of entry?.changes ?? []) {
      for (const msg of change?.value?.messages ?? []) {
        // Only the site owner can use the bot; everyone else is ignored.
        if (!owner || String(msg?.from || "").replace(/\D/g, "") !== owner) continue;
        const text = msg?.type === "text" ? String(msg.text?.body || "") : "help";
        jobs.push(handleCommand(owner, text).catch((err) => console.error("[whatsapp] reply failed:", err)));
      }
    }
  }
  await Promise.all(jobs);
  // Always 200 for valid deliveries (including status updates) so Meta doesn't retry.
  return NextResponse.json({ ok: true });
}
