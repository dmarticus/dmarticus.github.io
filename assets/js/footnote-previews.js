(function () {
    "use strict";

    var references = document.querySelectorAll(
        '.main-content a.footnote[href^="#"]',
    );

    if (!references.length) return;

    var supportsHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
    ).matches;
    var tooltip = document.createElement("div");
    var activeReference = null;
    var hideTimer = null;
    var positionFrame = null;

    tooltip.id = "footnote-preview";
    tooltip.className = "footnote-preview";
    tooltip.setAttribute("role", "tooltip");
    tooltip.hidden = true;
    document.body.appendChild(tooltip);

    function getFootnoteContent(reference) {
        var href = reference.getAttribute("href");
        if (!href || href.charAt(0) !== "#") return null;

        var targetId = href.slice(1);
        var target = document.getElementById(targetId);

        if (!target) {
            try {
                target = document.getElementById(decodeURIComponent(targetId));
            } catch (_error) {
                return null;
            }
        }

        if (!target) return null;

        var content = target.cloneNode(true);
        var backLinks = content.querySelectorAll(
            '.reversefootnote, [role="doc-backlink"]',
        );

        Array.prototype.forEach.call(backLinks, function (backLink) {
            backLink.remove();
        });

        Array.prototype.forEach.call(
            content.querySelectorAll("a"),
            function (link) {
                var text = document.createTextNode(link.textContent);
                link.parentNode.replaceChild(text, link);
            },
        );

        return content.innerHTML;
    }

    function positionTooltip() {
        if (!activeReference || tooltip.hidden) return;

        var viewportPadding = 12;
        var gap = 10;
        var anchorRect = activeReference.getBoundingClientRect();
        var tooltipRect = tooltip.getBoundingClientRect();
        var left =
            anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
        var top = anchorRect.top - tooltipRect.height - gap;
        var placement = "top";

        left = Math.max(
            viewportPadding,
            Math.min(left, window.innerWidth - tooltipRect.width - viewportPadding),
        );

        if (top < viewportPadding) {
            top = anchorRect.bottom + gap;
            placement = "bottom";
        }

        top = Math.max(
            viewportPadding,
            Math.min(top, window.innerHeight - tooltipRect.height - viewportPadding),
        );

        tooltip.dataset.placement = placement;
        tooltip.style.left = Math.round(left) + "px";
        tooltip.style.top = Math.round(top) + "px";
    }

    function schedulePosition() {
        if (!activeReference || tooltip.hidden) return;
        window.cancelAnimationFrame(positionFrame);
        positionFrame = window.requestAnimationFrame(positionTooltip);
    }

    function showTooltip(reference) {
        var content = getFootnoteContent(reference);
        if (!content) return;

        window.clearTimeout(hideTimer);

        if (activeReference && activeReference !== reference) {
            activeReference.removeAttribute("aria-describedby");
        }

        activeReference = reference;
        tooltip.innerHTML = content;
        tooltip.hidden = false;
        tooltip.classList.remove("is-visible");
        reference.setAttribute("aria-describedby", tooltip.id);
        positionTooltip();

        window.requestAnimationFrame(function () {
            if (activeReference === reference) {
                tooltip.classList.add("is-visible");
            }
        });
    }

    function hideTooltip(immediately) {
        if (activeReference) {
            activeReference.removeAttribute("aria-describedby");
        }

        activeReference = null;
        tooltip.classList.remove("is-visible");
        window.clearTimeout(hideTimer);

        hideTimer = window.setTimeout(
            function () {
                if (!activeReference) {
                    tooltip.hidden = true;
                    tooltip.innerHTML = "";
                }
            },
            immediately ? 0 : 120,
        );
    }

    if (supportsHover) {
        tooltip.addEventListener("mouseenter", function () {
            window.clearTimeout(hideTimer);
        });
        tooltip.addEventListener("mouseleave", function () {
            hideTooltip(false);
        });
    }

    Array.prototype.forEach.call(references, function (reference) {
        if (supportsHover) {
            reference.addEventListener("mouseenter", function () {
                showTooltip(reference);
            });
            reference.addEventListener("mouseleave", function () {
                hideTooltip(false);
            });
        }

        reference.addEventListener("focus", function () {
            showTooltip(reference);
        });
        reference.addEventListener("blur", function () {
            hideTooltip(false);
        });
        reference.addEventListener("click", function () {
            hideTooltip(true);
        });
        reference.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                hideTooltip(true);
            }
        });
    });

    window.addEventListener("resize", schedulePosition);
    window.addEventListener("scroll", schedulePosition, { passive: true });
})();
