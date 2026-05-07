const feedItems = [
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=82",
    label: "夜市穿搭创作者在霓虹街区拍摄短视频",
    creator: "@nora.city",
    title: "30 秒夜市穿搭挑战",
    text: "三套通勤单品换出周末感。长按屏幕可暂停，向上滑看下一条。",
    music: "City pop loop - Nora remix",
    likes: "82.4k",
    comments: "1,246"
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=82",
    label: "海边旅行片段",
    creator: "@kai.trips",
    title: "海边日落 7 个镜头",
    text: "适合新手的旅行运镜模板，收藏后可一键套用到你的剪辑。",
    music: "Sunset field recording",
    likes: "126k",
    comments: "3,809"
  },
  {
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=82",
    label: "健康餐制作短视频",
    creator: "@lena.table",
    title: "工作日 12 分钟便当",
    text: "按配料卡暂停查看，评论区可生成购物清单。",
    music: "Kitchen beat - 92 bpm",
    likes: "43.8k",
    comments: "892"
  }
];

let feedIndex = 0;

function updateStatusTime() {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  document.querySelectorAll(".js-time").forEach((node) => {
    node.textContent = time;
  });
}

function showToast(message) {
  const screen = document.querySelector(".device-screen") || document.body;
  let toast = screen.querySelector(".live-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "live-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    screen.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1500);
}

window.showToast = showToast;

function setPressed(button, pressed) {
  button.setAttribute("aria-pressed", String(pressed));
  button.classList.toggle("is-active", pressed);
}

function renderFeed(item) {
  const media = document.querySelector("[data-home-feed]");
  if (!media) return;
  media.style.backgroundImage = `url("${item.image}")`;
  media.setAttribute("aria-label", item.label);
  const fields = {
    creator: item.creator,
    title: item.title,
    text: item.text,
    music: item.music,
    likes: item.likes,
    comments: item.comments
  };
  Object.entries(fields).forEach(([key, value]) => {
    document.querySelectorAll(`[data-feed-${key}]`).forEach((node) => {
      node.textContent = value;
    });
  });
}

function selectWithinGroup(button) {
  const group = button.dataset.group;
  if (!group) return;
  document.querySelectorAll(`[data-group="${group}"]`).forEach((node) => {
    setPressed(node, node === button);
  });
}

function initInteractions() {
  updateStatusTime();
  renderFeed(feedItems[0]);
  setInterval(updateStatusTime, 30000);

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button, a");
    if (!button) return;

    const toggle = button.closest("[data-toggle]");
    if (toggle) {
      const pressed = toggle.getAttribute("aria-pressed") !== "true";
      setPressed(toggle, pressed);
      showToast(toggle.dataset.toast || (pressed ? "已开启" : "已关闭"));
    }

    const grouped = button.closest("[data-group]");
    if (grouped) {
      selectWithinGroup(grouped);
    }

    if (button.closest("[data-feed-next]")) {
      feedIndex = (feedIndex + 1) % feedItems.length;
      const media = document.querySelector("[data-home-feed]");
      media?.animate(
        [
          { transform: "translateY(0)", filter: "brightness(1)" },
          { transform: "translateY(-18px)", filter: "brightness(0.76)" },
          { transform: "translateY(0)", filter: "brightness(1)" }
        ],
        { duration: 360, easing: "ease-out" }
      );
      window.setTimeout(() => renderFeed(feedItems[feedIndex]), 120);
      showToast("已切换下一条");
    }

    if (button.closest("[data-record]")) {
      const record = button.closest("[data-record]");
      const recording = record.getAttribute("aria-pressed") !== "true";
      setPressed(record, recording);
      record.querySelector("span").textContent = recording ? "录制中" : "录制";
      document.querySelectorAll("[data-record-label]").forEach((node) => {
        node.textContent = recording ? "00:07 正在录制" : "准备开拍";
      });
      showToast(recording ? "开始录制" : "录制已暂停");
    }

    if (button.closest("[data-publish]")) {
      showToast("草稿已保存，可进入发布流程");
    }
  });
}

document.addEventListener("DOMContentLoaded", initInteractions);
