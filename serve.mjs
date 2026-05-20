import { createServer } from "http";
import { readFileSync, existsSync, statSync } from "fs";
import { join, extname } from "path";
import handler from "./dist/server/server.js";

const port = process.env.PORT || 8090;
const host = process.env.HOST || "0.0.0.0";

const mimeTypes = {
  ".js": "application/javascript",
  ".css": "text/css",
  ".html": "text/html",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
};

createServer(async (req, res) => {
  const clientPath = join(process.cwd(), "dist/client", req.url.split("?")[0]);
  
  if (existsSync(clientPath) && statSync(clientPath).isFile()) {
    const ext = extname(clientPath);
    res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.end(readFileSync(clientPath));
    return;
  }

  const url = `http://${req.headers.host || `${host}:${port}`}${req.url}`;
  const webRequest = new Request(url, {
    method: req.method,
    headers: req.headers,
  });

  try {
    const response = await handler(webRequest);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    const text = await response.text();
    res.end(text);
  } catch (err) {
    console.error("Handler error:", err);
    res.writeHead(500);
    res.end("Internal Server Error");
  }
}).listen(port, host, () => {
  console.log(`Server listening at http://localhost:${port}`);
});