(async function () {
    "use strict";

    var blocks = document.querySelectorAll("pre code.language-mermaid, .language-mermaid pre code");
    if (!blocks.length) return;

    function addStepDetails(container, details, id) {
        if (!details) return function () {};
        var keys = details.dataset.mermaidNodes.split(/\s+/);
        var items = Array.from(details.children);
        var nodes = keys.map(function (key) {
            return container.querySelector('[id^="flowchart-' + key + '-"]');
        });
        if (nodes.some(function (node) { return !node; }) || nodes.length !== items.length) {
            return function () {};
        }

        var tooltip = document.createElement("div");
        tooltip.className = "mermaid-step-tooltip";
        tooltip.id = id + "-details";
        tooltip.setAttribute("role", "tooltip");
        tooltip.hidden = true;
        document.body.appendChild(tooltip);
        var active = null;
        var pinned = false;
        var timer;

        function position() {
            if (!active) return;
            var rect = active.getBoundingClientRect();
            var width = tooltip.offsetWidth;
            var height = tooltip.offsetHeight;
            var left = rect.right + 12;
            var top = rect.top + (rect.height - height) / 2;
            if (left + width > window.innerWidth - 12) left = rect.left - width - 12;
            if (left < 12) {
                left = (window.innerWidth - width) / 2;
                top = rect.bottom + 12;
                if (top + height > window.innerHeight - 12) top = rect.top - height - 12;
            }
            tooltip.style.left = Math.max(12, Math.min(left, window.innerWidth - width - 12)) + "px";
            tooltip.style.top = Math.max(12, Math.min(top, window.innerHeight - height - 12)) + "px";
        }

        function hide() {
            clearTimeout(timer);
            if (active) {
                active.setAttribute("aria-expanded", "false");
                active.removeAttribute("aria-describedby");
            }
            active = null;
            pinned = false;
            tooltip.hidden = true;
        }

        function show(node, item) {
            clearTimeout(timer);
            if (active && active !== node) hide();
            active = node;
            tooltip.innerHTML = item.innerHTML;
            tooltip.hidden = false;
            node.setAttribute("aria-expanded", "true");
            node.setAttribute("aria-describedby", tooltip.id);
            position();
        }

        function scheduleHide() {
            clearTimeout(timer);
            if (!pinned) timer = setTimeout(hide, 180);
        }

        nodes.forEach(function (node, index) {
            node.classList.add("mermaid-step");
            node.setAttribute("tabindex", "0");
            node.setAttribute("role", "button");
            node.setAttribute("aria-label", items[index].querySelector("strong").textContent + " Show details");
            node.setAttribute("aria-expanded", "false");
            node.setAttribute("aria-controls", tooltip.id);
            node.addEventListener("pointerenter", function (event) {
                if (event.pointerType !== "touch" && !pinned) show(node, items[index]);
            });
            node.addEventListener("pointerleave", scheduleHide);
            node.addEventListener("focus", function () { show(node, items[index]); });
            node.addEventListener("blur", function (event) {
                if (!pinned || (event.relatedTarget && !tooltip.contains(event.relatedTarget))) hide();
            });
            function toggle() {
                if (active === node && pinned) hide();
                else {
                    show(node, items[index]);
                    pinned = true;
                }
            }
            node.addEventListener("click", toggle);
            node.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggle();
                }
            });
        });
        tooltip.addEventListener("pointerenter", function () { clearTimeout(timer); });
        tooltip.addEventListener("pointerleave", scheduleHide);
        function dismiss(event) {
            if (event.type === "keydown") {
                if (event.key === "Escape") hide();
            } else if (active && !active.contains(event.target) && !tooltip.contains(event.target)) hide();
        }
        document.addEventListener("pointerdown", dismiss);
        document.addEventListener("keydown", dismiss);
        window.addEventListener("scroll", position, true);
        window.addEventListener("resize", position);
        details.hidden = true;

        return function () {
            hide();
            tooltip.remove();
            document.removeEventListener("pointerdown", dismiss);
            document.removeEventListener("keydown", dismiss);
            window.removeEventListener("scroll", position, true);
            window.removeEventListener("resize", position);
        };
    }

    try {
        var module = await import("https://cdn.jsdelivr.net/npm/mermaid@11.12.2/dist/mermaid.esm.min.mjs");
        var mermaid = module.default;
        await document.fonts.ready;
        var diagrams = Array.from(blocks, function (code) {
            var element = code.closest("pre");
            var sibling = element.nextElementSibling;
            while (sibling && !sibling.matches(".mermaid-step-details, h1, h2, h3, pre")) {
                sibling = sibling.nextElementSibling;
            }
            return {
                source: code.textContent,
                element: element,
                details: sibling && sibling.matches(".mermaid-step-details") ? sibling : null,
                cleanup: function () {}
            };
        });
        var rendering = false;
        var pending = false;
        var revision = 0;

        async function render() {
            if (rendering) {
                pending = true;
                return;
            }
            rendering = true;
            var styles = getComputedStyle(document.documentElement);
            mermaid.initialize({
                startOnLoad: false,
                securityLevel: "strict",
                htmlLabels: false,

                theme: "base",
                fontFamily: styles.getPropertyValue("--font-body").trim(),
                themeVariables: {
                    darkMode: document.documentElement.getAttribute("data-theme") === "dark",
                    background: styles.getPropertyValue("--bg").trim(),
                    primaryColor: styles.getPropertyValue("--bg-secondary").trim(),
                    primaryTextColor: styles.getPropertyValue("--text").trim(),
                    primaryBorderColor: styles.getPropertyValue("--text-secondary").trim(),
                    lineColor: styles.getPropertyValue("--text-secondary").trim(),
                    secondaryColor: styles.getPropertyValue("--bg").trim(),
                    tertiaryColor: styles.getPropertyValue("--bg-secondary").trim()
                }
            });

            try {
                for (var i = 0; i < diagrams.length; i++) {
                    var diagram = diagrams[i];
                    try {
                        var result = await mermaid.render("mermaid-diagram-" + revision++, diagram.source);
                        var container = document.createElement("div");
                        container.className = "mermaid-diagram";
                        container.innerHTML = result.svg;
                        diagram.cleanup();
                        diagram.element.replaceWith(container);
                        diagram.element = container;
                        if (result.bindFunctions) result.bindFunctions(container);
                        diagram.cleanup = addStepDetails(container, diagram.details, "mermaid-step-" + revision);
                    } catch (error) {
                        console.error("Could not render Mermaid diagram:", error);
                    }
                }
            } finally {
                rendering = false;
                if (pending) {
                    pending = false;
                    render();
                }
            }
        }

        new MutationObserver(render).observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"]
        });
        await render();
    } catch (error) {
        console.error("Could not load Mermaid; leaving diagram source visible:", error);
    }
})();
