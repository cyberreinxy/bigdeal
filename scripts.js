// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-links li a");
  const contactForm = document.getElementById("contact-form");
  const phoneInput = document.getElementById('phone-input');

  // Toggle nav-links display when hamburger is clicked
  hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      document.body.classList.toggle("menu-open");
  });

  // Close the menu when clicking outside of it or on a nav item
  document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove("active");
          document.body.classList.remove("menu-open");
      }
  });

  // Close the menu when clicking on a nav item
  navItems.forEach((item) => {
      item.addEventListener("click", () => {
          navLinks.classList.remove("active");
          document.body.classList.remove("menu-open");
      });
  });

  // Smooth scroll for anchor links
  navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = item.getAttribute("href").substring(1);
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
              window.scrollTo({
                  top: targetSection.offsetTop - 60, // Adjust for fixed header height
                  behavior: "smooth",
              });
          }
      });
  });

  // Form validation
  contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name === "" || email === "" || message === "") {
          alert("All fields are required.");
          return;
      }

      if (!validateEmail(email)) {
          alert("Please enter a valid email address.");
          return;
      }

      alert("Message sent successfully!");
      contactForm.reset();
  });

  // Email validation function
  function validateEmail(email) {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(email).toLowerCase());
  }

  // Initialize the phone input with IMask
  if (phoneInput) {
      const phoneMask = IMask(phoneInput, {
          mask: '(000) 000-0000'
      });
  }

  // Initialize the phone input with intl-tel-input
  var input = document.querySelector("#phone");
  if (input) { // Ensure the input exists before initializing
      var iti = window.intlTelInput(input, {
          initialCountry: "auto", // Automatically detect the country
          preferredCountries: ['us', 'gb', 'in', 'ca', 'au'], // Optional: preferred countries
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.min.js" // For phone number validation
      });
  }
});