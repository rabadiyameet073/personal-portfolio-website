/* 
  ==========================================
  MEET RABADIYA - PORTFOLIO JAVASCRIPT
  ==========================================
  Hamburger menu, form validation, and scroll animations
*/

// ==========================================
// 1. PAGE TRANSITIONS
// ==========================================

/**
 * Initialize page transition effects
 * Adds smooth fade transitions between pages
 */
function initPageTransitions() {
  // Add page load animation class
  document.body.classList.add('page-loaded');

  // Handle link clicks for smooth page transitions
  const internalLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="mailto"]):not([target="_blank"])');

  internalLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Only handle internal navigation links
      if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
        e.preventDefault();
        document.body.style.animation = 'pageExitFadeOut 0.3s ease forwards';

        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
}

// ==========================================
// 2. HAMBURGER MENU FUNCTIONALITY
// ==========================================

/**
 * Initialize hamburger menu toggle
 * Toggles the mobile navigation menu on click
 */
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay")

  if (hamburger && mobileMenu && mobileMenuOverlay) {
    // Toggle menu on hamburger click
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation()
      hamburger.classList.toggle("active")
      mobileMenu.classList.toggle("active")
      mobileMenuOverlay.classList.toggle("active")

      // Prevent body scroll when menu is open
      if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "auto"
      }
    })

    // Close menu when clicking on overlay
    mobileMenuOverlay.addEventListener("click", () => {
      hamburger.classList.remove("active")
      mobileMenu.classList.remove("active")
      mobileMenuOverlay.classList.remove("active")
      document.body.style.overflow = "auto"
    })

    // Close menu when a link is clicked
    const navLinks = mobileMenu.querySelectorAll("a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        mobileMenu.classList.remove("active")
        mobileMenuOverlay.classList.remove("active")
        document.body.style.overflow = "auto"
      })
    })

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        hamburger.classList.remove("active")
        mobileMenu.classList.remove("active")
        mobileMenuOverlay.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    })
  }
}

// ==========================================
// 2. FORM VALIDATION
// ==========================================

/**
 * Validate email format using regex
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Clear error messages from form
 */
function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message")
  errorMessages.forEach((error) => {
    error.textContent = ""
  })
}

/**
 * Display error message for a specific field
 * @param {string} fieldId - ID of the form field
 * @param {string} message - Error message to display
 */
