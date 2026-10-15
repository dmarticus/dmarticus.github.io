// Compacting context: a scattered cloud of points is drawn into a dense,
// ordered block. The points that don't fit fade out on the way in. It holds,
// releases, and the cycle repeats. One-bit dots in the theme's ink color.
(function () {
    "use strict";

    var canvas = document.getElementById("compaction");
    if (!canvas || !canvas.getContext) return;

    var W = canvas.width, H = canvas.height;
    var ctx = canvas.getContext("2d");
    var image = ctx.createImageData(W, H);
    var data = image.data;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var ink = [0, 0, 0];
    function readInk() {
        var hex = getComputedStyle(document.documentElement).getPropertyValue("--text").trim();
        var m = /^#([0-9a-f]{6})$/i.exec(hex);
        if (!m) return;
        var n = parseInt(m[1], 16);
        ink = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    readInk();
    new MutationObserver(readInk).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", readInk);

    // Deterministic pseudo-random so the cloud is the same on every visit.
    var seed = 1234567;
    function rand() {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return seed / 0x7fffffff;
    }

    var GRID = 28;              // the compacted block is GRID x GRID cells
    var CELL = 2;               // pixels per cell
    var KEPT = GRID * GRID;     // points that survive compaction
    var N = Math.round(KEPT * 1.6); // the rest get dropped
    // The block sits in the canvas's top-left corner so it lines up with the
    // first line of text and the column edge; the cloud fills the whole square.
    var bx = 0, by = 0;
    var cx = bx + (GRID * CELL) / 2, cy = by + (GRID * CELL) / 2;
    var maxD = Math.sqrt(W * W + H * H);

    var pts = [];
    for (var i = 0; i < N; i++) {
        var sx = 1 + rand() * (W - 2), sy = 1 + rand() * (H - 2);
        var dx = sx - cx, dy = sy - cy;
        pts.push({ sx: sx, sy: sy, d: Math.sqrt(dx * dx + dy * dy) / maxD });
    }
    // Grid slots fill from the block's center outward; the nearest points take them.
    var slots = [];
    for (var g = 0; g < KEPT; g++) {
        slots.push([bx + (g % GRID) * CELL + CELL / 2, by + Math.floor(g / GRID) * CELL + CELL / 2]);
    }
    slots.sort(function (a, b) {
        var da = (a[0] - cx) * (a[0] - cx) + (a[1] - cy) * (a[1] - cy);
        var db = (b[0] - cx) * (b[0] - cx) + (b[1] - cy) * (b[1] - cy);
        return da - db;
    });
    var kept = pts.slice().sort(function (a, b) { return a.d - b.d; });
    for (var k = 0; k < N; k++) {
        if (k < KEPT) { kept[k].gx = slots[k][0]; kept[k].gy = slots[k][1]; }
        else { kept[k].drop = true; }
    }

    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

    // One cycle: loose, gather, hold compact, release.
    var CYCLE = 9000;
    function compaction(t) {
        if (t < 0.12) return 0;
        if (t < 0.5) return ease((t - 0.12) / 0.38);
        if (t < 0.66) return 1;
        return 1 - ease((t - 0.66) / 0.34);
    }

    // The cloud shrinks toward the corner as one body (uniform scale about the
    // corner), getting denser as it goes; in the last stretch the surviving
    // points snap onto the lattice. Dropped points vanish along the way.
    var RATIO = (GRID * CELL) / W;
    function draw(c) {
        for (var q = 0; q < data.length; q += 4) data[q + 3] = 0;
        var scale = 1 - c * (1 - RATIO);
        var snap = ease(clamp((c - 0.55) / 0.45));
        for (var i = 0; i < N; i++) {
            var p = pts[i];
            var x = bx + (p.sx - bx) * scale;
            var y = by + (p.sy - by) * scale;
            if (p.drop) {
                if (c > 0.45 + ((i * 7919) % 17) / 40) continue; // staggered vanishing
            } else {
                x += (p.gx - x) * snap;
                y += (p.gy - y) * snap;
            }
            var px = Math.round(x), py = Math.round(y);
            if (px < 0 || py < 0 || px >= W || py >= H) continue;
            var o = (py * W + px) * 4;
            data[o] = ink[0]; data[o + 1] = ink[1]; data[o + 2] = ink[2]; data[o + 3] = 255;
        }
        ctx.putImageData(image, 0, 0);
    }

    if (reduced) {
        draw(1);
        return;
    }

    var visible = true;
    if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(canvas);
    }

    var start = null, last = 0;
    function frame(now) {
        requestAnimationFrame(frame);
        if (!visible || now - last < 33) return;
        last = now;
        if (start === null) start = now;
        draw(compaction(((now - start) % CYCLE) / CYCLE));
    }
    draw(0);
    requestAnimationFrame(frame);
})();
