#!/usr/bin/env python3
"""폰트 서브셋 생성기.  실행: python scripts/subset-fonts.py  (fonttools, brotli 필요)

design/fonts-full/ 의 원본에서 글꼴마다 두 조각을 만든다.
  core : 지금 사이트(content/, app/, components/, lib/)에 실제로 쓰인 글자 + 라틴·문장부호
  rest : KS X 1001 완성형 2,350자 중 core에 없는 나머지
두 조각은 app/fonts.css 에 unicode-range로 선언되어, 브라우저는 페이지에 필요한 조각만 받는다.
콘텐츠에 새 글자가 생겨도 rest가 받쳐 주므로 깨지지 않는다. 다만 core를 최신으로 유지하려면
콘텐츠를 크게 바꾼 뒤 이 스크립트를 다시 돌린다.
"""
import glob, io, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'design', 'fonts-full')
OUT = os.path.join(ROOT, 'public', 'fonts')
FONTS = [
    ('Noto Serif KR', 'NotoSerifKR-500', '400 600', 'woff2'),
    ('Pretendard Variable', 'PretendardVariable', '400 600', 'woff2-variations'),
]

def ksx1001():
    return {bytes([hi, lo]).decode('euc_kr') for hi in range(0xB0, 0xC9) for lo in range(0xA1, 0xFF)}

def basics():
    s = set()
    for a, b in [(0x20, 0x7E), (0xA0, 0xFF), (0x2010, 0x2027), (0x2030, 0x203A), (0x3000, 0x3003), (0x2190, 0x2193)]:
        s.update(chr(c) for c in range(a, b + 1))
    s.update('·–—…‘’“”○●₩⌘℃→←↑↓✓×÷°™©®')
    return s

def site_chars():
    used = set()
    for pat in ['content/**/*', 'app/**/*.tsx', 'components/**/*.tsx', 'lib/**/*.ts']:
        for f in glob.glob(os.path.join(ROOT, pat), recursive=True):
            if os.path.isfile(f):
                used.update(io.open(f, encoding='utf-8', errors='ignore').read())
    return {c for c in used if c >= ' '}

def ranges(chars):
    cps = sorted(ord(c) for c in chars)
    out, start, prev = [], cps[0], cps[0]
    for cp in cps[1:]:
        if cp != prev + 1:
            out.append((start, prev)); start = cp
        prev = cp
    out.append((start, prev))
    return ', '.join(f'U+{a:X}' if a == b else f'U+{a:X}-{b:X}' for a, b in out)

def main():
    core = basics() | site_chars()
    rest = (ksx1001() | {chr(c) for c in range(0x3131, 0x318F)}) - core
    css = ['/* scripts/subset-fonts.py 가 생성한 파일 — 직접 고치지 말 것 */']
    for family, name, weight, fmt in FONTS:
        for part, chars in (('core', core), ('rest', rest)):
            txt = os.path.join(SRC, f'chars-{part}.txt')
            io.open(txt, 'w', encoding='utf-8').write(''.join(sorted(chars)))
            dst = os.path.join(OUT, f'{name}.{part}.woff2')
            subprocess.check_call([sys.executable, '-m', 'fontTools.subset', os.path.join(SRC, f'{name}.woff2'),
                                   f'--text-file={txt}', '--flavor=woff2', '--layout-features=*', f'--output-file={dst}'])
            print(f'{os.path.basename(dst):40} {os.path.getsize(dst) // 1024:5} KB  ({len(chars)} chars)')
            css.append(f"@font-face {{\n  font-family: '{family}';\n  font-weight: {weight};\n  font-style: normal;\n  font-display: swap;\n"
                       f"  src: url('../public/fonts/{name}.{part}.woff2') format('{fmt}');\n  unicode-range: {ranges(chars)};\n}}")
    io.open(os.path.join(ROOT, 'app', 'fonts.css'), 'w', encoding='utf-8').write('\n'.join(css) + '\n')

if __name__ == '__main__':
    main()
