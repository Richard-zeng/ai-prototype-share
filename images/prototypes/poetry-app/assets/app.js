(function () {
  const qs = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  qs("[data-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("is-on");
      const icon = button.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");
      }
    });
  });

  qs("[data-play]").forEach((button) => {
    button.addEventListener("click", () => {
      const icon = button.querySelector("i");
      const bar = button.closest(".audio-bar") || document;
      const fill = bar.querySelector(".progress-fill");
      button.classList.toggle("is-on");
      if (icon) {
        icon.classList.toggle("fa-play");
        icon.classList.toggle("fa-pause");
      }
      if (fill) {
        fill.style.setProperty("--progress", button.classList.contains("is-on") ? "68%" : "42%");
      }
    });
  });

  qs(".chip, .segment").forEach((item) => {
    item.addEventListener("click", () => {
      const siblings = item.parentElement ? qs(".chip, .segment", item.parentElement) : [];
      siblings.forEach((sibling) => sibling.classList.remove("is-selected", "active"));
      item.classList.add("is-selected");
    });
  });

  qs("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      qs("[data-answer]").forEach((answer) => answer.classList.remove("is-selected", "correct"));
      button.classList.add(button.dataset.answer === "correct" ? "correct" : "is-selected");
      const note = document.querySelector("[data-answer-note]");
      if (note) {
        note.textContent = button.dataset.answer === "correct" ? "答对了：竹喧归浣女，莲动下渔舟。" : "再想想王维写的是归人与渔舟。";
      }
    });
  });

  const textRange = document.querySelector("[data-text-range]");
  if (textRange) {
    textRange.addEventListener("input", () => {
      document.documentElement.style.setProperty("--reader-size", `${textRange.value}px`);
    });
  }
})();
