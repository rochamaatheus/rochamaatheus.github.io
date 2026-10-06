"""Trilha e efeitos sonoros sintetizados do zero (sem amostras externas).
Uso: python audio.py <desktop|mobile>  ->  out/audio-<f>.wav
Os efeitos seguem out/cues-<f>.json, exportado pela timeline da cena.
"""
import json, sys
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

F = sys.argv[1] if len(sys.argv) > 1 else 'desktop'
SR = 48000
DUR = 34.0
N = int(SR * (DUR + 0.5))
BPM = 120
BEAT = 60 / BPM
BAR = BEAT * 4
rng = np.random.default_rng(42)


def tt(sec):
    return np.arange(int(sec * SR)) / SR


def lp(x, fc, order=2):
    return sosfilt(butter(order, min(fc, SR * 0.45), 'low', fs=SR, output='sos'), x)


def hp(x, fc, order=2):
    return sosfilt(butter(order, fc, 'high', fs=SR, output='sos'), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, min(hi, SR * 0.45)], 'band', fs=SR, output='sos'), x)


def sweep_filter(x, f0, f1, kind='band', width=1.0, blocks=64, curve=1.0):
    """Filtro com corte variando no tempo, processado em blocos com estado contínuo."""
    out = np.zeros_like(x)
    n = len(x)
    blocks = max(blocks, n // 256)
    edges = np.linspace(0, n, blocks + 1).astype(int)
    zi = None
    for b in range(blocks):
        p = (b / max(blocks - 1, 1)) ** curve
        fc = f0 * (f1 / f0) ** p
        if kind == 'band':
            sos = butter(2, [fc / (1 + width), min(fc * (1 + width), SR * 0.45)], 'band', fs=SR, output='sos')
        elif kind == 'low':
            sos = butter(2, min(fc, SR * 0.45), 'low', fs=SR, output='sos')
        else:
            sos = butter(2, fc, 'high', fs=SR, output='sos')
        if zi is None or zi.shape != (sos.shape[0], 2):
            zi = np.zeros((sos.shape[0], 2))
        seg, zi = sosfilt(sos, x[edges[b]:edges[b + 1]], zi=zi)
        out[edges[b]:edges[b + 1]] = seg
    return out


def saw(freq, t, detune=0.0):
    ph = (freq * (1 + detune) * t) % 1.0
    return 2 * ph - 1


def note(n):
    return 440.0 * 2 ** ((n - 69) / 12)


class Bus:
    def __init__(self):
        self.L = np.zeros(N)
        self.R = np.zeros(N)

    def add(self, sig, at, gain=1.0, pan=0.0):
        i = int(at * SR)
        if i >= N or i + len(sig) <= 0:
            return
        if i < 0:
            sig = sig[-i:]
            i = 0
        sig = sig[: N - i]
        a = (pan + 1) * np.pi / 4
        self.L[i:i + len(sig)] += sig * gain * np.cos(a)
        self.R[i:i + len(sig)] += sig * gain * np.sin(a)

    def addst(self, l, r, at, gain=1.0):
        i = int(at * SR)
        l, r = l[: N - i], r[: N - i]
        self.L[i:i + len(l)] += l * gain
        self.R[i:i + len(r)] += r * gain


def reverb(L, R, decay=0.7, length=2.4, mix=0.25, tone=6000):
    t = tt(length)
    irs = []
    for s in (1, 2):
        ir = np.random.default_rng(s).standard_normal(len(t)) * np.exp(-t / decay * 3)
        ir[: int(0.012 * SR)] *= np.linspace(0, 1, int(0.012 * SR))
        irs.append(lp(ir, tone) / np.sqrt(np.sum(ir ** 2)))
    wl = fftconvolve(L, irs[0])[: len(L)]
    wr = fftconvolve(R, irs[1])[: len(R)]
    return L + wl * mix, R + wr * mix


# ---------- instrumentos ----------
def kick():
    t = tt(0.5)
    f = 50 + 120 * np.exp(-t / 0.03)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-t / 0.2)
    click = hp(rng.standard_normal(len(t)), 2500) * np.exp(-t / 0.005) * 0.5
    return np.tanh((body + click) * 1.6)


