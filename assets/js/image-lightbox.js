(function () {
    "use strict";

    var dialog = document.querySelector(".image-lightbox");
    if (!dialog || typeof dialog.showModal !== "function") return;

    var preview = dialog.querySelector(".image-lightbox-image");
    var caption = dialog.querySelector(".image-lightbox-caption");

    var trigger = null;


    function open(image, button) {
        trigger = button;
        var figure = image.closest("figure");
        var figcaption = figure && figure.querySelector("figcaption");
        var description = figcaption ? figcaption.textContent.trim() : image.alt;
        var source = image.currentSrc || image.src;

        preview.src = source;
        preview.alt = image.alt;

        caption.textContent = description;
        caption.hidden = !description;

        document.documentElement.classList.add("image-lightbox-open");
        dialog.showModal();
    }

    document.querySelectorAll(".post .prose img").forEach(function (image) {
        // Keep linked images and existing interactive content behaving as authored.
        if (image.closest("a, button, [role='button']") || image.hasAttribute("data-no-zoom")) return;

        var button = document.createElement("button");
        button.type = "button";
        button.className = "image-zoom-trigger";
        button.setAttribute("aria-label", "Enlarge image" + (image.alt ? ": " + image.alt : ""));
        button.setAttribute("aria-haspopup", "dialog");
        button.title = "Click to enlarge";
        image.parentNode.insertBefore(button, image);
        button.appendChild(image);
        button.addEventListener("click", function () {
            open(image, button);
        });
    });


    dialog.querySelector(".image-lightbox-close").addEventListener("click", function () {
        dialog.close();
    });

    // Native dialog handles Escape, focus trapping, and making the page inert.
    dialog.addEventListener("close", function () {
        document.documentElement.classList.remove("image-lightbox-open");
        preview.removeAttribute("src");
        if (trigger) trigger.focus({ preventScroll: true });
    });

    dialog.addEventListener("click", function (event) {
        if (event.target === dialog) dialog.close();
    });
})();
