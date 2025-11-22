// Select Elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li a");

// Toggle Menu on Hamburger Click
hamburger.addEventListener("click", () => {
    // Toggle the active class on the list and the icon
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// Close Menu when a link is clicked
links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

// Sticky Navbar Effect (Optional but looks good)
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 0);
});
