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
        "¡Aplicación enviada con éxito! Te contactaremos pronto.";
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

  const betaApplicationForm = document.getElementById("betaApplicationForm");
  if (betaApplicationForm) {
    const fieldsets = betaApplicationForm.querySelectorAll("fieldset");
    const stepperItems = document.querySelectorAll("#formStepper .step-item");
    const prevBtn = betaApplicationForm.querySelector(".step-prev");
    const nextBtn = betaApplicationForm.querySelector(".step-next");
    const submitBtn = betaApplicationForm.querySelector(".step-submit");
    let currentStep = 0;

    const commitmentSlider = betaApplicationForm.querySelector("#commitment");
    const commitmentValue = betaApplicationForm.querySelector(".range-value");

    if (commitmentSlider && commitmentValue) {
      // Update on initial load
      commitmentValue.textContent = `${commitmentSlider.value} horas/semana`;

      commitmentSlider.addEventListener("input", (e) => {
        commitmentValue.textContent = `${e.target.value} horas/semana`;
      });
    }

    function showStep(step) {
      fieldsets.forEach((fs, idx) => {
        fs.style.display = idx === step ? "block" : "none";
      });
      stepperItems.forEach((item, idx) => {
        item.classList.toggle("active", idx === step);
        item.classList.toggle("completed", idx < step);
      });
      prevBtn.style.display = step === 0 ? "none" : "inline-block";
      nextBtn.style.display =
        step === fieldsets.length - 1 ? "none" : "inline-block";
      submitBtn.style.display =
        step === fieldsets.length - 1 ? "inline-block" : "none";
    }

    function validateStep(step) {
      const currentFieldset = fieldsets[step];
      const inputs = currentFieldset.querySelectorAll(
        "input[required]:not([type='checkbox']), select[required], textarea[required]"
      );
      let isStepValid = true;

      // Validate standard inputs
      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          isStepValid = false;
          input.classList.add("invalid");
        } else {
          input.classList.remove("invalid");
        }
      });

      // Special validation for checkbox groups that need at least one checked
      const interestCheckboxes = currentFieldset.querySelectorAll(
        'input[name="interests[]"]'
      );
      if (interestCheckboxes.length > 0) {
        const checkboxGroup = currentFieldset.querySelector(".checkbox-group");
        const isAnyChecked = Array.from(interestCheckboxes).some(
          (c) => c.checked
        );
        if (!isAnyChecked) {
          isStepValid = false;
          checkboxGroup.classList.add("invalid-group");
        } else {
          checkboxGroup.classList.remove("invalid-group");
        }
      }

      return isStepValid;
    }

    // Inicializar
    showStep(currentStep);

    prevBtn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep -= 1;
        showStep(currentStep);
      }
    });

    nextBtn.addEventListener("click", () => {
      // Limpiar errores previos antes de validar
      fieldsets[currentStep]
        .querySelectorAll(".invalid")
        .forEach((el) => el.classList.remove("invalid"));
      const checkboxGroup =
        fieldsets[currentStep].querySelector(".checkbox-group");
      if (checkboxGroup) {
        checkboxGroup.classList.remove("invalid-group");
      }

      if (validateStep(currentStep)) {
        if (currentStep < fieldsets.length - 1) {
          currentStep += 1;
          showStep(currentStep);
        }
      }
    });

    // Prevent normal submit for demo, simulate success then reset
    betaApplicationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateStep(currentStep)) {
        return;
      }

      const button = submitBtn;
      const originalText = button.textContent;

      button.disabled = true;
      button.classList.add("is-loading");
      button.innerHTML = `<span class="btn-loading-spinner"></span> Enviando...`;

      setTimeout(() => {
        button.classList.remove("is-loading");
        button.innerHTML = `✓ ¡Aplicación enviada!`;
        button.classList.add("btn-success");

        setTimeout(() => {
          button.innerHTML = originalText;
          button.classList.remove("btn-success");
          button.disabled = false;
          betaApplicationForm.reset();
          // Actualizar el valor del slider en el reset
          if (commitmentSlider) {
            commitmentValue.textContent = `${commitmentSlider.value} horas/semana`;
          }
          currentStep = 0;
          showStep(currentStep);
        }, 4000);
      }, 1500); // Simular delay de red
    });
  }

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});
