from pathlib import Path
import struct
import zlib

ROOT = Path(__file__).resolve().parent.parent
BG = (11, 11, 11, 255)
INK = (242, 242, 240, 255)
ACCENT = (255, 74, 10, 255)

INK_RECTS = [
    (4, 5, 6, 2), (11, 5, 7, 2),
    (4, 9, 3, 2), (8, 9, 5, 2), (14, 9, 4, 2),
    (4, 13, 8, 2), (13, 13, 5, 2),
    (4, 17, 4, 2), (9, 17, 8, 2),
    (4, 21, 7, 2), (12, 21, 6, 2),
    (4, 25, 4, 2), (9, 25, 6, 2),
]

ACCENT_RECTS = [
    (20, 7, 1, 2), (19, 15, 1, 2), (20, 23, 1, 2),
    *[(x, y, 2, 2) for y in (5, 9, 13, 17, 21, 25) for x in (22, 26, 30)],
]


def render(size, scale, offset):
    pixels = bytearray(BG * (size * size))

    def draw(rect, color):
        x, y, width, height = rect
        left = offset + x * scale
        top = offset + y * scale
        right = left + width * scale
        bottom = top + height * scale
        color_bytes = bytes(color)

        for py in range(top, bottom):
            row = py * size * 4
            for px in range(left, right):
                index = row + px * 4
                pixels[index:index + 4] = color_bytes

    for rect in INK_RECTS:
        draw(rect, INK)
    for rect in ACCENT_RECTS:
        draw(rect, ACCENT)

    return bytes(pixels)


def png_bytes(size, pixels):
    def chunk(kind, data):
        return (
            struct.pack(">I", len(data))
            + kind
            + data
            + struct.pack(">I", zlib.crc32(kind + data) & 0xFFFFFFFF)
        )

    rows = b"".join(
        b"\x00" + pixels[row * size * 4:(row + 1) * size * 4]
        for row in range(size)
    )
    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(rows, 9))
        + chunk(b"IEND", b"")
    )


def write_png(filename, size, scale, offset):
    (ROOT / filename).write_bytes(png_bytes(size, render(size, scale, offset)))


def write_ico(filename):
    frames = []
    for size in (16, 32, 48):
        source = render(32, 1, 0)
        if size == 32:
            pixels = source
        else:
            pixels = bytearray(size * size * 4)
            for y in range(size):
                source_y = min(31, y * 32 // size)
                for x in range(size):
                    source_x = min(31, x * 32 // size)
                    source_index = (source_y * 32 + source_x) * 4
                    target_index = (y * size + x) * 4
                    pixels[target_index:target_index + 4] = source[source_index:source_index + 4]
            pixels = bytes(pixels)
        frames.append((size, png_bytes(size, pixels)))

    header_size = 6 + 16 * len(frames)
    offset = header_size
    entries = []
    payload = []
    for size, frame in frames:
        entries.append(
            struct.pack(
                "<BBBBHHII",
                size,
                size,
                0,
                0,
                1,
                32,
                len(frame),
                offset,
            )
        )
        payload.append(frame)
        offset += len(frame)

    (ROOT / filename).write_bytes(
        struct.pack("<HHH", 0, 1, len(frames))
        + b"".join(entries)
        + b"".join(payload)
    )


write_png("favicon-192x192.png", 192, 6, 0)
write_png("favicon-512x512.png", 512, 16, 0)
write_png("social-preview.png", 512, 16, 0)
write_png("favicon-maskable-512x512.png", 512, 12, 64)
write_png("apple-touch-icon.png", 180, 5, 10)
write_ico("favicon.ico")
