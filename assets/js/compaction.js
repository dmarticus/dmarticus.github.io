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

    var GRID = 20;              // the compacted block is GRID x GRID cells
    var CELL = 2;               // pixels per cell
    var KEPT = GRID * GRID;     // points that survive compaction
    var N = Math.round(KEPT * 1.75); // the rest get dropped
    var cx = W / 2, cy = H / 2;
    var R = Math.min(W, H) / 2 - 4;

    var pts = [];
    for (var i = 0; i < N; i++) {
        // Scatter: uniform over a disc, biased slightly outward so the edge reads.
        var a = rand() * Math.PI * 2;
        var r = Math.sqrt(rand()) * R;
        var p = { sx: cx + Math.cos(a) * r, sy: cy + Math.sin(a) * r, d: r / R };
        if (i < KEPT) {
            // Fill the block from its center outward so compaction reads as gathering.
            p.gx = cx - (GRID * CELL) / 2 + (i % GRID) * CELL + CELL / 2;
            p.gy = cy - (GRID * CELL) / 2 + Math.floor(i / GRID) * CELL + CELL / 2;
        }
        pts.push(p);
    }
    // Assign grid slots to the points nearest the center first.
    var kept = pts.slice().sort(function (a, b) { return a.d - b.d; });
    var slots = [];
    for (var g = 0; g < KEPT; g++) {
        slots.push([cx - (GRID * CELL) / 2 + (g % GRID) * CELL + CELL / 2, cy - (GRID * CELL) / 2 + Math.floor(g / GRID) * CELL + CELL / 2]);
    }
    slots.sort(function (a, b) {
        var da = (a[0] - cx) * (a[0] - cx) + (a[1] - cy) * (a[1] - cy);
        var db = (b[0] - cx) * (b[0] - cx) + (b[1] - cy) * (b[1] - cy);
        return da - db;
    });
    pts.forEach(function (p) { delete p.gx; delete p.gy; });
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

    function draw(c) {
        for (var q = 0; q < data.length; q += 4) data[q + 3] = 0;
        for (var i = 0; i < N; i++) {
            var p = pts[i];
            // Outer points start moving later, so the cloud collapses from the inside.
            var local = clamp((c - p.d * 0.35) / (1 - p.d * 0.35));
            var x, y, on = true;
            if (p.drop) {
                // Dropped points drift a little inward, then wink out.
                x = p.sx + (cx - p.sx) * local * 0.3;
                y = p.sy + (cy - p.sy) * local * 0.3;
                on = local < 0.55 + ((i * 7919) % 13) / 40; // staggered cutoff
            } else {
                x = p.sx + (p.gx - p.sx) * local;
                y = p.sy + (p.gy - p.sy) * local;
            }
            if (!on) continue;
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
