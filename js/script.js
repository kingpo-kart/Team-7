const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) navMenu.classList.remove("active");
  });
});

const fadeTargets = document.querySelectorAll(
  ".about-card, .department-card, .result-card, .club-card, .schedule-table-wrap, .admission"
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
  { threshold: 0.15 }
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

if (resultSection) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counterStarted) {
          counterStarted = true;
          startCounters();
        }
      });
    },
    { threshold: 0.4 }
  );

  counterObserver.observe(resultSection);
}

const clubViewport = document.getElementById("clubViewport");
const clubTrack = document.getElementById("clubTrack");
const clubPrev = document.getElementById("clubPrev");
const clubNext = document.getElementById("clubNext");
const clubDots = document.getElementById("clubDots");
const clubFilterButtons = document.querySelectorAll("[data-club-filter]");

if (clubViewport && clubTrack && clubPrev && clubNext && clubDots) {
  const allCards = Array.from(clubTrack.querySelectorAll(".club-card"));
  let currentPage = 0;
  let totalPages = 1;

  function getCardsPerPage() {
    if (window.innerWidth <= 560) return 1;
    if (window.innerWidth <= 1000) return 2;
    return 4;
  }

  function getVisibleCards() {
    return allCards.filter((card) => !card.classList.contains("is-hidden"));
  }

  function renderDots() {
    clubDots.innerHTML = "";

    for (let i = 0; i < totalPages; i += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = i === currentPage ? "club-dot active" : "club-dot";
      dot.setAttribute("aria-label", `${i + 1}번째 동아리 페이지 보기`);

      dot.addEventListener("click", () => {
        currentPage = i;
        updateCarousel();
      });

      clubDots.appendChild(dot);
    }
  }

  function updateCarousel() {
    const visibleCards = getVisibleCards();
    const cardsPerPage = getCardsPerPage();

    totalPages = Math.max(1, Math.ceil(visibleCards.length / cardsPerPage));
    currentPage = Math.min(currentPage, totalPages - 1);

    const offset = clubViewport.clientWidth * currentPage;
    clubTrack.style.transform = `translateX(-${offset}px)`;

    clubPrev.disabled = currentPage === 0;
    clubNext.disabled = currentPage === totalPages - 1;

    clubPrev.style.opacity = currentPage === 0 ? "0.45" : "1";
    clubNext.style.opacity = currentPage === totalPages - 1 ? "0.45" : "1";

    renderDots();
  }

  clubFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      clubFilterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.clubFilter;

      allCards.forEach((card) => {
        const isMatch = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !isMatch);
      });

      currentPage = 0;
      updateCarousel();
    });
  });

  clubPrev.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage -= 1;
      updateCarousel();
    }
  });

  clubNext.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      currentPage += 1;
      updateCarousel();
    }
  });

  window.addEventListener("resize", updateCarousel);

  updateCarousel();
}