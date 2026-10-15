// The essay index: hovering (or focusing) a title swaps the summary panel to
// that essay. Each link carries its data in data-* attributes.
(function () {
    "use strict";

    var list = document.querySelector(".list[data-panel]");
    var panel = list && document.getElementById(list.dataset.panel);
    if (!list || !panel) return;

    var date = panel.querySelector("[data-field='date']");
    var words = panel.querySelector("[data-field='words']");
    var summary = panel.querySelector("[data-field='summary']");
    var tags = panel.querySelector("[data-field='tags']");
    var cta = panel.querySelector("[data-field='link']");
    var current = list.querySelector("a.is-current");
    var timer = null;

    function tagLink(tag) {
        var a = document.createElement("a");
        a.className = "tag";
        a.href = "/writing.html?tag=" + encodeURIComponent(tag);
        a.textContent = tag;
        a.setAttribute("data-tag", tag.toLowerCase());
        return a;
    }

    function show(link) {
        if (link === current) return;
        if (current) current.classList.remove("is-current");
        current = link;
        link.classList.add("is-current");
        panel.classList.add("is-swapping");
        clearTimeout(timer);
        timer = setTimeout(function () {
            var d = link.dataset;
            if (date) date.textContent = d.date || "";
            if (words) words.textContent = d.words || "";
            if (summary) summary.textContent = d.summary || "";
            if (cta) cta.href = link.getAttribute("href");
            if (tags) {
                tags.innerHTML = "";
                (d.tags || "")
                    .split(",")
                    .filter(Boolean)
                    .forEach(function (t) {
                        tags.appendChild(tagLink(t.trim()));
                    });
            }
            panel.classList.remove("is-swapping");
        }, 90);
    }

    list.addEventListener("mouseover", function (e) {
        var a = e.target.closest("a[data-summary]");
        if (a) show(a);
    });
    list.addEventListener("focusin", function (e) {
        var a = e.target.closest("a[data-summary]");
        if (a) show(a);
    });
})();
