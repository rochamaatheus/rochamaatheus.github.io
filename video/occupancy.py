"""Ocupação por pixel: caixa que contém 96% dos pixels com borda forte (conteúdo), a cada 0,5 s."""
import sys, glob
import numpy as np
from PIL import Image, ImageFilter
F = sys.argv[1]
files = sorted(glob.glob(f'frames/{F}/*.jpg'))[::30]
low = []
for i, f in enumerate(files):
    im = Image.open(f).convert('L').resize((480, 270) if F == 'desktop' else (270, 480))
    e = np.asarray(im.filter(ImageFilter.FIND_EDGES), dtype=np.float32)
    ys, xs = np.nonzero(e > 40)
    if len(xs) < 50:
        cov = 0.0
    else:
        x0, x1 = np.percentile(xs, [2, 98]); y0, y1 = np.percentile(ys, [2, 98])
        cov = (x1 - x0) * (y1 - y0) / (e.shape[0] * e.shape[1])
    t = i * 0.5
    if cov < 0.35:
        low.append((t, round(float(cov), 2)))
print(F, 'amostras', len(files), 'abaixo de 35% da tela:', low)