def clap():
    t = tt(0.4)
    n = rng.standard_normal(len(t))
    env = np.zeros(len(t))
    for d in (0, 0.011, 0.022):
        env += (t >= d) * np.exp(-np.maximum(t - d, 0) / 0.009)
    env += (t >= 0.03) * np.exp(-np.maximum(t - 0.03, 0) / 0.13) * 0.8
    return bp(n, 900, 4200) * env


def hat(open_=False):
    t = tt(0.35 if open_ else 0.08)
    n = rng.standard_normal(len(t))
    return hp(n, 7500, 3) * np.exp(-t / (0.11 if open_ else 0.022))


def bass_note(f, length=0.23):
    t = tt(length)
    s = saw(f, t) * 0.8 + saw(f, t, 0.006) * 0.6 + np.sin(2 * np.pi * f * t) * 0.5
    env = np.minimum(t / 0.004, 1) * np.exp(-t / 0.35) * np.clip((length - t) / 0.02, 0, 1)
    out = hp(sweep_filter(s, 2200, 350, 'low', blocks=16, curve=0.5), 45)
    return np.tanh(out * env * 1.3)


def pluck(f, length=0.3):
    t = tt(length)
    s = saw(f, t) + 0.5 * saw(f * 2, t, 0.003)
    env = np.minimum(t / 0.002, 1) * np.exp(-t / 0.11)
    return sweep_filter(s, 7500, 1600, 'low', blocks=12, curve=0.6) * env


def pad_chord(freqs, length):
    t = tt(length)
    l = np.zeros(len(t))
    r = np.zeros(len(t))
    for f in freqs:
        for k, d in enumerate((-0.008, 0, 0.008)):
            v = saw(f, t, d)
            if k == 0:
                l += v
            elif k == 2:
                r += v
            else:
                l += v * 0.7
                r += v * 0.7
    env = np.minimum(t / 0.25, 1) * np.clip((length - t) / 0.35, 0, 1)
    return hp(lp(l, 2600), 120) * env, hp(lp(r, 2600), 120) * env


def lead_note(f, length):
    t = tt(length)
    vib = 1 + 0.004 * np.sin(2 * np.pi * 5.5 * t) * np.minimum(t / 0.15, 1)
    ph = 2 * np.pi * np.cumsum(f * vib) / SR
    s = np.sign(np.sin(ph)) * 0.45 + np.sin(ph) * 0.6 + saw(f, t, 0.004) * 0.35
    env = np.minimum(t / 0.01, 1) * np.exp(-t / 0.6) * np.clip((length - t) / 0.03, 0, 1)
    return lp(s, 3800) * env


# ---------- arranjo ----------
CH = [  # Am, F, C, G (raiz do baixo e notas do acorde)
    (33, [57, 60, 64]),
    (29, [53, 57, 60]),
    (36, [55, 60, 64]),
    (31, [55, 59, 62]),
]
music = Bus()
pads = Bus()
synth = Bus()   # vai para o sidechain
drums = Bus()
K, C_, HC, HO = kick(), clap(), hat(), hat(True)
kicks = []


