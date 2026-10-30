import { passwordMatches, makeToken, readJson, tokenValid, bearer } from "./_auth.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // used by the admin page to check a saved login is still valid
    try { return tokenValid(bearer(req)) ? res.status(200).json({ ok: true }) : res.status(401).json({ error: "Please log in again" }); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });
  try {
    const { password } = await readJson(req);
    if (!passwordMatches(password)) {
      await new Promise(r => setTimeout(r, 600));
      return res.status(401).json({ error: "Wrong password" });
    }
    return res.status(200).json({ token: makeToken() });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
