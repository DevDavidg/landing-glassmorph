document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const buttons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .btn-plan"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.add("btn-clicked");
      setTimeout(() => {
        this.classList.remove("btn-clicked");
      }, 150);
    });
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      const successMessage = document.createElement("div");
      successMessage.className = "form-success-message";
      successMessage.textContent =
        "Mensaje enviado correctamente. Te contactaremos pronto!";
      this.appendChild(successMessage);

      this.reset();

      setTimeout(() => {
        if (successMessage.parentNode) {
          successMessage.remove();
        }
      }, 5000);
    });
  }

  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".feature-card, .plan-card, .stat-item, .team-member, .contact-item, .feature-row"
  );
  animatedElements.forEach((el) => observer.observe(el));

  const betaForm = document.querySelector(".beta-form");
  if (betaForm) {
    betaForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector(".beta-email-input");
      const email = emailInput.value;

      if (email) {
        const button = this.querySelector(".btn-primary");
        const originalText = button.textContent;
        button.textContent = "✓ ¡Registrado!";
        button.classList.add("btn-success");

        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove("btn-success");
          emailInput.value = "";
        }, 3000);
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});
