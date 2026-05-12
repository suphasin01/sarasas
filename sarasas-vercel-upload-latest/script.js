const translations = document.querySelectorAll("[data-th][data-en]");
const languageToggle = document.querySelector(".language-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const topnav = document.querySelector(".topnav");
const menuOverlay = document.querySelector(".menu-overlay");
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

let language = "th";
let activeSlide = 0;
let isTeacherMode = false;

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
  if (studentInput.value.trim()) {
    renderStudent(studentInput.value.trim().toUpperCase());
  }
  updateLoginLabel();
}

function showSlide(index) {
  activeSlide = index;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === activeSlide);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeSlide);
  });
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
  loginToggle.textContent = isTeacherMode
    ? (language === "th" ? "ออกจากระบบ" : "Logout")
    : "Login";
}

function showTeacherPanel() {
  isTeacherMode = true;
  document.body.classList.add("is-teacher");
  closeMenu();
  updateLoginLabel();
  loginDialog.close();
  history.replaceState(null, "", window.location.pathname + window.location.search);
  window.scrollTo({ top: 0, behavior: "auto" });
}

function showPublicSite() {
  isTeacherMode = false;
  document.body.classList.remove("is-teacher");
  closeMenu();
  updateLoginLabel();
  history.replaceState(null, "", window.location.pathname + window.location.search);
  window.scrollTo({ top: 0, behavior: "auto" });
}

function openMenu() {
  topnav.classList.add("open");
  menuToggle.classList.add("open");
  menuOverlay.classList.add("open");
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  topnav.classList.remove("open");
  menuToggle.classList.remove("open");
  menuOverlay.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

languageToggle.addEventListener("click", () => {
  applyLanguage(language === "th" ? "en" : "th");
});

menuToggle.addEventListener("click", () => {
  if (topnav.classList.contains("open")) {
    closeMenu();
    return;
  }
  openMenu();
});

menuOverlay.addEventListener("click", closeMenu);

topnav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.targetSlide));
  });
});

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderStudent(studentInput.value.trim().toUpperCase());
});

loginToggle.addEventListener("click", () => {
  if (isTeacherMode) {
    showPublicSite();
    return;
  }

  closeMenu();
  loginMessage.textContent = "";
  loginDialog.showModal();
});

dialogClose.addEventListener("click", () => {
  loginDialog.close();
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const email = formData.get("teacher-email");
  const password = formData.get("teacher-password");

  if (email === "teacher@sarasas.test" && password === "1234") {
    showTeacherPanel();
    return;
  }

  loginMessage.textContent = language === "th"
    ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
    : "Email or password is incorrect.";
});

setInterval(() => {
  showSlide((activeSlide + 1) % slides.length);
}, 6500);
