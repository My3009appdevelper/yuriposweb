# Yuri Light Logo Correction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the defective Yuri light logo with the approved white-soft-plus-cyan treatment while preserving the dark logo's exact canvas, geometry, placement, and transparent silhouette.

**Architecture:** Use a deterministic, one-off Pillow/NumPy transformation outside the repository. The dark PNG is the only geometry and color-structure source; the generated PNG is staged and audited before replacing the live light asset. No React, CSS, component, or dependency changes are allowed.

**Tech Stack:** PNG RGBA, Python 3, Pillow, NumPy, PowerShell, existing npm lint/typecheck/build pipeline.

## Global Constraints

- Modify only `public/assets/brand/yuri-logo-light.png` during implementation.
- Preserve a `1536×1536` RGBA canvas and the dark logo's scale, position, proportions, and orientation.
- Recolor navy areas to `#F1F7FB` and the cyan gesture with a smooth `#008BD3` to `#5BD8FF` range.
- Normalize alpha values `<2` to `0` and values `250–255` to `255`; preserve partial edge antialiasing from `2–249`.
- Set RGB to zero wherever alpha is zero.
- Do not add backgrounds, shadows, glows, outlines, textures, dependencies, or layout changes.
- Preserve all unrelated dirty-worktree changes and stage files explicitly.

---

### Task 1: Generate, replace, and verify the approved light logo

**Files:**
- Reference only: `public/assets/brand/yuri-logo-dark.png`
- Modify: `public/assets/brand/yuri-logo-light.png`
- Create outside repository: `C:/Users/maufu/.codex/visualizations/2026/08/16/01a00b8f-b99b-7131-887e-c176cb671279/build_yuri_logo_light.py`
- Create outside repository: timestamped backup under `C:/Users/maufu/Downloads/`
- Create outside repository: staged PNG and visual audit under `C:/Users/maufu/.codex/visualizations/2026/08/16/01a00b8f-b99b-7131-887e-c176cb671279/`

**Interfaces:**
- Consumes: `yuri-logo-dark.png` as the authoritative RGBA source and the approved palette from the design specification.
- Produces: a lossless `1536×1536` RGBA `yuri-logo-light.png` whose pixels exactly match `build_light(dark_rgba: np.ndarray) -> np.ndarray`.

- [ ] **Step 1: Back up the current light asset and prove the backup is exact**

Run in PowerShell:

```powershell
$asset = 'C:\Apps\maukunweb\public\assets\brand\yuri-logo-light.png'
$backupDir = 'C:\Users\maufu\Downloads\maukunweb-yuri-logo-light-original-20260817'
if (Test-Path -LiteralPath $backupDir) { throw 'El directorio de respaldo ya existe; revisarlo antes de continuar.' }
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
Copy-Item -LiteralPath $asset -Destination $backupDir
$sourceHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $asset).Hash
$backupHash = (Get-FileHash -Algorithm SHA256 -LiteralPath "$backupDir\yuri-logo-light.png").Hash
if ($sourceHash -ne $backupHash) { throw 'El respaldo no coincide con el archivo original.' }
$backupDir
```

Expected: PowerShell prints the timestamped backup directory and throws no error.

- [ ] **Step 2: Create the deterministic generator and audit helper outside the repository**

Create `C:/Users/maufu/.codex/visualizations/2026/08/16/01a00b8f-b99b-7131-887e-c176cb671279/build_yuri_logo_light.py` with this complete content:

