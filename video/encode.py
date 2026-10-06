"""Junta frames + áudio em MP4.
Uso: python encode.py <desktop|mobile>
desktop -> out/matheus-rocha-desktop-1080p60.mp4 (master) e ../assets/video/showreel.mp4 + poster (web)
mobile  -> out/matheus-rocha-reels-1080x1920-60fps.mp4 (Instagram)
"""
import subprocess, sys, os, json

F = sys.argv[1] if len(sys.argv) > 1 else 'desktop'
FPS = 60


def run(args):
    print(' '.join(args[:8]), '...')
    subprocess.run(args, check=True)


def loudnorm_filter(wav):
    # Passo 1: mede; passo 2: normaliza linear para -14 LUFS / -1 dBTP
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', wav, '-af', 'loudnorm=I=-14:TP=-2:LRA=11:print_format=json', '-f', 'null', '-'],
                       capture_output=True, text=True)
    js = json.loads(r.stderr[r.stderr.rfind('{'):r.stderr.rfind('}') + 1])
    return (f"loudnorm=I=-14:TP=-2:LRA=11:measured_I={js['input_i']}:measured_TP={js['input_tp']}:"
            f"measured_LRA={js['input_lra']}:measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true")


wav = f'out/audio-{F}.wav'
af = loudnorm_filter(wav) + ',aresample=48000'
src = ['-framerate', str(FPS), '-i', f'frames/{F}/%05d.jpg', '-i', wav]
common = ['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
          '-c:a', 'aac', '-b:a', '256k', '-ar', '48000', '-af', af, '-shortest', '-movflags', '+faststart']

if F == 'desktop':
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *src, *common, '-preset', 'slow', '-crf', '16', '-g', '120', 'out/matheus-rocha-desktop-1080p60.mp4'])
    os.makedirs('../assets/video', exist_ok=True)
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', 'out/matheus-rocha-desktop-1080p60.mp4', '-c:v', 'libx264', '-preset', 'slow', '-crf', '25',
         '-maxrate', '6M', '-bufsize', '12M', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-g', '120', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart',
         '../assets/video/showreel.mp4'])
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', 'frames/desktop/00276.jpg', '-vf', 'scale=1280:-2', '-q:v', '4', '../assets/video/showreel-poster.jpg'])
else:
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *src, *common, '-preset', 'slow', '-crf', '17', '-g', '120', '-maxrate', '20M', '-bufsize', '40M',
         'out/matheus-rocha-reels-1080x1920-60fps.mp4'])
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', 'frames/mobile/00276.jpg', '-q:v', '3', 'out/reels-capa.jpg'])
print('ok')
