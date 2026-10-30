import { list, put, del } from "@vercel/blob";
import { tokenValid, bearer, readJson } from "./_auth.js";

const PREFIX = "site/content-";

async function latest() {
  const { blobs } = await list({ prefix: PREFIX, limit: 100 });
  blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  return blobs;
}

function mediaUrls(content) {
  const out = new Set();
  if (!content) return out;
  Object.values(content.slots || {}).forEach(m => m && m.url && out.add(m.url));
  (content.albums || []).forEach(a => (a.items || []).forEach(m => m && m.url && out.add(m.url)));
  return out;
}

async function readCurrent() {
  const blobs = await latest();
  if (!blobs.length) return { content: null, blobs };
  const r = await fetch(blobs[0].url + "?v=" + Date.now(), { cache: "no-store" });
  return { content: r.ok ? await r.json() : null, blobs };
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(200).json({ content: null });
      const { content } = await readCurrent();
      res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=60");
      return res.status(200).json({ content });
    }

    if (req.method === "PUT") {
      if (!tokenValid(bearer(req))) return res.status(401).json({ error: "Please log in again" });
      const body = await readJson(req);
      const content = body && body.content;
      if (!content || typeof content !== "object") return res.status(400).json({ error: "Nothing to save" });
      content.savedAt = new Date().toISOString();

      const { content: before, blobs } = await readCurrent();
      await put(PREFIX + Date.now() + ".json", JSON.stringify(content), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: true,
        cacheControlMaxAge: 60
      });

      // Remove media files that are no longer used anywhere, and old copies of the content file.
      const keep = mediaUrls(content);
      const gone = [...mediaUrls(before)].filter(u => !keep.has(u) && u.includes("/media/"));
      const oldJson = blobs.slice(4).map(b => b.url);
      const toDelete = [...gone, ...oldJson];
      if (toDelete.length) await del(toDelete).catch(() => {});

      return res.status(200).json({ ok: true, savedAt: content.savedAt, removed: gone.length });
    }

    return res.status(405).json({ error: "Use GET or PUT" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
