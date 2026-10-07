// Campo de partículas em WebGL puro: um único enxame que muda de forma conforme a rolagem
// esfera (hero) → </> (serviços) → galáxia (processo) → malha (projetos) → cubo (stack) → avião de papel (rodapé)
(() => {
  const TAU = Math.PI * 2;

  function rng(seed) {
    let s = seed >>> 0;
    return () => {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Cada forma devolve N posições normalizadas (raio ~1), embaralhadas para o morph cruzar o espaço
  function shapes(n) {
    const r = rng(7);
    const out = {};
    const make = (fn) => {
      const a = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const [x, y, z] = fn(i, r);
        a[i * 3] = x; a[i * 3 + 1] = y; a[i * 3 + 2] = z;
      }
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        for (let k = 0; k < 3; k++) { const t = a[i * 3 + k]; a[i * 3 + k] = a[j * 3 + k]; a[j * 3 + k] = t; }
      }
      return a;
    };
    const jitter = (s) => (r() - 0.5) * s;
    const onSegment = (p, q, thick) => {
      const t = r();
      const ang = r() * TAU;
      const rad = Math.sqrt(r()) * thick;
      return [p[0] + (q[0] - p[0]) * t + Math.cos(ang) * rad, p[1] + (q[1] - p[1]) * t + Math.sin(ang) * rad, (p[2] || 0) + ((q[2] || 0) - (p[2] || 0)) * t + jitter(thick * 2)];
    };

    out.chaos = make(() => {
      const u = r() * TAU, v = Math.acos(2 * r() - 1), d = 2.5 + r() * 4;
      return [Math.sin(v) * Math.cos(u) * d * 1.6, Math.sin(v) * Math.sin(u) * d, Math.cos(v) * d];
    });

    const ringCount = Math.floor(n * 0.24);
    out.sphere = make((i) => {
      if (i < ringCount) {
        const a = r() * TAU, d = 1.16 + r() * 0.16 + (r() < 0.2 ? 0.14 : 0);
        const x = Math.cos(a) * d, z = Math.sin(a) * d, y = jitter(0.025);
        const tilt = 0.42;
        return [x, y * Math.cos(tilt) - z * Math.sin(tilt), y * Math.sin(tilt) + z * Math.cos(tilt)];
      }
      const k = i - ringCount, m = n - ringCount;
      const y = 1 - (k / (m - 1)) * 2, rad = Math.sqrt(1 - y * y), th = k * 2.39996323;
      const s = 0.86 + jitter(0.03);
      return [Math.cos(th) * rad * s, y * s, Math.sin(th) * rad * s];
    });

    const glyph = [
      [[-0.55, 0.62], [-1.2, 0]], [[-1.2, 0], [-0.55, -0.62]],
      [[0.26, 0.82], [-0.26, -0.82]],
      [[0.55, 0.62], [1.2, 0]], [[1.2, 0], [0.55, -0.62]],
    ];
    out.code = make(() => {
      const [p, q] = glyph[Math.floor(r() * glyph.length)];
      if (r() < 0.12) return [p[0] + jitter(0.5), p[1] + jitter(0.5), jitter(0.5)];
      return onSegment(p, q, 0.07);
    });

    out.galaxy = make(() => {
      if (r() < 0.18) return [jitter(0.5), jitter(0.12), jitter(0.5)];
      const arm = r() < 0.5 ? 0 : Math.PI;
      const d = Math.pow(r(), 0.7) * 1.9;
      const a = arm + d * 2.4 + jitter(0.55 / (d + 0.4));
      return [Math.cos(a) * d, jitter(0.08) * (2 - d), Math.sin(a) * d];
    });

    const cols = Math.ceil(Math.sqrt(n * 1.6)), rows = Math.ceil(n / cols);
    out.grid = make((i) => {
      const c = i % cols, w = Math.floor(i / cols);
      return [(c / (cols - 1) - 0.5) * 3.6, 0, (w / (rows - 1) - 0.5) * 2.2];
    });

    const v = [-1, 1];
    const corners = [];
    for (const x of v) for (const y of v) for (const z of v) corners.push([x, y, z]);
    const edges = [];
    for (let a = 0; a < 8; a++) for (let b = a + 1; b < 8; b++) {
      const d = corners[a].reduce((s, c, k) => s + Math.abs(c - corners[b][k]), 0);
      if (d === 2) edges.push([corners[a], corners[b]]);
    }
    out.cube = make(() => {
      const s = 0.62;
      if (r() < 0.62) {
        const [p, q] = edges[Math.floor(r() * edges.length)];
        const pt = onSegment(p, q, 0.035);
        return [pt[0] * s, pt[1] * s, pt[2] * s];
      }
      const face = Math.floor(r() * 6), ax = face % 3, sg = face < 3 ? -1 : 1;
      const p = [r() * 2 - 1, r() * 2 - 1, r() * 2 - 1];
      p[ax] = sg;
      const g = 0.5;
      p[(ax + 1) % 3] = Math.round(p[(ax + 1) % 3] / g) * g + jitter(0.04);
      return [p[0] * s, p[1] * s, p[2] * s];
    });

    // Avião de papel: asas + quilha, com reforço nas dobras para a silhueta ficar nítida
    const N = [1.25, 0.05, 0], T = [-0.85, 0.12, 0], WL = [-0.95, 0.2, -0.95], WR = [-0.95, 0.2, 0.95], K = [-0.75, -0.42, 0];
    const tris = [[N, T, WL], [N, T, WR], [N, T, K]];
    const area = (a, b, c) => {
      const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], w = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
      const x = u[1] * w[2] - u[2] * w[1], y = u[2] * w[0] - u[0] * w[2], z = u[0] * w[1] - u[1] * w[0];
      return Math.hypot(x, y, z) / 2;
    };
    const areas = tris.map((t) => area(...t));
    const total = areas.reduce((a, b) => a + b, 0);
    const folds = [[N, WL], [N, WR], [N, K], [N, T], [T, WL], [T, WR], [T, K]];
    out.plane = make(() => {
      if (r() < 0.36) {
        const [p, q] = folds[Math.floor(r() * folds.length)];
        return onSegment(p, q, 0.018);
      }
      let pick = r() * total, k = 0;
      while (pick > areas[k] && k < 2) pick -= areas[k++];
      const [a, b, c] = tris[k];
      let u = r(), w = r();
      if (u + w > 1) { u = 1 - u; w = 1 - w; }
      return [0, 1, 2].map((j) => a[j] + (b[j] - a[j]) * u + (c[j] - a[j]) * w);
    });

    return out;
  }

  const VERT = `
attribute vec3 aFrom;
attribute vec3 aTo;
attribute vec4 aSeed;
uniform float uMix, uTime, uSize, uScale, uAspect, uFocal, uWaveFrom, uWaveTo, uMouseOn;
uniform vec2 uOffset, uMouse;
uniform vec3 uRot;
uniform vec4 uRipple;
varying float vAlpha;
varying vec3 vColor;

mat3 rotXYZ(vec3 a) {
  float cx = cos(a.x), sx = sin(a.x), cy = cos(a.y), sy = sin(a.y), cz = cos(a.z), sz = sin(a.z);
  mat3 rx = mat3(1., 0., 0., 0., cx, sx, 0., -sx, cx);
  mat3 ry = mat3(cy, 0., -sy, 0., 1., 0., sy, 0., cy);
  mat3 rz = mat3(cz, sz, 0., -sz, cz, 0., 0., 0., 1.);
  return rz * ry * rx;
}

void main() {
  float d = aSeed.x * 0.45;
  float t = smoothstep(d, d + 0.55, uMix);
  t = t * t * (3. - 2. * t);
  vec3 p = mix(aFrom, aTo, t);
  // Durante a troca de forma as partículas abrem em redemoinho e voltam
  float swirl = sin(t * 3.14159);
  p += (aSeed.yzw - 0.5) * swirl * 1.1;

  float wave = mix(uWaveFrom, uWaveTo, t);
  p.y += (sin(p.x * 2.2 + uTime * 1.1) * 0.12 + cos(p.z * 2.6 + uTime * 0.8) * 0.1) * wave;

  float ph = aSeed.y * 40.;
  p += vec3(sin(uTime * 0.7 + ph), cos(uTime * 0.6 + ph * 1.3), sin(uTime * 0.5 + ph * 0.7)) * 0.012;

  p = rotXYZ(uRot) * p * uScale;
  p.xy += uOffset;

  vec2 dm = p.xy - uMouse;
  float md = length(dm);
  float push = smoothstep(0.55, 0., md) * uMouseOn;
  p.xy += normalize(dm + 1e-4) * push * 0.32;
  p.z += push * 0.4;

  float rt = uTime - uRipple.w;
  vec2 dr = p.xy - uRipple.xy;
  float rd = length(dr);
  float ring = exp(-pow(rd - rt * 2.4, 2.) * 6.) * exp(-rt * 1.4) * step(0., rt);
  p.xy += normalize(dr + 1e-4) * ring * 0.35;

  float z = 6. - p.z;
  vec2 ndc = p.xy * uFocal / z;
  ndc.x /= uAspect;
  gl_Position = vec4(ndc, 0., 1.);
  gl_PointSize = uSize * (0.55 + aSeed.w * 0.9) * (6. / z) * (1. + push * 0.8 + ring * 1.5);

  vec3 violet = vec3(0.54, 0.39, 1.);
  vec3 fuchsia = vec3(0.78, 0.41, 1.);
  vec3 pale = vec3(0.87, 0.83, 1.);
  vColor = mix(violet, fuchsia, aSeed.y);
  vColor = mix(vColor, pale, step(0.93, aSeed.z) + push * 0.6 + ring);
  vAlpha = (0.55 + aSeed.z * 0.45) * clamp(1.15 - (z - 6.) * 0.12, 0.25, 1.) + push * 0.4;
}`;

  const FRAG = `
precision mediump float;
uniform float uAlpha;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float a = smoothstep(0.5, 0.12, length(c));
  gl_FragColor = vec4(vColor, a * vAlpha * uAlpha);
}`;

  function createField(canvas, opts) {
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false, powerPreference: 'high-performance' });
    if (!gl) return null;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);

    const n = opts.count;
    const data = shapes(n);
    const buffers = {};
    for (const k in data) {
      buffers[k] = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[k]);
      gl.bufferData(gl.ARRAY_BUFFER, data[k], gl.STATIC_DRAW);
    }
    const r = rng(99);
    const seeds = new Float32Array(n * 4).map(() => r());
    const seedBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuf);
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);

    const loc = {};
    for (const a of ['aFrom', 'aTo', 'aSeed']) { loc[a] = gl.getAttribLocation(prog, a); gl.enableVertexAttribArray(loc[a]); }
    for (const u of ['uMix', 'uTime', 'uSize', 'uScale', 'uAspect', 'uFocal', 'uWaveFrom', 'uWaveTo', 'uMouseOn', 'uOffset', 'uMouse', 'uRot', 'uRipple', 'uAlpha']) loc[u] = gl.getUniformLocation(prog, u);

    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuf);
    gl.vertexAttribPointer(loc.aSeed, 4, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.disable(gl.DEPTH_TEST);
    gl.uniform4f(loc.uRipple, 0, 0, 0, -100);

    const focal = 1 / Math.tan((40 * Math.PI) / 360);
    let w = 0, h = 0, lost = false;
    canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); lost = true; });

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, opts.maxDpr);
      const cw = canvas.clientWidth, ch = canvas.clientHeight;
      if (cw === w && ch === h) return;
      w = cw; h = ch;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(loc.uAspect, cw / ch);
      gl.uniform1f(loc.uFocal, focal);
      gl.uniform1f(loc.uSize, opts.pointSize * dpr);
    }

    // Converte pixel da tela para coordenadas do mundo no plano z=0 (câmera em z=6)
    const halfH = 6 / focal;
    const toWorld = (px, py) => [((px / w) * 2 - 1) * halfH * (w / h), -((py / h) * 2 - 1) * halfH];
    const pxToWorld = (px) => (px / h) * 2 * halfH;

    function draw(st) {
      if (lost) return;
      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (st.alpha < 0.005) return;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[st.from]);
      gl.vertexAttribPointer(loc.aFrom, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[st.to]);
      gl.vertexAttribPointer(loc.aTo, 3, gl.FLOAT, false, 0, 0);
      gl.uniform1f(loc.uMix, st.mix);
      gl.uniform1f(loc.uTime, st.time);
      gl.uniform1f(loc.uScale, st.scale);
      gl.uniform1f(loc.uWaveFrom, st.waveFrom);
      gl.uniform1f(loc.uWaveTo, st.waveTo);
      gl.uniform1f(loc.uMouseOn, st.mouseOn);
      gl.uniform1f(loc.uAlpha, st.alpha);
      gl.uniform2f(loc.uOffset, st.x, st.y);
      gl.uniform2f(loc.uMouse, st.mx, st.my);
      gl.uniform3f(loc.uRot, st.rx, st.ry, st.rz);
      gl.drawArrays(gl.POINTS, 0, n);
    }

    function ripple(px, py, time) {
      const [x, y] = toWorld(px, py);
      gl.uniform4f(loc.uRipple, x, y, 0, time);
    }

    return { draw, ripple, toWorld, pxToWorld, size: () => [w, h] };
  }

  window.ParticleField = { createField };
})();
