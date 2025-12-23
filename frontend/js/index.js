/* 
  ==========================================
  INDEX PAGE - SPECIFIC JAVASCRIPT
  ==========================================
  Particles.js, Typed.js, and AOS initialization for homepage
*/

// ==========================================
// 1. PARTICLES.JS BACKGROUND INITIALIZATION
// ==========================================

/**
 * Initialize Particles.js with custom configuration
 * Creates animated particle background for hero section
 */
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: ['#d4a574', '#ef4444', '#f6e05e'] },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
                size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#d4a574',
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}

// ==========================================
// 2. TYPED.JS TYPING EFFECT INITIALIZATION
// ==========================================

/**
 * Initialize Typed.js for hero section typing animation
 * Creates typewriter effect for taglines
 */
function initTypedEffect() {
    if (typeof Typed !== 'undefined' && document.getElementById('typed')) {
        new Typed('#typed', {
            strings: [
                'B.Tech ICT Student 🎓',
                'Problem Solver 🧩',
                'Concept or Logic Focused 🧠',
                'Continuous Learner 📖'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }
}

// ==========================================
// 3. AOS (ANIMATE ON SCROLL) INITIALIZATION
// ==========================================

/**
 * Initialize AOS scroll animations with custom settings
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }
}

// ==========================================
// 4. INITIALIZATION ON DOM READY
// ==========================================

/**
 * Initialize all homepage-specific features when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing homepage features...');

    initParticles();
    initTypedEffect();
    initAOS();

    console.log('Homepage features initialized successfully!');
});
