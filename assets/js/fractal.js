// A one-bit Julia set, ordered-dithered, whose parameter walks a circle so the
// animation loops. Drawn in the theme's ink color, nothing else.
(function () {
    "use strict";

    var canvas = document.getElementById("fractal");
    if (!canvas || !canvas.getContext) return;

    var W = canvas.width, H = canvas.height;
    var ctx = canvas.getContext("2d");
    var image = ctx.createImageData(W, H);
    var data = image.data;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 4x4 Bayer matrix, scaled to 0..1 thresholds.
    var bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(function (v) {
        return (v + 0.5) / 16;
    });

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

    var MAX = 40;
    var SCALE = 1.6; // half-width of the view in the complex plane

    function draw(theta) {
        var cr = 0.7885 * Math.cos(theta);
        var ci = 0.7885 * Math.sin(theta);
        for (var y = 0; y < H; y++) {
            var zi0 = ((y + 0.5) / H) * 2 * SCALE - SCALE;
            for (var x = 0; x < W; x++) {
                var zr = ((x + 0.5) / W) * 2 * SCALE - SCALE;
                var zi = zi0;
                var i = 0;
                while (i < MAX && zr * zr + zi * zi < 4) {
                    var t = zr * zr - zi * zi + cr;
                    zi = 2 * zr * zi + ci;
                    zr = t;
                    i++;
                }
                // Points that never escape are solid ink; the escape bands fade out.
                var v = i === MAX ? 1 : Math.pow(i / MAX, 1.25);
                var on = v >= bayer[(y & 3) * 4 + (x & 3)];
                var p = (y * W + x) * 4;
                data[p] = ink[0];
                data[p + 1] = ink[1];
                data[p + 2] = ink[2];
                data[p + 3] = on ? 255 : 0;
            }
        }
        ctx.putImageData(image, 0, 0);
    }

    var theta = 2.1;
    if (reduced) {
        draw(theta);
        return;
    }

    var visible = true;
    if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
        }).observe(canvas);
    }

    var last = 0;
    function frame(now) {
        requestAnimationFrame(frame);
        if (!visible || now - last < 40) return; // ~25fps is plenty for a dither
        last = now;
        theta += 0.0045;
        if (theta > Math.PI * 2) theta -= Math.PI * 2;
        draw(theta);
    }
    draw(theta);
    requestAnimationFrame(frame);
})();
