"""One-off: fetch Squarespace event images into public/photos/events/archive."""
from __future__ import annotations

import re
import pathlib
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
TS_PATH = ROOT / "src" / "data" / "groningenEventsArchive.ts"
OUTDIR = ROOT / "public" / "photos" / "events" / "archive"


def ext_from_url(url: str) -> str:
    base = url.split("?", 1)[0].rsplit(".", 1)
    if len(base) == 2 and base[1].lower() in ("png", "jpg", "jpeg", "webp", "gif"):
        return base[1].lower()
    return "jpg"


def main() -> None:
    text = TS_PATH.read_text(encoding="utf-8")
    urls = re.findall(
        r'"(https://images\.squarespace-cdn\.com[^"]+)"',
        text,
    )
    OUTDIR.mkdir(parents=True, exist_ok=True)

    seen: dict[str, str] = {}
    n = 0
    ua = {"User-Agent": "SAIN-site-archive-fetch/1.0"}

    for url in urls:
        if url in seen:
            continue
        n += 1
        ext = ext_from_url(url)
        fname = f"archive-{n:02d}.{ext}"
        dest = OUTDIR / fname
        if not dest.exists():
            req = urllib.request.Request(url, headers=ua)
            with urllib.request.urlopen(req, timeout=120) as r:
                dest.write_bytes(r.read())
            print(f"downloaded {fname} ({dest.stat().st_size} bytes)")
        else:
            print(f"exists {fname}")
        seen[url] = f"/photos/events/archive/{fname}"

    new = text
    for url, path in seen.items():
        new = new.replace(f'"{url}"', f'"{path}"')

    if new != text:
        TS_PATH.write_text(new, encoding="utf-8")
        print("updated groningenEventsArchive.ts")

    print(f"unique images: {len(seen)}, url occurrences in file: {len(urls)}")


if __name__ == "__main__":
    main()
