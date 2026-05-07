document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-status-time]").forEach((el) => {
    el.textContent = "9:41";
  });

  document.querySelectorAll("[data-task-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("is-done");
      button.closest(".task-row")?.classList.toggle("is-muted");
    });
  });

  document.querySelectorAll("[data-segment-group]").forEach((group) => {
    group.querySelectorAll("[data-segment]").forEach((button) => {
      button.addEventListener("click", () => {
        group.querySelectorAll("[data-segment]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
    });
  });

  document.querySelectorAll("[data-open-sheet]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.getAttribute("data-open-sheet"));
      const backdrop = document.querySelector("[data-sheet-backdrop]");
      target?.classList.add("is-open");
      backdrop?.classList.add("is-open");
    });
  });

  document.querySelectorAll("[data-close-sheet], [data-sheet-backdrop]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".bottom-sheet, .sheet-backdrop").forEach((item) => {
        item.classList.remove("is-open");
      });
    });
  });
});