function showError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}Error`)
  if (errorElement) {
    errorElement.textContent = message
  }
}

/**
 * Validate contact form inputs
 * @returns {boolean} - True if all fields are valid
 */
function validateForm() {
  clearErrors()
  let isValid = true

  // Get form fields
  const name = document.getElementById("name").value.trim()
  const email = document.getElementById("email").value.trim()
  const subject = document.getElementById("subject").value.trim()
  const message = document.getElementById("message").value.trim()

  // Validate name (required, min 3 characters)
  if (!name) {
    showError("name", "Name is required")
    isValid = false
  } else if (name.length < 3) {
    showError("name", "Name must be at least 3 characters long")
    isValid = false
  }

  // Validate email (required and valid format)
  if (!email) {
    showError("email", "Email is required")
    isValid = false
  } else if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email address")
    isValid = false
  }

  // Validate subject (required, min 5 characters)
  if (!subject) {
    showError("subject", "Subject is required")
    isValid = false
  } else if (subject.length < 5) {
    showError("subject", "Subject must be at least 5 characters long")
    isValid = false
  }

  // Validate message (required, min 10 characters)
  if (!message) {
    showError("message", "Message is required")
    isValid = false
  } else if (message.length < 10) {
    showError("message", "Message must be at least 10 characters long")
    isValid = false
  }

  return isValid
}

/**
 * Smart subject suggestion based on message content
 * Detects hiring-related keywords and suggests appropriate subject
 */
function suggestSubject(message) {
  const lowerMessage = message.toLowerCase();

  // Keywords for hiring/job opportunities
  const hiringKeywords = ['hire', 'hiring', 'job', 'position', 'opportunity', 'recruit', 'employment', 'work', 'freelance', 'contract'];

  // Check if message contains hiring-related keywords
  const isHiringRelated = hiringKeywords.some(keyword => lowerMessage.includes(keyword));

  if (isHiringRelated) {
    return "Hiring Inquiry";
  } else {
    return "General Message";
  }
}

/**
 * Initialize contact form submission
 * Handles form validation and submission with Formspree
 */
function initContactForm() {
  const contactForm = document.getElementById("contactForm")
  const successMessage = document.getElementById("successMessage")
  const messageField = document.getElementById("message")
  const subjectField = document.getElementById("subject")

  if (contactForm) {
    // Smart subject suggestion on message input
    if (messageField && subjectField) {
      messageField.addEventListener("input", () => {
        const message = messageField.value.trim();

        // Only suggest if subject is empty or matches a previous suggestion
        const currentSubject = subjectField.value.trim();
        if (!currentSubject || currentSubject === "Hiring Inquiry" || currentSubject === "General Message") {
          if (message.length > 10) {
            const suggested = suggestSubject(message);
            subjectField.value = suggested;
            subjectField.style.fontStyle = "italic";
            subjectField.style.opacity = "0.8";
          }
        }
      });

      // Remove suggestion styling when user types in subject
      subjectField.addEventListener("focus", () => {
        subjectField.style.fontStyle = "normal";
        subjectField.style.opacity = "1";
      });
    }

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Validate form
      if (validateForm()) {
        // Show sending message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        // Get form data
        const formData = new FormData(contactForm);

        try {
          // Send email using Formspree
          const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            console.log('Email sent successfully via Formspree!');

            // Show success message
            if (successMessage) {
              successMessage.textContent = "✓ Message sent successfully! I'll get back to you soon."
              successMessage.style.display = "block"
              successMessage.style.color = "#4ade80"
            }

            // Reset form
            contactForm.reset()
            clearErrors()

            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;

            // Hide success message after 5 seconds
            setTimeout(() => {
              if (successMessage) {
                successMessage.textContent = ""
                successMessage.style.display = "none"
              }
            }, 5000)
          } else {
            throw new Error('Formspree submission failed');
          }
        } catch (error) {
          console.error('Email sending failed:', error);

          // Show error message
          if (successMessage) {
            successMessage.textContent = "✗ Failed to send message. Please try again or email me directly at rabadiyameet09@gmail.com"
            successMessage.style.display = "block"
            successMessage.style.color = "#e74c3c"
          }

          // Reset button
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;

          // Hide error message after 7 seconds
          setTimeout(() => {
            if (successMessage) {
              successMessage.textContent = ""
              successMessage.style.display = "none"
            }
          }, 7000)
        }
      }
    })

    // Clear error message on input
    const inputs = contactForm.querySelectorAll("input, textarea")
    inputs.forEach((input) => {
      input.addEventListener("input", clearErrors)
    })
  }
}

// ==========================================
// 3. SCROLL ANIMATIONS
// ==========================================

/**
 * Initialize scroll-triggered animations
 * Adds fade-in animation when elements come into view
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out forwards"
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe cards and sections
  const animateElements = document.querySelectorAll(
    ".education-card, .project-card, .certificate-card, .skill-category",
  )

  animateElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.animationDelay = `${index * 0.1}s`
    observer.observe(el)
  })
}

// ==========================================
// 4. SMOOTH SCROLL BEHAVIOR
// ==========================================

/**
 * Initialize smooth scroll behavior for internal links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault()
        const target = document.querySelector(href)
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })
}

// ==========================================
// 5. NAVBAR ACTIVE STATE
// ==========================================

/**
 * Highlight active navbar link based on current page
 */
function initActiveNavLink() {
  const currentLocation = location.pathname.split("/").pop() || "index.html"
  const menuItems = document.querySelectorAll(".nav-link")

  menuItems.forEach((item) => {
    const href = item.getAttribute("href")
    if (href === currentLocation || (currentLocation === "" && href === "index.html")) {
      item.style.color = "var(--primary-color)"
    }
  })
}

// ==========================================
// 6. AUTOMATIC SECTION SCROLLING (ROLLS-ROYCE STYLE)
// ==========================================

/**
 * Automatic section scrolling with user interaction detection
 * Inspired by Rolls-Royce website - auto-scrolls through sections,
 * pauses on user interaction, and resumes after inactivity
 */
function initAutoScroll() {
  // Enable on all pages with hero sections
  const heroSections = [
    '.hero',            // Index page hero
    '.projects-hero',
    '.education-hero',
    '.certificates-hero',
    '.contact-hero'
  ];

  // Check if page has a hero section
  const hasHero = heroSections.some(selector => document.querySelector(selector));
  if (!hasHero) return;

  let autoScrollInterval = null;
  let userInteracting = false;
  let resumeTimeout = null;
  let currentSectionIndex = 0;
  let hasCompletedCycle = false; // Track if auto-scroll has completed one cycle

  // Get all major sections dynamically
  const sections = Array.from(document.querySelectorAll('section')).filter(section => {
    // Only include sections that are direct page sections (hero, main content areas)
    return section.classList.contains('hero') ||              // Index page
      section.classList.contains('about') ||                  // Index page
      section.classList.contains('projects-hero') ||
      section.classList.contains('education-hero') ||
      section.classList.contains('certificates-hero') ||
      section.classList.contains('contact-hero') ||
      section.classList.contains('major-projects-section') ||
      section.classList.contains('minor-projects-section') ||
      section.classList.contains('education-section') ||
      section.classList.contains('skills-section') ||
      section.classList.contains('certificates-section') ||
      section.classList.contains('contact-section');
  });

  if (sections.length === 0) return;

  /**
   * Scroll to a specific section smoothly
   */
  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      currentSectionIndex = index;
    }
  }

  /**
   * Auto-scroll to next section - ONE TIME ONLY
   */
  function autoScrollNext() {
    if (!userInteracting && !hasCompletedCycle) {
      const nextIndex = currentSectionIndex + 1;

      // If we've reached the last section
      if (nextIndex >= sections.length) {
        // Scroll back to top (first section)
        scrollToSection(0);

        // Stop auto-scroll permanently after returning to top
        setTimeout(() => {
          stopAutoScroll();
          hasCompletedCycle = true;
          console.log('Auto-scroll completed one cycle and stopped');
        }, 6000); // Wait 6 seconds on last section before going to top
      } else {
        // Continue to next section
        scrollToSection(nextIndex);
      }
    }
  }

  /**
   * Start auto-scrolling - ONLY IF NOT COMPLETED
   */
  function startAutoScroll() {
    if (autoScrollInterval || hasCompletedCycle) return; // Already running or completed

    autoScrollInterval = setInterval(() => {
      autoScrollNext();
    }, 5000); // Scroll every 5 seconds

    console.log('Auto-scroll started (one-time only)');
  }

  /**
   * Stop auto-scrolling
   */
  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
      console.log('Auto-scroll stopped');
    }
  }

  /**
   * Pause auto-scroll on user interaction
   */
  function handleUserInteraction() {
    userInteracting = true;
    stopAutoScroll();
    hasCompletedCycle = true; // Disable auto-scroll permanently on user interaction

    console.log('User interacted - auto-scroll disabled permanently');
  }

  /**
   * Update current section based on scroll position
   */
  function updateCurrentSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionIndex = index;
      }
    });
  }

  // Event listeners for user interaction
  const interactionEvents = [
    'wheel',        // Mouse wheel
    'touchstart',   // Touch on mobile
    'touchmove',    // Touch drag
    'mousedown',    // Mouse click
    'keydown'       // Keyboard
  ];

  interactionEvents.forEach(eventType => {
    window.addEventListener(eventType, handleUserInteraction, { passive: true });
  });

  // Update current section on scroll
  window.addEventListener('scroll', () => {
    updateCurrentSection();
  }, { passive: true });

  // Start auto-scroll after 2 seconds (give user time to see hero)
  setTimeout(() => {
    if (!hasCompletedCycle) {
      startAutoScroll();
    }
  }, 2000);

  // Pause auto-scroll when page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoScroll();
    }
  });
}

// ==========================================
// 7. SCROLL PROGRESS BAR & NAVIGATION DOTS (ROLLS-ROYCE STYLE)
// ==========================================

/**
 * Initialize scroll progress bar that fills as user scrolls down page
 */
function initScrollProgressBar() {
  // Only enable on projects page
  if (!window.location.pathname.includes('projects.html')) {
    return;
  }

  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  function updateProgressBar() {
    // Calculate scroll percentage
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    // Calculate how far user has scrolled (0-100%)
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

    // Update progress bar width
    progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
  }

  // Update on scroll
  window.addEventListener('scroll', updateProgressBar, { passive: true });

  // Initial update
  updateProgressBar();
}

/**
 * Initialize section navigation dots with active state tracking and click navigation
 * OPTIMIZED - Removed expensive fade animations, improved scroll performance
 */
function initSectionNavigationDots() {
  // Enable on all pages with navigation dots
  const dots = document.querySelectorAll('.nav-dot');
  if (dots.length === 0) return;

  // Get all major sections dynamically
  const sections = Array.from(document.querySelectorAll('section')).filter(section => {
    return section.classList.contains('hero') ||                 // Index page
      section.classList.contains('about') ||                     // Index page
      section.classList.contains('projects-hero') ||
      section.classList.contains('education-hero') ||
      section.classList.contains('certificates-hero') ||
      section.classList.contains('contact-hero') ||
      section.classList.contains('major-projects-section') ||
      section.classList.contains('minor-projects-section') ||
      section.classList.contains('education-section') ||
      section.classList.contains('skills-section') ||
      section.classList.contains('certificates-section') ||
      section.classList.contains('contact-section');
  });

  if (sections.length === 0) return;

  // Track current active section
  let currentActiveIndex = 0;
  let isTransitioning = false;

  /**
   * Update active dot based on current section in view
   * OPTIMIZED - Removed fade animations for better performance
   */
  function updateActiveDot() {
    if (isTransitioning) return;

    const scrollPosition = window.scrollY + window.innerHeight / 2;

    let activeIndex = 0;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeIndex = index;
      }
    });

    // Only update if changed
    if (activeIndex !== currentActiveIndex) {
      currentActiveIndex = activeIndex;
    }

    // Update dot active states
    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  /**
   * Navigate to section when dot is clicked
   */
  function navigateToSection(index) {
    if (index >= 0 && index < sections.length && !isTransitioning) {
      isTransitioning = true;

      // Smooth scroll to target section
      sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      setTimeout(() => {
        isTransitioning = false;
      }, 400);

      currentActiveIndex = index;
    }
  }

  // Add click handlers to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      navigateToSection(index);
    });
  });

  // Intersection Observer for smoother section detection - OPTIMIZED
  const observerOptions = {
    root: null,
    threshold: 0.5,
    rootMargin: '-10% 0px -10% 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const sectionIndex = sections.indexOf(entry.target);

        // Update active dot
        dots.forEach((dot, index) => {
          if (index === sectionIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });

        currentActiveIndex = sectionIndex;
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Update active dot on scroll (fallback) - OPTIMIZED with better debouncing
  let scrollTimeout;
  let rafId = null;
  window.addEventListener('scroll', () => {
    // Cancel pending animation frame
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      rafId = requestAnimationFrame(updateActiveDot);
    }, 150); // Increased debounce for better performance
  }, { passive: true }); // Added passive flag

  // Initial update
  updateActiveDot();
}

// ==========================================
// 9. CERTIFICATE TABS FUNCTIONALITY
// ==========================================

/**
 * Initialize certificate tabs switching
 * Handles tab navigation for Participation, Courses, and Achievements
 */
function initCertificateTabs() {
  const tabButtons = document.querySelectorAll('.certificates-tabs .tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabButtons.length === 0 || tabContents.length === 0) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));

      // Remove active class from all tab contents
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Show corresponding tab content
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}


// ==========================================
// 8. INITIALIZATION
// ==========================================

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing portfolio...")

  initPageTransitions()
  initHamburgerMenu()
  initContactForm()
  initScrollAnimations()
  initSmoothScroll()
  initActiveNavLink()
  initAutoScroll() // Auto-scroll for projects page
  initScrollProgressBar() // Rolls-Royce style progress bar
  initSectionNavigationDots() // Rolls-Royce style navigation dots
  initCertificateTabs() // Certificate tabs switching

  console.log("Portfolio initialized successfully!")
})


// ==========================================
// 7. UTILITY FUNCTIONS
// ==========================================

/**
 * Smooth scroll to top function
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

/**
 * Log page view (useful for analytics)
 * @param {string} pageName - Name of the page
 */
function logPageView(pageName) {
  console.log(`Page viewed: ${pageName}`)
}
