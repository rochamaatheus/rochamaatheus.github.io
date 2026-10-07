// Servidor estático com gzip e cache de 10 min, parecido com o GitHub Pages, para medir com Lighthouse: node gzserve.mjs [porta]
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { extname, join, normalize } from 'node:path';

const root = normalize(join(import.meta.dirname, '..'));
const port = +(process.argv[2] || 5511);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };
const zip = new Set(['.html', '.css', '.js', '.json', '.svg', '.txt', '.xml']);

http.createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  const file = normalize(join(root, path));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    let body = await readFile(file);
    const ext = extname(file);
    const headers = { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': 'max-age=600' };
    if (zip.has(ext) && /gzip/.test(req.headers['accept-encoding'] || '')) { body = gzipSync(body); headers['Content-Encoding'] = 'gzip'; }
    res.writeHead(200, headers).end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
}).listen(port, () => console.log(`http://localhost:${port}`));
