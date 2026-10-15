// Compacting context: ragged lines of text are pressed into a solid block in
// the canvas's top-left corner. The surplus ink, what got summarized away,
// fades out on the way in. It holds, releases, and the cycle repeats.
// One-bit dots in the theme's ink color.
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

    // Deterministic pseudo-random so the page reads the same on every visit.
    var seed = 42;
    function rand() {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return seed / 0x7fffffff;
    }

    // The page: lines of word-shaped runs, two pixels tall, ragged right edge,
    // a short last line like a paragraph's end.
    var LINES = 16, LEADING = 6;
    var px = [];
    for (var l = 0; l < LINES; l++) {
        var y = 4 + l * LEADING;
        var x = 2;
        var end = l === LINES - 1 ? 40 + rand() * 40 : 100 + rand() * 8;
        while (x < end) {
            var w = 3 + Math.floor(rand() * 9);
            for (var k = 0; k < w && x + k < end; k++) {
                px.push({ sx: x + k, sy: y });
                px.push({ sx: x + k, sy: y + 1 });
            }
            x += w + 2 + Math.floor(rand() * 3);
        }
    }

    // The block: a GRID x GRID lattice in the top-left corner, filled from its
    // center outward by the ink nearest to it. Everything else is surplus.
    var GRID = 28, CELL = 2, KEPT = GRID * GRID;
    var cx = (GRID * CELL) / 2, cy = cx;
    var slots = [];
    for (var g = 0; g < KEPT; g++) {
        slots.push([(g % GRID) * CELL + CELL / 2, Math.floor(g / GRID) * CELL + CELL / 2]);
    }
    slots.sort(function (a, b) {
        return ((a[0] - cx) * (a[0] - cx) + (a[1] - cy) * (a[1] - cy)) - ((b[0] - cx) * (b[0] - cx) + (b[1] - cy) * (b[1] - cy));
    });
    var byDistance = px.slice().sort(function (a, b) {
        return Math.hypot(a.sx - cx, a.sy - cy) - Math.hypot(b.sx - cx, b.sy - cy);
    });
    byDistance.forEach(function (p, k) {
        if (k < KEPT) { p.gx = slots[k][0]; p.gy = slots[k][1]; }
        else { p.drop = true; }
    });
    var N = px.length;

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

    function draw(c) {
        for (var q = 3; q < data.length; q += 4) data[q] = 0;
        // The leading closes up first, then the lines press in from the right.
        var vy = ease(clamp(c / 0.6));
        var hx = ease(clamp((c - 0.3) / 0.7));
        for (var i = 0; i < N; i++) {
            var p = px[i];
            if (p.drop && c > 0.35 + ((i * 7919) % 23) / 60) continue; // surplus fades, staggered
            var ty = p.drop ? p.sy * 0.5 : p.gy;
            var tx = p.drop ? p.sx * 0.5 : p.gx;
            var x = p.sx + (tx - p.sx) * hx;
            var y = p.sy + (ty - p.sy) * vy;
            var ix = Math.round(x), iy = Math.round(y);
            if (ix < 0 || iy < 0 || ix >= W || iy >= H) continue;
            var o = (iy * W + ix) * 4;
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
