"""Análise frame a frame do render.
Uso: python analyze.py <desktop|mobile>
- Fluidez: diferença média entre frames consecutivos; aponta saltos (picos isolados fora dos cortes
  planejados) e trechos parados (sem movimento perceptível).
- Ocupação: área coberta pelos textos visíveis (via DOM, a cada 5 frames).
- Cortes e zonas seguras: texto saindo do quadro; no mobile, texto nas faixas da interface do Reels.
- Folhas de contato a cada 0,5 s em out/contact-<f>-N.jpg
"""
import json, sys, glob
import numpy as np
from PIL import Image

F = sys.argv[1] if len(sys.argv) > 1 else 'desktop'
W, H = (1080, 1920) if F == 'mobile' else (1920, 1080)
FPS = 60
files = sorted(glob.glob(f'frames/{F}/*.jpg'))
n = len(files)
CUTS = [2.0, 4.0, 6.0, 9.85, 10.0, 11.8, 13.8, 15.8, 17.85, 21.6, 22.0, 25.5, 26.0, 29.5, 29.95, 32.0]
near_cut = lambda t, tol=0.22: any(abs(t - c) <= tol for c in CUTS)

small = []
for f in files:
    im = Image.open(f).convert('L').resize((W // 8, H // 8), Image.BILINEAR)
    small.append(np.asarray(im, dtype=np.float32))
small = np.stack(small)
mad = np.zeros(n)
mad[1:] = np.abs(np.diff(small, axis=0)).mean(axis=(1, 2))

report = {'format': F, 'frames': n, 'jumps': [], 'still': [], 'low_coverage': [], 'overflow': [], 'unsafe': []}
for i in range(2, n - 2):
    t = i / FPS
    win = np.concatenate([mad[max(1, i - 6):i], mad[i + 1:i + 7]])
    med = np.median(win)
    if mad[i] > 2.5 and mad[i] > 3.5 * max(med, 0.3) and not near_cut(t):
        report['jumps'].append({'t': round(t, 3), 'mad': round(float(mad[i]), 2), 'vizinhos': round(float(med), 2)})

run = 0
for i in range(1, n):
    if mad[i] < 0.35:
        run += 1
    else:
        if run >= 30:
            report['still'].append({'de': round((i - run) / FPS, 2), 'ate': round(i / FPS, 2)})
        run = 0
if run >= 30:
    report['still'].append({'de': round((n - run) / FPS, 2), 'ate': round(n / FPS, 2)})

insp = json.load(open(f'out/inspect-{F}.json', encoding='utf-8'))
TOP, BOTTOM = (250, 1920 - 420) if F == 'mobile' else (0, H)
for k in sorted(insp, key=int):
    i = int(k)
    t = i / FPS
    els = insp[k]
    if near_cut(t, 0.35) or t < 1.0 or t > 33.6:
        continue
    if els:
        x0 = min(e['x'] for e in els); y0 = min(e['y'] for e in els)
        x1 = max(e['r'] for e in els); y1 = max(e['b'] for e in els)
        cov = max(0, (min(x1, W) - max(x0, 0))) * max(0, (min(y1, H) - max(y0, 0))) / (W * H)
    else:
        cov = 0
    if cov < 0.3:
        report['low_coverage'].append({'t': round(t, 2), 'cobertura': round(cov, 2)})
    for e in els:
        if e['x'] < -2 or e['r'] > W + 2 or e['y'] < -2 or e['b'] > H + 2:
            report['overflow'].append({'t': round(t, 2), **e})
        if F == 'mobile' and (e['y'] < TOP or e['b'] > BOTTOM):
            report['unsafe'].append({'t': round(t, 2), **e})

def squash(items, key='t', gap=0.2):
    """Junta ocorrências seguidas do mesmo elemento num intervalo."""
    out = []
    for it in items:
        idk = it.get('id', '')
        if out and out[-1].get('id', '') == idk and it[key] - out[-1]['ate'] <= gap:
            out[-1]['ate'] = it[key]
        else:
            d = dict(it); d['de'] = it[key]; d['ate'] = it[key]; d.pop(key, None)
            out.append(d)
    return out

for k in ('overflow', 'unsafe', 'low_coverage'):
    report[k] = squash(sorted(report[k], key=lambda e: (e.get('id', ''), e['t'])))
report['mad_stats'] = {'media': round(float(mad[1:].mean()), 2), 'p95': round(float(np.percentile(mad[1:], 95)), 2), 'max': round(float(mad.max()), 2), 't_max': round(float(mad.argmax() / FPS), 2)}
json.dump(report, open(f'out/analysis-{F}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# gráfico de movimento por frame
try:
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    fig, ax = plt.subplots(figsize=(16, 3.2), dpi=100)
    ax.plot(np.arange(n) / FPS, mad, lw=0.8, color='#8a63ff')
    for c in CUTS:
        ax.axvline(c, color='#c668ff', alpha=0.25, lw=1)
    for j in report['jumps']:
        ax.plot(j['t'], j['mad'], 'o', color='red')
    ax.set_xlim(0, n / FPS); ax.set_xlabel('s'); ax.set_ylabel('dif. média')
    ax.set_title(f'Movimento entre frames ({F}) · linhas = cortes planejados · vermelho = salto')
    fig.tight_layout(); fig.savefig(f'out/motion-{F}.png'); plt.close(fig)
except ImportError:
    pass

# folhas de contato a cada 0,5 s
sel = files[::FPS // 2]
cols = 6 if F == 'desktop' else 9
tw = 300 if F == 'desktop' else 190
th = int(tw * H / W)
per = cols * (6 if F == 'desktop' else 4)
for s in range(0, len(sel), per):
    chunk = sel[s:s + per]
    rows = (len(chunk) + cols - 1) // cols
    S = Image.new('RGB', (cols * (tw + 4), rows * (th + 4)), (30, 30, 30))
    for j, f in enumerate(chunk):
        S.paste(Image.open(f).resize((tw, th), Image.BILINEAR), ((j % cols) * (tw + 4), (j // cols) * (th + 4)))
    S.save(f'out/contact-{F}-{s // per}.jpg', quality=85)
print(json.dumps({k: (v if not isinstance(v, list) else len(v)) for k, v in report.items()}, ensure_ascii=False))
