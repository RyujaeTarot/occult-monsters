// monsters.js — 몬스터 리스트 로드 및 필터

let ALL_MONSTERS = [];

function createMonsterCard(monster) {
  const card = document.createElement("div");
  card.className = "monster-card";
  card.dataset.type = monster.type || "";

  card.innerHTML = `
    <div class="monster-image-wrap">
      <img src="images/${monster.image}" alt="${monster.name}" class="monster-image" />
    </div>
    <div class="monster-info">
      <h3 class="monster-name">${monster.name}</h3>
      <p class="monster-short">${monster.short}</p>
      <div class="monster-tags">
        ${monster.keywords.map(k => `<span class="tag">${k}</span>`).join("")}
      </div>
    </div>
  `;

  card.addEventListener("click", () => {
    if (typeof openMonsterModal === "function") {
      openMonsterModal(monster);
    }
  });

  return card;
}

async function loadMonsters() {
  const listContainer = document.getElementById("monster-list");
  if (!listContainer) return;

  try {
    const res = await fetch("data/monsters.json");
    const data = await res.json();
    ALL_MONSTERS = data.monsters || [];
  } catch (e) {
    console.error("몬스터 데이터를 불러오는 중 오류:", e);
    ALL_MONSTERS = [];
  }

  renderMonsterList("all");
}

function renderMonsterList(filterType) {
  const listContainer = document.getElementById("monster-list");
  if (!listContainer) return;

  listContainer.innerHTML = "";

  const filtered =
    filterType === "all"
      ? ALL_MONSTERS
      : ALL_MONSTERS.filter((m) => m.type === filterType);

  filtered.forEach((m) => {
    listContainer.appendChild(createMonsterCard(m));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("monster-list")) {
    loadMonsters();

    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderMonsterList(btn.dataset.filter);
      });
    });
  }
});
