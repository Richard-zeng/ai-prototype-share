(function () {
  const nowNodes = document.querySelectorAll("[data-now]");
  if (nowNodes.length) {
    const text = new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
    nowNodes.forEach((node) => {
      node.textContent = text;
    });
  }

  document.querySelectorAll("[data-toast-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.toastTarget);
      if (!target) return;
      target.classList.remove("opacity-0", "translate-y-3", "pointer-events-none");
      target.classList.add("opacity-100", "translate-y-0");
      button.classList.add("scale-[0.98]");
      setTimeout(() => button.classList.remove("scale-[0.98]"), 180);
      setTimeout(() => {
        target.classList.add("opacity-0", "translate-y-3", "pointer-events-none");
        target.classList.remove("opacity-100", "translate-y-0");
      }, 2200);
    });
  });
})();
