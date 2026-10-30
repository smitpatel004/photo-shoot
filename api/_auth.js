import crypto from "node:crypto";

const DAY = 24 * 60 * 60 * 1000;

function key() {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) throw new Error("ADMIN_PASSWORD is not set in Vercel environment variables");
  return p;
}

export function passwordMatches(input) {
  const a = Buffer.from(String(input || ""));
  const b = Buffer.from(key());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function makeToken() {
  const exp = Date.now() + 7 * DAY;
  const sig = crypto.createHmac("sha256", key()).update("admin:" + exp).digest("hex");
  return exp + "." + sig;
}

export function tokenValid(token) {
  if (!token || typeof token !== "string") return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = crypto.createHmac("sha256", key()).update("admin:" + exp).digest("hex");
  return sig.length === good.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good));
}

export function bearer(req) {
  const h = req.headers["authorization"] || "";
  return h.startsWith("Bearer ") ? h.slice(7) : "";
}

export async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}
