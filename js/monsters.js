// =====================================
// 1) JSON 데이터 통합 (fetch 없음)
// =====================================
const MONSTER_DATA = [
  {
    "name": "뱀파이어",
    "image": "images/01vampire.jpeg",
    "short": "밤을 지배하는 흡혈의 포식자.",
    "keywords": ["인간형", "불사", "흡혈"],
    "type": "인간형",
    "description": {
      "특징": "인간과 거의 구분되지 않는 외형을 지녔으며, 피를 섭취함으로써 젊음을 유지한다.",
      "사냥법": "직사광선, 은, 성스러운 오브젝트에 약하다.",
      "기원": "고대 귀족 사회에서 금기를 어긴 자들이 변이한 존재라는 설이 있다."
    }
  },
  {
    "name": "구울",
    "image": "images/02ghoul.jpg",
    "short": "무덤과 전장을 떠도는 시체 포식자.",
    "keywords": ["언데드", "시체 포식", "야행성"],
    "type": "언데드",
    "description": {
      "특징": "부패한 육식을 탐하며, 인간의 행동을 흉내내기도 한다.",
      "사냥법": "불에 약하고, 축성된 무기로 재생을 막을 수 있다.",
      "기원": "집단 매장지에서 죽은 자의 원혼이 응집해 태어난 존재라 전해진다."
    }
  }
  // ... 여기에 계속 추가 가능
];


// =====================================
// 2) 카드 렌더링 함수
// =====================================
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
        </div>
        <h3 class="monster-card-name">${monster.name}</h3>
        <p class="monster-card-short">${monster.short}</p>
        <div class="monster-card-tags">
          ${monster.keywords.map(tag => `<span>${tag}</span>`).join("")}
        </div>
      </div>
    </div>
  `;

  // 클릭 → 상세 모달
  card.addEventListener("click", () => openMonsterModal(monster));

  return card;
}


// =====================================
// 3) 몬스터 목록 렌더링
// =====================================
function renderMonsterList(filter = "all") {
  const list = document.getElementById("monster-list");
  if (!list) return;

  list.innerHTML = "";

  const filtered = MONSTER_DATA.filter(m => {
    if (filter === "all") return true;
    return m.type === filter;
  });

  filtered.forEach(mon => {
    list.appendChild(createMonsterCard(mon));
  });
}


// =====================================
// 4) 페이지 로드 시 실행
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  renderMonsterList(); // 전체 렌더링

  // 필터 이벤트
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      renderMonsterList(filter);
    });
  });
});
