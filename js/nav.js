// nav.js — 네비게이션 및 인증 가드

document.addEventListener("DOMContentLoaded", () => {
  // 인증이 필요한 페이지에서 로그인 여부 확인
  const requireAuth = document.body.dataset.requireAuth === "true";
  if (requireAuth) {
    const ok = sessionStorage.getItem("isSupporter") === "1";
    if (!ok) {
      window.location.href = "index.html";
      return;
    }
  }

  // 로고 → hero로 스크롤 (home에서만 의미 있음)
  const logoLink = document.getElementById("logo-link");
  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      // home.html이 아닌 world.html에서 클릭한 경우 home으로
      if (!document.getElementById("hero")) {
        window.location.href = "home.html";
        return;
      }
      e.preventDefault();
      const hero = document.getElementById("hero");
      if (hero) hero.scrollIntoView({ behavior: "smooth" });
    });
  }

  // "몬스터 도감" 앵커 스무스 스크롤 (home에서만)
  document.querySelectorAll('a[href="#monster-index"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      if (document.getElementById("monster-index")) {
        e.preventDefault();
        document
          .getElementById("monster-index")
          .scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 로그아웃
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("isSupporter");
      window.location.href = "index.html";
    });
  }
});