def bar_of(t):
    return int(t // BAR)


for b in range(17):
    t0 = b * BAR
    root, chord = CH[b % 4]
    full = b in range(2, 9) or b in range(10, 15)
    drums_on = b == 1 or full or b == 9
    # pad em todos os compassos, mais aberto depois do drop
    if b < 16:
        l, r = pad_chord([note(n) for n in chord], BAR + 0.3)
        pads.addst(l, r, t0, 0.05 if b < 2 else 0.065)
    # baixo
    if 1 <= b <= 14:
        for e in range(8):
            tn = t0 + e * BEAT / 2
            if b == 1 and tn >= 3.875:
                continue
            g = (0.33 if e % 2 else 0.22) * (0.7 if b == 1 else 1)
            synth.add(bass_note(note(root + 12)), tn, g)
    # arpejo em semicolcheias
    if 1 <= b <= 15:
        seq = [0, 1, 2, 1, 0, 2, 1, 2, 0, 1, 2, 1, 0, 2, 1, 2]
        for e, k in enumerate(seq):
            tn = t0 + e * BEAT / 4
            if b == 1 and tn >= 3.875:
                continue
            octave = 12 if (e // 4) % 2 else 24
            g = 0.07 if b in (1, 15) else 0.1
            synth.add(pluck(note(chord[k] + octave - 12)), tn, g, pan=0.35 if e % 2 else -0.35)
    # bateria
    if drums_on:
        for q in range(4):
            tb = t0 + q * BEAT
            if b == 9 and tb < t0 + BAR / 2:
                continue
            drums.add(K, tb, 0.55 if b == 1 else 0.85)
            kicks.append(tb)
            for s16 in range(4):
                th = tb + s16 * BEAT / 4
                if b == 1 and th >= 3.875:
                    continue
                g = (0.2 if s16 == 2 else 0.1) * (0.6 if b == 1 else 1)
                drums.add(HC, th, g, pan=0.25)
            if full and q % 2 == 1:
                drums.add(C_, tb, 0.6, pan=-0.05)
            if full:
                drums.add(HO, tb + BEAT / 2, 0.14, pan=-0.25)
    # virada de caixa antes do drop e antes da volta
    if b in (1, 8, 9, 14):
        start = t0 + (BAR / 2 if b == 1 else BAR * 0.75)
        steps = 16 if b == 1 else 8
        for i in range(steps):
            tn = start + i * BEAT / 4 * (0.5 if b == 1 and i >= 8 else 1)
            if b == 1 and tn >= 3.875:
                continue
            drums.add(C_, tn, 0.12 + 0.3 * i / steps)

# melodia nos compassos 11 a 14 (22 a 30s)
MEL = [(76, 0.0, 0.5), (74, 0.5, 0.25), (76, 0.75, 0.5), (79, 1.5, 0.5),
       (81, 0.0, 0.75), (79, 0.75, 0.25), (76, 1.0, 0.75),
       (72, 0.0, 0.5), (74, 0.5, 0.5), (76, 1.0, 0.5), (79, 1.5, 0.5),
       (74, 0.0, 0.75), (76, 0.75, 0.25), (74, 1.0, 1.0)]
groups = [MEL[0:4], MEL[4:7], MEL[7:11], MEL[11:14]]
lead = Bus()
for bi, grp in enumerate(groups):
    for n_, off, ln in grp:
        lead.add(lead_note(note(n_), ln * 0.95 + 0.05), 22.0 + bi * BAR + off, 0.11, pan=0.1)
# eco de 3/16
dly = int(0.375 * SR)
for _ in range(3):
    lead.L[dly:] += lead.L[:-dly] * 0.33
    lead.R[dly:] += lead.R[:-dly] * 0.33

# acorde final no impacto dos 32s
l, r = pad_chord([note(n) for n in [45, 57, 60, 64, 69]], 2.4)
music.addst(l * 1.6, r * 1.6, 32.0, 0.09)
drums.add(K, 32.0, 1.0)

# sidechain: abaixa sintetizadores a cada bumbo
duck = np.ones(N)
tN = np.arange(N) / SR
for k in kicks:
    i = int(k * SR)
    j = min(N, i + int(0.3 * SR))
    duck[i:j] = np.minimum(duck[i:j], 1 - 0.72 * np.exp(-(tN[i:j] - k) / 0.1))
for bus in (synth, pads, lead):
    bus.L *= duck
    bus.R *= duck

# filtro de abertura no começo (compassos 0 e 1) e na pausa do compasso 15
def automate_lp(bus, segs):
    for a, b_, f0, f1 in segs:
        i, j = int(a * SR), int(b_ * SR)
        bus.L[i:j] = sweep_filter(bus.L[i:j], f0, f1, 'low', blocks=48)
        bus.R[i:j] = sweep_filter(bus.R[i:j], f0, f1, 'low', blocks=48)

automate_lp(synth, [(2.0, 4.0, 500, 6000), (18.0, 19.0, 6000, 900), (19.0, 20.0, 900, 8000), (30.0, 32.0, 1200, 9000)])
automate_lp(pads, [(0.0, 4.0, 300, 3000)])

ML = music.L + pads.L + synth.L + lead.L
MR = music.R + pads.R + synth.R + lead.R
ML, MR = reverb(ML, MR, decay=0.8, length=2.6, mix=0.22)
ML += drums.L
MR += drums.R

# ---------- efeitos sonoros ----------
def sfx(kind):
    if kind == 'pop':
        t = tt(0.18)
        f = 320 + 700 * (1 - np.exp(-t / 0.012))
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.055) * 0.9
    if kind == 'click':
        t = tt(0.05)
        return (hp(rng.standard_normal(len(t)), 3000) * np.exp(-t / 0.004) * 0.6 + np.sin(2 * np.pi * 1700 * t) * np.exp(-t / 0.01) * 0.5)
    if kind == 'tick':
        t = tt(0.05)
        f = 2400 * (1 + rng.uniform(-0.08, 0.08))
        return np.sin(2 * np.pi * f * t) * np.exp(-t / 0.012) * 0.7
    if kind == 'thud':
        t = tt(0.35)
        f = 48 + 90 * np.exp(-t / 0.04)
        b = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.15)
        return np.tanh(1.5 * (b + lp(rng.standard_normal(len(t)), 900) * np.exp(-t / 0.02) * 0.4))
    if kind in ('swish', 'whoosh', 'riser', 'riser_short', 'swell', 'swipe', 'suck'):
        length = {'swish': 0.3, 'whoosh': 0.6, 'riser': 1.75, 'riser_short': 0.5, 'swell': 0.7, 'swipe': 0.2, 'suck': 0.5}[kind]
        t = tt(length)
        n = rng.standard_normal(len(t))
        x = t / length
        if kind in ('riser', 'riser_short'):
            s = sweep_filter(n, 400, 9000, 'band', 0.6, blocks=64, curve=1.4)
            s += np.sin(2 * np.pi * np.cumsum(180 + 900 * x ** 2) / SR) * 0.25
            env = x ** 2.2
        elif kind == 'swell':
            s = sweep_filter(n, 1500, 10000, 'band', 0.8, blocks=48)
            env = x ** 3
        elif kind == 'swipe':
            s = sweep_filter(n, 1200, 9000, 'band', 0.5, blocks=24)
            env = np.sin(np.pi * x) ** 1.5
        else:
            s = sweep_filter(n, 350 if kind != 'swish' else 1800, 3200 if kind != 'swish' else 7000, 'band', 0.7, blocks=48)
            env = np.sin(np.pi * x) ** 2
        out = s * env
        if kind == 'suck':
            out = out[::-1] * np.linspace(0.2, 1, len(out))
        return out / (np.max(np.abs(out)) + 1e-9) * 0.8
    if kind in ('impact', 'impact_soft'):
        t = tt(2.0)
        f = 38 + 70 * np.exp(-t / 0.06)
        sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.55)
        burst = lp(rng.standard_normal(len(t)), 2500) * np.exp(-t / 0.05) * 0.6
        s = sub + burst
        if kind == 'impact':
            s += hp(rng.standard_normal(len(t)), 5000) * np.exp(-t / 0.7) * 0.22
        return np.tanh(s * 1.4) * (1.0 if kind == 'impact' else 0.65)
    if kind == 'shimmer':
        t = tt(1.4)
        s = np.zeros(len(t))
        for k, n_ in enumerate((81, 84, 88, 93, 96)):
            d = int(k * 0.045 * SR)
            tk = t[: len(t) - d]
            s[d:] += np.sin(2 * np.pi * note(n_) * tk) * np.exp(-tk / 0.45) * 0.3
        return s
    if kind == 'glitch':
        t = tt(0.28)
        s = np.zeros(len(t))
        seg = int(0.028 * SR)
        for i in range(0, len(t), seg):
            f = rng.choice([180, 330, 660, 1320, 2600])
            part = np.sign(np.sin(2 * np.pi * f * t[: min(seg, len(t) - i)]))
            if rng.random() < 0.4:
                part = np.round(rng.standard_normal(len(part)) * 3) / 3
            s[i:i + len(part)] = part * (0.3 if rng.random() < 0.3 else 0.8)
        return lp(s, 7000) * 0.5
    if kind == 'ding':
        t = tt(0.7)
        a = np.sin(2 * np.pi * 1318.5 * t) * np.exp(-t / 0.18)
        d = int(0.09 * SR)
        b = np.zeros(len(t))
        b[d:] = np.sin(2 * np.pi * 1760 * t[: len(t) - d]) * np.exp(-t[: len(t) - d] / 0.25)
        return (a * 0.5 + b * 0.6) * 0.8
    if kind == 'send':
        t = tt(0.22)
        f = 500 + 1100 * (t / 0.22) ** 0.6
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.07) * 0.7
    raise ValueError(kind)


