const 页面提示 = document.querySelector("[data-toast]");

function 显示提示(文本) {
  if (!页面提示) return;
  页面提示.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${文本}</span>`;
  页面提示.classList.add("show");
  window.clearTimeout(window.__xxToastTimer);
  window.__xxToastTimer = window.setTimeout(() => 页面提示.classList.remove("show"), 1800);
}

document.querySelectorAll("[data-segment]").forEach((按钮) => {
  按钮.addEventListener("click", () => {
    const 分组 = 按钮.closest("[data-segment-group]");
    if (!分组) return;
    分组.querySelectorAll("[data-segment]").forEach((项目) => 项目.classList.remove("active"));
    按钮.classList.add("active");
    const 文案 = 按钮.getAttribute("data-message") || "已切换视图";
    显示提示(文案);
  });
});

document.querySelectorAll("[data-action]").forEach((按钮) => {
  按钮.addEventListener("click", () => {
    const 行为 = 按钮.getAttribute("data-action");
    const 文案表 = {
      start: "已开始今日练习",
      done: "已记录完成状态",
      save: "已加入收藏",
      join: "已加入本周共修",
      follow: "已关注伙伴",
      checkin: "今日打卡已完成",
      sync: "数据已刷新",
      edit: "资料已进入编辑状态"
    };
    按钮.classList.toggle("active");
    显示提示(文案表[行为] || "操作已完成");
  });
});

document.querySelectorAll("[data-expand]").forEach((按钮) => {
  按钮.addEventListener("click", () => {
    const 目标 = document.querySelector(按钮.getAttribute("data-expand"));
    if (!目标) return;
    目标.classList.toggle("hidden");
    显示提示(目标.classList.contains("hidden") ? "已收起详情" : "已展开详情");
  });
});
