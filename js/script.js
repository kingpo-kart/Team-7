const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const clubCards = document.querySelectorAll(".club-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    clubCards.forEach((card) => {
      const category = card.dataset.category;

      if (filter === "all" || filter === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const fadeTargets = document.querySelectorAll(
  ".intro-card, .department-card, .result-card, .club-card, .time-item, .admission"
);

fadeTargets.forEach((target) => {
  target.classList.add("fade-in");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

fadeTargets.forEach((target) => {
  observer.observe(target);
});

const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function startCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    let current = 0;
    const speed = Math.max(1, Math.floor(target / 60));

    const timer = setInterval(() => {
      current += speed;

      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = current;
      }
    }, 20);
  });
}

const resultSection = document.querySelector("#results");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counterStarted) {
        counterStarted = true;
        startCounters();
      }
    });
  },
  {
    threshold: 0.4,
  }
);

counterObserver.observe(resultSection);