// Grava os projetos em vídeo para os cards do site. Rodar de dentro de video/projetos/:
//   node build.mjs              todos
//   node build.mjs lynch crm    só os indicados
// Quadros: clips/<id>/ (fora do git). Saída: assets/projetos/video/<id>.mp4 + assets/projetos/<id>.webp
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';

const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(JSON.parse(readFileSync('clips.json', 'utf8')));
const out = '../../assets/projetos';
mkdirSync(`${out}/video`, { recursive: true });
for (const id of ids) {
  execFileSync('node', ['../reels-unico/sitecap.mjs', 'clip', id, '30'], { stdio: 'inherit' });
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '30', '-i', `clips/${id}/%04d.jpg`, '-vf', 'scale=1280:800:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-profile:v', 'high', '-crf', '29', '-preset', 'slow', '-movflags', '+faststart', '-an', `${out}/video/${id}.mp4`], { stdio: 'inherit' });
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', `clips/${id}/0045.jpg`, '-vf', 'scale=1200:750:flags=lanczos', '-c:v', 'libwebp', '-quality', '78', `${out}/${id}.webp`], { stdio: 'inherit' });
  console.log('ok', id);
}
