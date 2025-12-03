// modal.js — 몬스터 상세 모달 제어

function openMonsterModal(monster) {
  const modal = document.getElementById("monster-modal");
  if (!modal) return;

  const imgEl = document.getElementById("modal-image");
  const nameEl = document.getElementById("modal-name");
  const keywordsEl = document.getElementById("modal-keywords");
  const featureEl = document.getElementById("modal-feature");
  const huntEl = document.getElementById("modal-hunt");
  const originEl = document.getElementById("modal-origin");

  imgEl.src = `images/${monster.image}`;
  imgEl.alt = monster.name;
  nameEl.textContent = monster.name;

  keywordsEl.innerHTML = (monster.keywords || [])
    .map((k) => `<span class="modal-tag">${k}</span>`)
    .join("");

  const desc = monster.description || {};
  featureEl.textContent = desc["특징"] || "";
  huntEl.textContent = desc["사냥법"] || "";
  originEl.textContent = desc["기원"] || "";

  modal.classList.remove("hidden");
}

function closeMonsterModal() {
  const modal = document.getElementById("monster-modal");
  if (!modal) return;
  modal.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("monster-modal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".modal-close");
  const backdrop = modal.querySelector(".modal-backdrop");

  if (closeBtn) closeBtn.addEventListener("click", closeMonsterModal);
  if (backdrop) backdrop.addEventListener("click", closeMonsterModal);

  // ESC키로 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeMonsterModal();
    }
  });
});
