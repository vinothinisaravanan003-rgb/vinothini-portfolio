// ===================================
// 1. MOBILE NAVIGATION
// ===================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});


// ===================================
// 2. TYPING ANIMATION
// ===================================

const typingText = document.getElementById("typingText");

const words = [
    "Software Developer",
    "Full Stack Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent =
        currentWord.substring(0, charIndex);

    let speed = deleting ? 60 : 100;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        speed = 1200;
    }

    else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// ===================================
// 3. EMAILJS CONFIGURATION
// ===================================

// Replace these with your actual EmailJS values

const PUBLIC_KEY = "9taTF9vooOxMTS8Xm";
const SERVICE_ID = "service_vcxx2gh";
const TEMPLATE_ID = "template_5tps3zv";

emailjs.init({
    publicKey: PUBLIC_KEY
});


// ===================================
// 4. CONTACT FORM
// ===================================

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");

const sendBtn = document.getElementById("sendBtn");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (
        !PUBLIC_KEY|| !SERVICE_ID || !TEMPLATE_ID
    ) {
        formStatus.textContent =
            "Please configure EmailJS first.";

        return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";

    formStatus.textContent = "";

    emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        contactForm
    )

    .then(function (response) {

        console.log("SUCCESS!", response.status);

        formStatus.textContent =
            "Message sent successfully! Thank you.";

        formStatus.style.color = "#a3ff12";

        contactForm.reset();

    })

    .catch(function (error) {

        console.error("EmailJS Error:", error);

        formStatus.textContent =
            "Message sending failed. " +
            (error.text || "Please try again.");

        formStatus.style.color = "#ff5555";

    })

    .finally(function () {

        sendBtn.disabled = false;
        sendBtn.textContent = "Send Message →";

    });

});