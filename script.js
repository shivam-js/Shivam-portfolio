const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");
const scrollProgress = document.querySelector(".scroll-progress");
const revealElements = document.querySelectorAll(".reveal");
const typingText = document.querySelector(".typing-text");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const roles = [
  "Web Developer",
  "Frontend Developer",
  "Full Stack Learner",
  "AI Project Builder"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex--);
  } else {
    typingText.textContent = currentRole.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentRole.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1100);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, isDeleting ? 55 : 95);
}

typeEffect();

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / documentHeight) * 100;

  scrollProgress.style.width = `${scrollPercent}%`;

  if (scrollTop > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

  updateActiveNav();
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navItems.forEach((item) => {
        item.classList.remove("active");

        if (item.getAttribute("href") === `#${sectionId}`) {
          item.classList.add("active");
        }
      });
    }
  });
}

// 🔥 EMAILJS SETUP

(function () {
  emailjs.init({
    publicKey: "JBU5AChERpv01fjIw"
  });
})();

const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (sendBtn.disabled) return;
  sendBtn.innerHTML = "Sending...";

  sendBtn.textContent = "Sending...";
  sendBtn.disabled = true;
  formStatus.textContent = "";

  emailjs
    .sendForm(
      "service_1odqf0m",
      "template_6upfhyu",
      this
    )
    .then(() => {
      formStatus.textContent = "Message sent successfully!";
      formStatus.style.color = "#22c55e";
      contactForm.reset();
    })
    .catch((error) => {
      console.log(error);
      formStatus.textContent = "Failed to send message!";
      formStatus.style.color = "#ef4444";
    })
    .finally(() => {
      sendBtn.textContent = "Send Message";
      sendBtn.disabled = false;
    });
});