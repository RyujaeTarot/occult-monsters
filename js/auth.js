// auth.js — 로그인 및 후원 코드 검증

const VALID_CODES = [
  "KUMA9921",
  "OB-2025-0001",
  "OB-2025-TEST"
];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("auth-form");
  const emailInput = document.getElementById("supporter-email");
  const codeInput = document.getElementById("supporter-code");

  // 이미 인증된 경우 바로 home으로
  if (sessionStorage.getItem("isSupporter") === "1") {
    window.location.href = "home.html";
    return;
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = (emailInput?.value || "").trim();
    const code = (codeInput?.value || "").trim().toUpperCase();

    if (!email || !code) {
      alert("이메일과 후원자 코드를 모두 입력해 주세요.");
      return;
    }

    if (VALID_CODES.includes(code)) {
      sessionStorage.setItem("isSupporter", "1");
      window.location.href = "home.html";
    } else {
      alert("후원자 코드를 다시 확인해 주세요.");
    }
  });
});
