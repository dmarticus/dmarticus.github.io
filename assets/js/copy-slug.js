(function () {
    "use strict";

    var button = document.querySelector("[data-copy-url]");
    if (!button) return;

    var value = button.getAttribute("data-copy-url");
    var status = button.querySelector(".copy-slug-status");
    var resetTimer = null;

    function fallbackCopy(text) {
        return new Promise(function (resolve, reject) {
            var textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.setAttribute("readonly", "");
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();

            try {
                if (document.execCommand("copy")) resolve();
                else reject(new Error("Copy command failed"));
            } catch (error) {
                reject(error);
            } finally {
                textarea.remove();
            }
        });
    }

    function copy(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        return fallbackCopy(text);
    }

    function showStatus(message, succeeded) {
        clearTimeout(resetTimer);
        status.textContent = message;
        button.classList.toggle("is-copied", succeeded);
        button.setAttribute("aria-label", message + ": " + value);

        resetTimer = setTimeout(function () {
            status.textContent = "";
            button.classList.remove("is-copied");
            button.setAttribute("aria-label", "Copy full URL " + value);
        }, 1800);
    }

    button.addEventListener("click", function () {
        copy(value).then(
            function () {
                showStatus("copied!", true);
            },
            function () {
                showStatus("Copy failed", false);
            },
        );
    });
})();
