import { handleUpload } from "@vercel/blob/client";
import { tokenValid, readJson } from "./_auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });
  try {
    const body = await readJson(req);
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!tokenValid(clientPayload)) throw new Error("Please log in again");
        if (!pathname.startsWith("media/")) throw new Error("Bad file path");
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif",
            "video/mp4", "video/webm", "video/quicktime"],
          addRandomSuffix: true,
          maximumSizeInBytes: 500 * 1024 * 1024
        };
      },
      onUploadCompleted: async () => {}
    });
    return res.status(200).json(json);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}
