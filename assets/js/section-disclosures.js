// Collapse the homepage's primary content sections on narrow portrait screens.
// Desktop, landscape, and no-JavaScript views keep the full page visible.
(function () {
    "use strict";

    var portrait = window.matchMedia(
        "(max-width: 900px) and (orientation: portrait)",
    );
    var sectionIds = ["writing", "media", "about"];

    var disclosures = sectionIds
        .map(function (sectionId) {
            var section = document.getElementById(sectionId);
            if (!section) return null;

            var label = section.querySelector(":scope > .row-label");
            var heading = label && label.querySelector("h2");
            if (!label || !heading) return null;

            var content = Array.prototype.slice
                .call(section.children)
                .filter(function (child) {
                    return child !== label;
                });
            var contentIds = content.map(function (child, index) {
                if (!child.id) {
                    child.id = sectionId + "-content-" + (index + 1);
                }
                return child.id;
            });

            var title = heading.textContent.trim();
            var toggle = document.createElement("button");
            toggle.type = "button";
            toggle.className = "section-toggle";
            toggle.setAttribute("aria-controls", contentIds.join(" "));

            function setExpanded(expanded) {
                toggle.setAttribute("aria-expanded", String(expanded));
                toggle.setAttribute(
                    "aria-label",
                    (expanded ? "Collapse " : "Expand ") + title,
                );
                section.classList.toggle("is-expanded", expanded);
                content.forEach(function (element) {
                    element.hidden = !expanded;
                });
            }

            toggle.addEventListener("click", function () {
                setExpanded(toggle.getAttribute("aria-expanded") !== "true");
            });

            return {
                section: section,
                label: label,
                toggle: toggle,
                content: content,
                setExpanded: setExpanded,
            };
        })
        .filter(Boolean);

    function syncLayout() {
        disclosures.forEach(function (disclosure) {
            if (portrait.matches) {
                disclosure.section.classList.add("has-disclosure");
                if (!disclosure.toggle.isConnected) {
                    disclosure.label.appendChild(disclosure.toggle);
                }
                disclosure.setExpanded(false);
            } else {
                disclosure.section.classList.remove(
                    "has-disclosure",
                    "is-expanded",
                );
                disclosure.toggle.remove();
                disclosure.content.forEach(function (element) {
                    element.hidden = false;
                });
            }
        });
    }

    syncLayout();

    if (portrait.addEventListener) {
        portrait.addEventListener("change", syncLayout);
    } else {
        portrait.addListener(syncLayout);
    }
})();
