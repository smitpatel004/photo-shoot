# Photo studio website + admin panel

- `public/index.html` – the website
- `public/admin/` – admin panel at **/admin** (add albums, photos, videos, business details)
- `api/` – small server functions (login, save content, upload)
- Photos and videos are stored in **Vercel Blob**. Until the owner uploads something, the website shows the sample pictures.

## One-time setup on Vercel
1. Project → Storage → create a **Blob** store and connect it to this project (adds `BLOB_READ_WRITE_TOKEN`).
2. Project → Settings → Environment Variables → add `ADMIN_PASSWORD` (your admin login password).
3. Redeploy.
