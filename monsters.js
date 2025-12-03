// js/monsters.js
// 몬스터 데이터는 data/monsters.json 에서만 관리한다.

let MONSTERS = [];

// 1. JSON 불러오기
async function loadMonsters() {
  try {
    const res = await fetch("data/monsters.json");
    if (!res.ok) throw new Error("몬스터 JSON을 불러오지 못했습니다.");
    const data = await res.json();

    // 배열인지 확인
    if (!Array.isArray(data)) {
      throw new Error("monsters.json 형식이 배열이 아닙니다.");
    }

    MONSTERS = data;
    renderMonsterList(MONSTERS);
    setupFilters();
  } catch (err) {
    console.error(err);
    const list = document.getElementById("monster-list");
    if (list) {
      list.innerHTML =
        "<p class='monster-error'>몬스터 데이터를 불러오는 데 실패했습니다.</p>";
    }
  }
}

// 2. 카드 렌더링
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
          <span class="monster-card-type">${monster.type || ""}</span>
          <span class="monster-card-category">${monster.category || ""}</span>
        </div>
        <h3 class="monster-card-name">${monster.name}</h3>
        <p class="monster-card-short">${monster.short || ""}</p>
        <div class="monster-card-tags">
          ${
            (monster.keywords || [])
              .map((kw) => `<span class="monster-tag">${kw}</span>`)
              .join("") || ""
          }
        </div>
      </div>
    </div>
  `;

  // 카드 클릭 시 모달 열기
  card.addEventListener("click", () => openMonsterModal(monster));

  return card;
}

function renderMonsterList(list) {
  const container = document.getElementById("monster-list");
  if (!container) return;

  container.innerHTML = "";

  if (!list || list.length === 0) {
    container.innerHTML =
      "<p class='monster-empty'>해당 조건에 맞는 몬스터가 없습니다.</p>";
    return;
  }

  list.forEach((monster) => {
    container.appendChild(createMonsterCard(monster));
  });
}

// 3. 필터 버튼 처리
function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      if (!filter || filter === "all") {
        renderMonsterList(MONSTERS);
      } else {
        const filtered = MONSTERS.filter((m) => m.type === filter);
        renderMonsterList(filtered);
      }
    });
  });
}

// 4. 모달 열기/닫기
function openMonsterModal(monster) {
  const modal = document.getElementById("monster-modal");
  if (!modal) return;

  const imgEl = document.getElementById("modal-image");
  const nameEl = document.getElementById("modal-name");
  const kwWrap = document.getElementById("modal-keywords");
  const featureEl = document.getElementById("modal-feature");
  const huntEl = document.getElementById("modal-hunt");
  const originEl = document.getElementById("modal-origin");

  if (imgEl) {
    imgEl.src = monster.image;
    imgEl.alt = monster.name;
  }
  if (nameEl) nameEl.textContent = monster.name;

  if (kwWrap) {
    kwWrap.innerHTML = (monster.keywords || [])
      .map((kw) => `<span class="modal-tag">${kw}</span>`)
      .join("");
  }

  const desc = monster.description || {};
  if (featureEl) featureEl.textContent = desc["특징"] || "";
  if (huntEl) huntEl.textContent = desc["사냥법"] || "";
  if (originEl) originEl.textContent = desc["기원"] || "";

  modal.classList.add("open");
}

function closeMonsterModal() {
  const modal = document.getElementById("monster-modal");
  if (!modal) return;
  modal.classList.remove("open");
}

// 5. 모달 이벤트 바인딩
function setupModalEvents() {
  const modal = document.getElementById("monster-modal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".modal-close");
  const backdrop = modal.querySelector(".modal-backdrop");

  if (closeBtn) closeBtn.addEventListener("click", closeMonsterModal);
  if (backdrop) backdrop.addEventListener("click", closeMonsterModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMonsterModal();
  });
}

// 6. 초기화
document.addEventListener("DOMContentLoaded", () => {
  setupModalEvents();
  loadMonsters();
});