```python
from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


EXPECTED_SIZE = (1536, 1536)
FOOTER = (8, 19, 27, 255)


def smoothstep(edge0: float, edge1: float, value: np.ndarray) -> np.ndarray:
    scaled = np.clip((value - edge0) / (edge1 - edge0), 0.0, 1.0)
    return scaled * scaled * (3.0 - 2.0 * scaled)


def build_light(dark_rgba: np.ndarray) -> np.ndarray:
    rgb = dark_rgba[:, :, :3]
    red = rgb[:, :, 0].astype(np.float32)
    green = rgb[:, :, 1].astype(np.float32)
    blue = rgb[:, :, 2].astype(np.float32)

    chroma = green - red
    brightness = (green + blue) * 0.5
    accent = (
        smoothstep(22.0, 72.0, chroma)
        * smoothstep(70.0, 145.0, brightness)
    )[:, :, None]

    accent_light = smoothstep(55.0, 195.0, green)[:, :, None]
    accent_shadow = np.array((0, 139, 211), dtype=np.float32)
    accent_highlight = np.array((91, 216, 255), dtype=np.float32)
    accent_rgb = accent_shadow + (accent_highlight - accent_shadow) * accent_light
    base_rgb = np.broadcast_to(
        np.array((241, 247, 251), dtype=np.float32),
        rgb.shape,
    )
    output_rgb = np.rint(base_rgb * (1.0 - accent) + accent_rgb * accent).astype(np.uint8)

    alpha = dark_rgba[:, :, 3].copy()
    alpha[alpha < 2] = 0
    alpha[alpha >= 250] = 255
    output = np.dstack((output_rgb, alpha))
    output[alpha == 0, :3] = 0
    return output


def visible_bbox(alpha: np.ndarray) -> tuple[int, int, int, int]:
    ys, xs = np.nonzero(alpha)
    if len(xs) == 0:
        raise AssertionError('El logo no contiene píxeles visibles.')
    return int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1


def audit(dark: Image.Image, candidate: Image.Image) -> dict[str, object]:
    if dark.mode != 'RGBA' or candidate.mode != 'RGBA':
        raise AssertionError('Ambos archivos deben decodificar como RGBA.')
    if dark.size != EXPECTED_SIZE or candidate.size != EXPECTED_SIZE:
        raise AssertionError('Ambos archivos deben medir 1536×1536.')

    dark_rgba = np.asarray(dark)
    candidate_rgba = np.asarray(candidate)
    expected = build_light(dark_rgba)
    if not np.array_equal(candidate_rgba, expected):
        different = int(np.any(candidate_rgba != expected, axis=2).sum())
        raise AssertionError(f'El candidato difiere en {different} píxeles del tratamiento aprobado.')

    alpha = candidate_rgba[:, :, 3]
    expected_alpha = expected[:, :, 3]
    if (int(alpha.min()), int(alpha.max())) != (0, 255):
        raise AssertionError('El canal alfa no cubre los extremos 0 y 255.')
    if visible_bbox(alpha) != visible_bbox(expected_alpha):
        raise AssertionError('La posición o la silueta visible cambió.')
    if not np.all(candidate_rgba[alpha == 0, :3] == 0):
        raise AssertionError('Hay color oculto en píxeles totalmente transparentes.')
    if np.any(alpha[0, :]) or np.any(alpha[-1, :]) or np.any(alpha[:, 0]) or np.any(alpha[:, -1]):
        raise AssertionError('El contenido toca el borde del lienzo.')

    return {
        'size': candidate.size,
        'mode': candidate.mode,
        'bbox': visible_bbox(alpha),
        'alpha_extrema': (int(alpha.min()), int(alpha.max())),
        'pixel_exact': True,
        'hidden_rgb_zero': True,
    }


def checker(size: tuple[int, int], cell: int = 18) -> Image.Image:
    width, height = size
    y, x = np.indices((height, width))
    pattern = ((x // cell + y // cell) % 2).astype(np.uint8)
    colors = np.where(
        pattern[..., None] == 0,
        np.array((229, 233, 236)),
        np.array((183, 191, 197)),
    )
    return Image.fromarray(colors.astype(np.uint8), 'RGB').convert('RGBA')


def render_on(candidate: Image.Image, background: Image.Image, size: tuple[int, int]) -> Image.Image:
    preview = candidate.copy()
    preview.thumbnail((size[0] - 24, size[1] - 24), Image.Resampling.LANCZOS)
    canvas = background.copy()
    canvas.alpha_composite(preview, ((size[0] - preview.width) // 2, (size[1] - preview.height) // 2))
    return canvas


def create_contact_sheet(candidate: Image.Image, destination: Path) -> None:
    tile = (360, 220)
    backgrounds = [
        Image.new('RGBA', tile, FOOTER),
        Image.new('RGBA', tile, (255, 255, 255, 255)),
        Image.new('RGBA', tile, (230, 0, 125, 255)),
        checker(tile),
    ]
    sheet = Image.new('RGB', (tile[0] * 2, tile[1] * 2 + 80), '#101820')
    labels = ['Footer #08131B', 'Blanco', 'Magenta', 'Canal alfa']
    draw = ImageDraw.Draw(sheet)
    for index, (background, label) in enumerate(zip(backgrounds, labels)):
        x = (index % 2) * tile[0]
        y = (index // 2) * tile[1] + 40
        sheet.paste(render_on(candidate, background, tile).convert('RGB'), (x, y))
        draw.text((x + 10, y - 24), label, fill='#F1F7FB')

    actual = candidate.copy()
    actual.thumbnail((112, 112), Image.Resampling.LANCZOS)
    actual_strip = Image.new('RGBA', (sheet.width, 40), FOOTER)
    actual_strip.alpha_composite(actual, (24, (40 - actual.height) // 2))
    sheet.paste(actual_strip.convert('RGB'), (0, sheet.height - 40))
    destination.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(destination, format='PNG', optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('dark', type=Path)
    parser.add_argument('candidate', type=Path)
    parser.add_argument('--write', action='store_true')
    parser.add_argument('--contact-sheet', type=Path)
    args = parser.parse_args()

    dark = Image.open(args.dark).convert('RGBA')
    if args.write:
        generated = Image.fromarray(build_light(np.asarray(dark)), 'RGBA')
        args.candidate.parent.mkdir(parents=True, exist_ok=True)
        generated.save(args.candidate, format='PNG', optimize=True, compress_level=9)

    candidate = Image.open(args.candidate).convert('RGBA')
    print(audit(dark, candidate))
    if args.contact_sheet:
        create_contact_sheet(candidate, args.contact_sheet)


if __name__ == '__main__':
    main()
```

