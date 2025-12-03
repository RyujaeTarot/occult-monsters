// monsters.js — 최종 완성 버전

async function loadMonsters() {
  try {
    const res = await fetch("data/monsters.json");
    const monsters = await res.json();
    renderMonsters(monsters);
  } catch (e) {
    console.error("몬스터 데이터를 불러오지 못했습니다:", e);
  }
}

function createMonsterCard(monster) {
  const card = document.createElement("article");
  card.className = "monster-card";

  card.innerHTML = `
    <div class="monster-card-inner">
      <div class="monster-card-image">
        <img src="${monster.image}" alt="${monster.name}" />
      </div>

      <div class="monster-card-content">
        <div class="monster-card-meta">
          <span class="monster-card-type">${monster.type}</span>
          <span class="monster-card-category">${monster.category}</span>
        </div>

        <h3 class="monster-card-name">${monster.name}</h3>
        <p class="monster-card-short">${monster.short}</p>

        <div class="monster-card-tags">
          ${monster.keywords.map(k => `<span>${k}</span>`).join("")}
        </div>
      </div>
    </div>
  `;

  // 상세 모달 연결
  card.addEventListener("click", () => openModal(monster));

  return card;
}

function renderMonsters(monsters) {
  const list = document.getElementById("monster-list");
  list.innerHTML = "";
  monsters.forEach(m => list.appendChild(createMonsterCard(m)));
}

document.addEventListener("DOMContentLoaded", loadMonsters);
