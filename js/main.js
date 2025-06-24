class BetaLaunchApp {
  constructor() {
    this.isPartyMode = false;
    this.partyInterval = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initLoader();
    this.initTabs();
    this.initCounters();
    this.initScrollAnimations();
    this.initFormValidation();
    this.initNavigation();
    this.initScrollProgress();
    this.initThemeToggle();
    this.initEnhancedAnimations();
    this.initScrollReveal();
    this.initLucideIcons();

    console.log("🚀 BetaLaunch 2025 initialized with enhanced features!");
  }

  initLoader() {
    const loader = document.getElementById("loader");
    const progressBar = document.querySelector(".loader-progress-bar");

    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);

        setTimeout(() => {
          loader.classList.add("hidden");
          document.body.style.overflow = "auto";
        }, 500);
      }
      if (progressBar) {
        progressBar.style.width = progress + "%";
      }
    }, 100);

    setTimeout(() => {
      if (loader && !loader.classList.contains("hidden")) {
        loader.classList.add("hidden");
        document.body.style.overflow = "auto";
      }
    }, 3000);
  }

  initTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab");

        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabPanels.forEach((panel) => panel.classList.remove("active"));

        button.classList.add("active");
        const targetPanel = document.getElementById(targetTab);
        if (targetPanel) {
          targetPanel.classList.add("active");
        }
      });
    });
  }

  initCounters() {
    const stats = document.querySelectorAll(".stat-number");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !entry.target.classList.contains("counted")
          ) {
            this.animateCounter(entry.target);
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    stats.forEach((stat) => {
      stat.style.fontVariantNumeric = "tabular-nums";
      stat.style.transition = "color 0.3s ease, transform 0.3s ease";
      observer.observe(stat);
    });
  }

  animateCounter(element) {
    const end = parseInt(element.getAttribute("data-count"));
    let start = 0;

    const step = () => {
      element.textContent = Math.floor(start);
      if (start < end) {
        start += end / 40;
        requestAnimationFrame(step);
      } else {
        element.textContent = end;
        element.classList.add("counted");
        element.style.transform = "scale(1.05)";
        setTimeout(() => {
          element.style.transform = "scale(1)";
        }, 200);
      }
    };

    step();
  }

  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      ".hero-title, .hero-subtitle, .section-title, .feature-card, .waitlist-form-container"
    );

    animatedElements.forEach((element) => {
      scrollObserver.observe(element);
    });

    this.addScrollAnimationStyles();
  }

  addScrollAnimationStyles() {
    const style = document.createElement("style");
    style.textContent = `
            .hero-title, .hero-subtitle, .section-title, .feature-card, .waitlist-form-container {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
    document.head.appendChild(style);
  }

  initFormValidation() {
    const form = document.getElementById("waitlistForm");
    const emailInput = document.getElementById("email");
    const submitButton = form ? form.querySelector(".btn-primary") : null;

    if (form && emailInput && submitButton) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmission(form, emailInput, submitButton);
      });

      emailInput.addEventListener("input", () => {
        this.validateEmail(emailInput);
      });

      emailInput.addEventListener("blur", () => {
        this.validateEmail(emailInput);
      });
    }
  }

  validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);

    if (input.value.length > 0) {
      if (isValid) {
        input.style.borderColor = "#4ade80";
        input.style.boxShadow = "0 0 0 3px rgba(74, 222, 128, 0.1)";
      } else {
        input.style.borderColor = "#ef4444";
        input.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)";
      }
    } else {
      input.style.borderColor = "";
      input.style.boxShadow = "";
    }

    return isValid;
  }

  async handleFormSubmission(form, emailInput, submitButton) {
    const email = emailInput.value.trim();

    if (!this.validateEmail(emailInput)) {
      this.showNotification("Por favor, ingresa un email válido", "error");
      emailInput.focus();
      emailInput.setAttribute("aria-invalid", "true");
      return;
    }

    const existingEmails = this.getStoredEmails();
    if (existingEmails.includes(email.toLowerCase())) {
      this.showNotification(
        "Este email ya está en nuestra lista de espera",
        "info"
      );
      return;
    }

    submitButton.classList.add("loading");
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");

    try {
      await this.simulateAPICall();

      this.saveEmailToWaitlist(email);

      this.showNotification(
        "¡Te has unido exitosamente a la lista de espera!",
        "success"
      );
      form.reset();

      emailInput.setAttribute("aria-invalid", "false");

      this.updateWaitlistCounter();

      this.triggerCelebration();
    } catch (error) {
      this.showNotification(
        "Hubo un error. Por favor, intenta nuevamente.",
        "error"
      );
    } finally {
      submitButton.classList.remove("loading");
      submitButton.disabled = false;
      submitButton.setAttribute("aria-busy", "false");
    }
  }

  saveEmailToWaitlist(email) {
    try {
      let emails = this.getStoredEmails();
      emails.push(email.toLowerCase());
      localStorage.setItem("launchflow_waitlist", JSON.stringify(emails));
      console.log(
        `💾 Email ${email} saved to waitlist. Total: ${emails.length}`
      );
    } catch (error) {
      console.warn("Could not save to localStorage:", error);
    }
  }

  getStoredEmails() {
    try {
      return JSON.parse(localStorage.getItem("launchflow_waitlist") || "[]");
    } catch (error) {
      console.warn("Could not read from localStorage:", error);
      return [];
    }
  }

  updateWaitlistCounter() {
    const emails = this.getStoredEmails();
    const counter = document.querySelector('[data-count="347"]');
    if (counter && emails.length > 0) {
      const newCount = 347 + emails.length;
      counter.setAttribute("data-count", newCount);
      counter.textContent = newCount;
    }
  }

  simulateAPICall() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.1 ? resolve() : reject();
      }, 2000);
    });
  }

  showNotification(message, type = "info") {
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${
                      type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"
                    }
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${
              type === "success"
                ? "rgba(74, 222, 128, 0.9)"
                : type === "error"
                ? "rgba(239, 68, 68, 0.9)"
                : "rgba(59, 130, 246, 0.9)"
            };
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;

    document.body.appendChild(notification);

    const closeButton = notification.querySelector(".notification-close");
    closeButton.addEventListener("click", () => {
      notification.style.animation = "slideInRight 0.3s ease reverse";
      setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
      if (notification.parentN) {
        notification.style.animation = "slideInRight 0.3s ease reverse";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  triggerCelebration() {
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        this.createConfetti();
      }, i * 50);
    }
  }

  createConfetti() {
    const confetti = document.createElement("div");
    confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${
              ["#ff6b6b", "#ffd93d", "#6bcf7e", "#4ecdc4", "#45b7d1"][
                Math.floor(Math.random() * 5)
              ]
            };
            top: -10px;
            left: ${Math.random() * window.innerWidth}px;
            z-index: 10000;
            pointer-events: none;
            border-radius: 50%;
        `;

    document.body.appendChild(confetti);

    const fallAnimation = confetti.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translateY(${window.innerHeight + 10}px) rotate(720deg)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 2000 + 1000,
        easing: "ease-in",
      }
    );

    fallAnimation.addEventListener("finish", () => {
      confetti.remove();
    });
  }

  initNavigation() {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        navToggle.classList.toggle("active");
      });
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }

        if (navMenu) {
          navMenu.classList.remove("active");
          if (navToggle) navToggle.classList.remove("active");
        }
      });
    });

    this.initScrollSpy();
  }

  initScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const scrollSpyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeLink = document.querySelector(
              `.nav-link[href="#${entry.target.id}"]`
            );

            navLinks.forEach((link) => link.classList.remove("active"));

            if (activeLink) {
              activeLink.classList.add("active");
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-70px 0px -70px 0px",
      }
    );

    sections.forEach((section) => {
      scrollSpyObserver.observe(section);
    });
  }

  togglePartyMode() {
    this.isPartyMode = !this.isPartyMode;
    const body = document.body;

    if (this.isPartyMode) {
      body.classList.add("party-mode");
      this.startPartyEffects();
      this.showNotification(
        "🎉 ¡Modo Fiesta Activado! (ESC o Espacio para salir)",
        "success"
      );

      this.partyTimeout = setTimeout(() => {
        if (this.isPartyMode) {
          this.togglePartyMode();
          this.showNotification(
            "🌟 Modo Fiesta finalizado automáticamente",
            "info"
          );
        }
      }, 20000);
    } else {
      body.classList.remove("party-mode");
      this.stopPartyEffects();
      if (this.partyTimeout) {
        clearTimeout(this.partyTimeout);
        this.partyTimeout = null;
      }
      this.showNotification("🎈 Modo Fiesta desactivado", "info");
    }
  }

  startPartyEffects() {
    this.partyInterval = setInterval(() => {
      this.createPartyBurst();
    }, 1000);

    this.createPartyBurst();
  }

  stopPartyEffects() {
    if (this.partyInterval) {
      clearInterval(this.partyInterval);
      this.partyInterval = null;
    }
  }

  createPartyBurst() {
    const isDarkMode = document.documentElement.classList.contains("dark-mode");

    const lightColors = [
      "#ff6b6b",
      "#ffd93d",
      "#6bcf7e",
      "#4ecdc4",
      "#45b7d1",
      "#ff9a56",
      "#c44569",
      "#f8b500",
    ];

    const darkColors = [
      "#ff8a80",
      "#ffe082",
      "#a5d6a7",
      "#80deea",
      "#81d4fa",
      "#ffab91",
      "#ce93d8",
      "#fff176",
    ];

    const colors = isDarkMode ? darkColors : lightColors;

    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 4 + Math.random() * 6;

        particle.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          left: ${Math.random() * window.innerWidth}px;
          top: ${Math.random() * window.innerHeight}px;
          box-shadow: 0 0 ${size * 2}px ${color}${isDarkMode ? "80" : "40"};
        `;

        document.body.appendChild(particle);

        const animation = particle.animate(
          [
            {
              transform: "scale(0) rotate(0deg)",
              opacity: 1,
              filter: "blur(0px)",
            },
            {
              transform: `scale(${2 + Math.random()}) rotate(${
                Math.random() * 720
              }deg)`,
              opacity: 0,
              filter: "blur(2px)",
            },
          ],
          {
            duration: 1200 + Math.random() * 800,
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }
        );

        animation.addEventListener("finish", () => {
          particle.remove();
        });
      }, i * 80);
    }
  }

  setupEventListeners() {
    window.togglePartyMode = () => this.togglePartyMode();

    window.scrollToWaitlist = () => {
      const waitlistSection = document.getElementById("waitlist");
      if (waitlistSection) {
        const offsetTop = waitlistSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    };

    let lastScrollY = window.scrollY;
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (navbar) navbar.style.transform = "translateY(-100%)";
      } else {
        if (navbar) navbar.style.transform = "translateY(0)";
      }

      lastScrollY = currentScrollY;
    });

    window.addEventListener("resize", () => {
      this.handleResize();
    });

    document.addEventListener("keydown", (e) => {
      this.handleKeyboardNavigation(e);
    });
  }

  handleResize() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      document.body.classList.add("mobile-optimized");
    } else {
      document.body.classList.remove("mobile-optimized");
    }
  }

  handleKeyboardNavigation(e) {
    if (e.key === "Escape" && this.isPartyMode) {
      this.togglePartyMode();
    }

    if (
      e.key === " " &&
      e.target.tagName !== "INPUT" &&
      e.target.tagName !== "TEXTAREA"
    ) {
      e.preventDefault();
      this.togglePartyMode();
    }

    if (e.key === "Tab") {
      this.handleTabNavigation(e);
    }
  }

  handleTabNavigation(e) {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }

  initScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;

      progressBar.style.width = `${Math.min(progress, 100)}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  initThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem("launchflow_theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark-mode");
    }

    this.updateThemeToggleState();

    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark-mode");
      localStorage.setItem("launchflow_theme", isDark ? "dark" : "light");

      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
      );

      themeToggle.style.transform = "scale(0.8)";
      setTimeout(() => {
        themeToggle.style.transform = "scale(1)";
        this.updateThemeToggleState();
      }, 150);
    });
  }

  updateThemeToggleState() {
    const isDark = document.documentElement.classList.contains("dark-mode");
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.setAttribute("data-theme", isDark ? "dark" : "light");
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
      );
    }
  }

  initEnhancedAnimations() {
    const heroElements = document.querySelectorAll(".hero-content > *");
    heroElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.1}s`;
    });

    this.initTabAnimations();
  }

  initTabAnimations() {
    const tabButtons = document.querySelectorAll(".tab-btn");

    tabButtons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-2px)";
      });

      button.addEventListener("mouseleave", () => {
        if (!button.classList.contains("active")) {
          button.style.transform = "translateY(0)";
        }
      });

      button.addEventListener("focus", () => {
        button.style.outline = "2px solid var(--primary-color)";
        button.style.outlineOffset = "2px";
      });

      button.addEventListener("blur", () => {
        button.style.outline = "none";
      });

      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          button.click();
        }
      });

      button.addEventListener("click", () => {
        tabButtons.forEach((btn) => btn.setAttribute("aria-selected", "false"));
        button.setAttribute("aria-selected", "true");
      });
    });
  }

  initScrollReveal() {
    const revealElements = document.querySelectorAll(
      ".scroll-reveal, .feature-card, .benefit-item"
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((element) => {
      element.classList.add("scroll-reveal");
      revealObserver.observe(element);
    });
  }

  initLucideIcons() {
    const initIcons = () => {
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
        console.log("🎨 Lucide icons initialized");
      } else {
        setTimeout(initIcons, 100);
      }
    };

    initIcons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new BetaLaunchApp();

  window.BetaLaunchApp = app;

  document.body.classList.add("loading");

  setTimeout(() => {
    document.body.classList.remove("loading");
  }, 100);
});

window.addEventListener("error", (e) => {
  console.error("Global error caught:", e.error);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
});