- [ ] **Step 3: Run the audit against the current light logo and verify it fails**

Run:

```powershell
uv run --with pillow --with numpy python `
  'C:\Users\maufu\.codex\visualizations\2026\08\16\01a00b8f-b99b-7131-887e-c176cb671279\build_yuri_logo_light.py' `
  'C:\Apps\maukunweb\public\assets\brand\yuri-logo-dark.png' `
  'C:\Apps\maukunweb\public\assets\brand\yuri-logo-light.png'
```

Expected: FAIL with `El candidato difiere en ... píxeles del tratamiento aprobado.` This proves the existing light asset does not already satisfy the approved deterministic design.

- [ ] **Step 4: Generate and audit a staged replacement**

Run:

```powershell
$stage = 'C:\Users\maufu\.codex\visualizations\2026\08\16\01a00b8f-b99b-7131-887e-c176cb671279\yuri-logo-light-staged.png'
$audit = 'C:\Users\maufu\.codex\visualizations\2026\08\16\01a00b8f-b99b-7131-887e-c176cb671279\yuri-logo-light-final-audit.png'
uv run --with pillow --with numpy python `
  'C:\Users\maufu\.codex\visualizations\2026\08\16\01a00b8f-b99b-7131-887e-c176cb671279\build_yuri_logo_light.py' `
  'C:\Apps\maukunweb\public\assets\brand\yuri-logo-dark.png' `
  $stage `
  --write `
  --contact-sheet $audit
```

Expected: a printed audit with `size: (1536, 1536)`, `mode: RGBA`, `alpha_extrema: (0, 255)`, `pixel_exact: True`, and `hidden_rgb_zero: True`.

- [ ] **Step 5: Inspect the staged audit image before touching the live asset**

Open `C:/Users/maufu/.codex/visualizations/2026/08/16/01a00b8f-b99b-7131-887e-c176cb671279/yuri-logo-light-final-audit.png` and verify:

- the white wordmark is continuous and clean;
- the cyan gesture retains a smooth gradient;
- no specks, square background, fringe, or clipped edge appears on any background;
- the 112 px footer rendering remains legible and aligned.

Expected: all four visual backgrounds and the actual-size footer strip pass inspection. If any fails, do not overwrite the live asset.

- [ ] **Step 6: Replace only the live light PNG after confirming it has not changed since backup**

Run using the fixed backup directory created in Step 1:

```powershell
$live = 'C:\Apps\maukunweb\public\assets\brand\yuri-logo-light.png'
$backup = 'C:\Users\maufu\Downloads\maukunweb-yuri-logo-light-original-20260817\yuri-logo-light.png'
$stage = 'C:\Users\maufu\.codex\visualizations\2026\08\16\01a00b8f-b99b-7131-887e-c176cb671279\yuri-logo-light-staged.png'
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $live).Hash -ne (Get-FileHash -Algorithm SHA256 -LiteralPath $backup).Hash) {
  throw 'El logo light cambió después del respaldo; no se sobrescribió.'
}
Copy-Item -LiteralPath $stage -Destination $live -Force
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $live).Hash -ne (Get-FileHash -Algorithm SHA256 -LiteralPath $stage).Hash) {
  throw 'El archivo final no coincide con el candidato auditado.'
}
```

Expected: no error and the live PNG hash equals the staged PNG hash.

- [ ] **Step 7: Re-run the deterministic audit against the live asset**

Run:

```powershell
uv run --with pillow --with numpy python `
  'C:\Users\maufu\.codex\visualizations\2026\08\16\01a00b8f-b99b-7131-887e-c176cb671279\build_yuri_logo_light.py' `
  'C:\Apps\maukunweb\public\assets\brand\yuri-logo-dark.png' `
  'C:\Apps\maukunweb\public\assets\brand\yuri-logo-light.png'
```

Expected: the same passing audit produced for the staged file.

- [ ] **Step 8: Run project verification and inspect the focused worktree diff**

Run:

```powershell
Set-Location 'C:\Apps\maukunweb'
npm test
git diff --check -- 'public/assets/brand/yuri-logo-light.png'
git status --short -- 'public/assets/brand' 'public/assets/difference-yuri' 'public/assets/modulos'
```

Expected: lint, typecheck, and production build pass; the brand scope shows only `yuri-logo-light.png`; the already-corrected `difference-yuri` and `modulos` assets remain untouched by this task.

- [ ] **Step 9: Commit only the approved light logo replacement**

Run:

```powershell
git add -- 'public/assets/brand/yuri-logo-light.png'
git diff --cached --name-only
git diff --cached --check
git commit -m 'fix: rebuild Yuri light logo from dark variant'
```

Expected: the staged-name check lists only `public/assets/brand/yuri-logo-light.png`, and the commit succeeds without including unrelated user changes.
