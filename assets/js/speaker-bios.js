(function () {
    "use strict";

    var switcher = document.querySelector("[data-bio-switcher]");
    if (!switcher) return;

    var tabs = Array.prototype.slice.call(
        switcher.querySelectorAll('[role="tab"]'),
    );
    var panels = Array.prototype.slice.call(
        switcher.querySelectorAll('[role="tabpanel"]'),
    );

    function activate(index, moveFocus) {
        tabs.forEach(function (tab, tabIndex) {
            var selected = tabIndex === index;
            tab.setAttribute("aria-selected", String(selected));
            tab.tabIndex = selected ? 0 : -1;
            panels[tabIndex].hidden = !selected;
        });

        if (moveFocus) tabs[index].focus();
    }

    tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
            activate(index, false);
        });

        tab.addEventListener("keydown", function (event) {
            var next = null;

            if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
            if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
            if (event.key === "Home") next = 0;
            if (event.key === "End") next = tabs.length - 1;
            if (next === null) return;

            event.preventDefault();
            activate(next, true);
        });
    });

    switcher.classList.add("is-enhanced");
    activate(0, false);
})();
