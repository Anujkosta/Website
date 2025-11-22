// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default for internal anchor links (not login/contact buttons without ID)
        if (this.getAttribute('href').length > 1) { 
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Header scroll effect (optional, removed as it was mostly handled by CSS sticky + shadow)
// However, the original code had this logic, so I'll include the scroll shadow logic:
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            // Apply a stronger shadow when scrolling down
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        }
    });
}


// Stat Numbers Animation
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-item h3');
    
    stats.forEach(stat => {
        // Reset the text content to the target value before animation to ensure it's displayed correctly if JS fails
        const targetText = stat.textContent;
        const target = parseInt(targetText);
        let current = 0;
        const increment = target / 50;
        // Extracts any non-digit characters (like '+' or '%') to append later
        const suffix = targetText.match(/[^\d]/g)?.join('') || ''; 
        
        stat.textContent = '0' + suffix; // Start at 0 for the animation

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
};

// Trigger stat animation when section is in view using Intersection Observer
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target); // Stop observing after animation runs once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    observer.observe(statsSection);
}
