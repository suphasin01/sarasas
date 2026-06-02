const translations = document.querySelectorAll("[data-th][data-en]");
const languageToggle = document.querySelector(".language-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const topnav = document.querySelector(".topnav");
const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".dot"));
const studentForm = document.querySelector(".student-form");
const studentInput = document.querySelector("#student-id");
const studentResult = document.querySelector("#student-result");
const loginToggle = document.querySelector(".login-toggle");
const loginDialog = document.querySelector(".login-dialog");
const loginForm = document.querySelector(".login-form");
const dialogClose = document.querySelector(".dialog-close");
const loginMessage = document.querySelector(".login-message");
const loginEmailInput = document.querySelector("#login-email");
const loginPasswordInput = document.querySelector("#login-password");
const loginSubmitBtn = document.querySelector(".login-submit");
const hintEmail = document.querySelector(".hint-email");
const roleTabs = Array.from(document.querySelectorAll(".role-tab"));

let language = "th";
let activeSlide = 0;
let currentRole = null;
let selectedRole = "teacher";

const roleConfig = {
  teacher: {
    email: "teacher@sarasas.test",
    logoutLabel: { th: "ออกจากระบบ (ครู)", en: "Logout (Teacher)" },
    submitLabel: "Login เข้า Teacher Panel",
    bodyClass: "is-teacher"
  },
  student: {
    email: "student@sarasas.test",
    logoutLabel: { th: "ออกจากระบบ (นักเรียน)", en: "Logout (Student)" },
    submitLabel: "Login เข้า Student Portal",
    bodyClass: "is-student"
  },
  parent: {
    email: "parent@sarasas.test",
    logoutLabel: { th: "ออกจากระบบ (ผู้ปกครอง)", en: "Logout (Parent)" },
    submitLabel: "Login เข้า Parent Portal",
    bodyClass: "is-parent"
  }
};

const students = {
  SR001: {
    name: "กานต์พิชชา วงศ์สวัสดิ์",
    grade: "Grade 6",
    status: "Active",
    schedule: "Mon-Fri 08:00-15:20"
  },
  SR002: {
    name: "ธีรภัทร สุขใจ",
    grade: "Grade 9",
    status: "Active",
    schedule: "Mon-Fri 08:00-15:45"
  }
};

function applyLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  translations.forEach((node) => {
    node.textContent = node.dataset[language];
  });
  if (studentInput && studentInput.value.trim()) {
    renderStudent(studentInput.value.trim().toUpperCase());
  }
  updateLoginLabel();
}

function showSlide(index) {
  activeSlide = index;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === activeSlide));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === activeSlide));
}

function renderStudent(studentId) {
  const student = students[studentId];
  if (!student) {
    const message = language === "th"
      ? "ไม่พบรหัสนี้ กรุณาตรวจสอบอีกครั้งหรือติดต่อโรงเรียน"
      : "Student ID not found. Please check again or contact the school.";
    studentResult.innerHTML = `<p class="student-error">${message}</p>`;
    return;
  }
  const labels = language === "th"
    ? ["ชื่อ", "ระดับชั้น", "สถานะ", "ตารางเรียน"]
    : ["Name", "Grade", "Status", "Schedule"];
  studentResult.innerHTML = `
    <div class="student-card">
      <div><span>${labels[0]}</span><strong>${student.name}</strong></div>
      <div><span>${labels[1]}</span><strong>${student.grade}</strong></div>
      <div><span>${labels[2]}</span><strong>${student.status}</strong></div>
      <div><span>${labels[3]}</span><strong>${student.schedule}</strong></div>
    </div>
  `;
}

function updateLoginLabel() {
  if (!loginToggle) return;
  if (currentRole) {
    const cfg = roleConfig[currentRole];
    loginToggle.textContent = cfg.logoutLabel[language] || cfg.logoutLabel.th;
  } else {
    loginToggle.textContent = "Login";
  }
}

function selectRole(role) {
  selectedRole = role;
  const cfg = roleConfig[role];
  roleTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.role === role));
  if (hintEmail) hintEmail.textContent = cfg.email;
  if (loginEmailInput) loginEmailInput.value = cfg.email;
  if (loginSubmitBtn) loginSubmitBtn.textContent = cfg.submitLabel;
}

function showPanel(role) {
  currentRole = role;
  ["is-teacher", "is-student", "is-parent"].forEach((cls) => document.body.classList.remove(cls));
  document.body.classList.add(roleConfig[role].bodyClass);
  topnav.classList.remove("open");
  updateLoginLabel();
  loginDialog.close();
  history.replaceState(null, "", window.location.pathname + window.location.search);
  window.scrollTo({ top: 0, behavior: "auto" });
}

function showPublicSite() {
  currentRole = null;
  ["is-teacher", "is-student", "is-parent"].forEach((cls) => document.body.classList.remove(cls));
  topnav.classList.remove("open");
  updateLoginLabel();
  history.replaceState(null, "", window.location.pathname + window.location.search);
  window.scrollTo({ top: 0, behavior: "auto" });
}

languageToggle.addEventListener("click", () => {
  applyLanguage(language === "th" ? "en" : "th");
});

menuToggle.addEventListener("click", () => {
  topnav.classList.toggle("open");
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => showSlide(Number(dot.dataset.targetSlide)));
});

if (studentForm) {
  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderStudent(studentInput.value.trim().toUpperCase());
  });
}

loginToggle.addEventListener("click", () => {
  if (currentRole) {
    showPublicSite();
    return;
  }
  loginMessage.textContent = "";
  selectRole("teacher");
  loginDialog.showModal();
});

dialogClose.addEventListener("click", () => loginDialog.close());

roleTabs.forEach((tab) => {
  tab.addEventListener("click", () => selectRole(tab.dataset.role));
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value;
  const cfg = roleConfig[selectedRole];

  if (email === cfg.email && password === "1234") {
    showPanel(selectedRole);
    return;
  }

  loginMessage.textContent = language === "th"
    ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
    : "Email or password is incorrect.";
});

setInterval(() => {
  showSlide((activeSlide + 1) % slides.length);
}, 6500);

// Bus tracker ETA countdown
(function initBusTracker() {
  const etaMinutesEls = document.querySelectorAll(".eta-minutes");
  const etaClockEls = document.querySelectorAll(".eta-clock");
  const etaArrivalEls = document.querySelectorAll(".eta-arrival");
  const lastUpdateEls = document.querySelectorAll(".last-update");
  if (!etaMinutesEls.length) return;

  let remaining = 12;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    if (remaining > 0) remaining--;

    const now = new Date();
    const arrival = new Date(now.getTime() + remaining * 60000);
    const arrivalStr = pad(arrival.getHours()) + ":" + pad(arrival.getMinutes());
    const nowStr = pad(now.getHours()) + ":" + pad(now.getMinutes());

    etaMinutesEls.forEach((el) => {
      el.textContent = remaining > 0 ? remaining : "ถึงแล้ว!";
    });
    etaClockEls.forEach((el) => {
      el.textContent = remaining > 0
        ? "ประมาณ " + arrivalStr + " น."
        : "รถถึงจุดรับของคุณแล้ว 🎉";
    });
    etaArrivalEls.forEach((el) => { el.textContent = arrivalStr; });
    lastUpdateEls.forEach((el) => { el.textContent = "อัปเดต " + nowStr + " น."; });
  }

  tick();
  setInterval(tick, 60000);
}());
