"""Folha de contato: python sheet.py <saida.jpg> <colunas> <largura_thumb> img1 img2 ..."""
import sys, os, re
from PIL import Image, ImageDraw, ImageFont
out, cols, tw = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
fs = sys.argv[4:]
ims = [Image.open(f).convert('RGB') for f in fs]
w, h = ims[0].size
th = int(h * tw / w)
rows = (len(ims) + cols - 1) // cols
S = Image.new('RGB', (cols * (tw + 6), rows * (th + 30)), (40, 40, 40))
d = ImageDraw.Draw(S)
try:
    font = ImageFont.truetype('arial.ttf', 18)
except Exception:
    font = None
for i, (f, im) in enumerate(zip(fs, ims)):
    x, y = (i % cols) * (tw + 6), (i // cols) * (th + 30)
    S.paste(im.resize((tw, th), Image.LANCZOS), (x, y + 26))
    m = re.search(r'(\d+\.\d+|\d{5})', os.path.basename(f))
    d.text((x + 4, y + 3), m.group(1) if m else os.path.basename(f), fill=(255, 220, 120), font=font)
S.save(out, quality=88)
print(out, S.size)