fx = Bus()
cues = json.load(open(f'out/cues-{F}.json', encoding='utf-8'))['cues']
GAIN = {'pop': 0.32, 'click': 0.3, 'tick': 0.16, 'thud': 0.42, 'swish': 0.16, 'whoosh': 0.26, 'riser': 0.22, 'riser_short': 0.2,
        'swell': 0.24, 'swipe': 0.2, 'suck': 0.24, 'impact': 0.55, 'impact_soft': 0.42, 'shimmer': 0.16, 'glitch': 0.26, 'ding': 0.26, 'send': 0.24}
for c in cues:
    s = sfx(c['type'])
    at = c['t']
    if c['type'] == 'riser':
        at = 2.0 - len(s) / SR
    if c['type'] == 'riser_short':
        at = c['t']
    if c['type'] in ('whoosh',):
        at -= 0.12
    fx.add(s, at, GAIN[c['type']] * c['gain'], c['pan'])
# riser final para o impacto dos 32s
fx.add(sfx('riser'), 32.0 - 1.75, 0.2)
FL, FR = reverb(fx.L, fx.R, decay=0.5, length=1.6, mix=0.18)

L = hp(ML + FL, 32)
R = hp(MR + FR, 32)
# leve realce de agudos (shelf simples: soma do passa-altas)
L = L + hp(L, 4000) * 0.5
R = R + hp(R, 4000) * 0.5
# fade de saída
fade = np.ones(N)
a, b_ = int(33.0 * SR), int(DUR * SR)
fade[a:b_] = np.linspace(1, 0, b_ - a) ** 1.5
fade[b_:] = 0
L *= fade
R *= fade
peak = max(np.max(np.abs(L)), np.max(np.abs(R)))
L, R = L / peak * 1.25, R / peak * 1.25
L, R = np.tanh(L) / np.tanh(1.25), np.tanh(R) / np.tanh(1.25)
L, R = L * 0.95, R * 0.95
out = np.stack([L, R], 1)[: int(DUR * SR)]
wavfile.write(f'out/audio-{F}.wav', SR, (out * 32767).astype(np.int16))
print('ok', out.shape, 'cues', len(cues))
