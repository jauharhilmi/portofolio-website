
/* =========================
   LOADER
========================= */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 700);
});

/* =========================
   TYPING ANIMATION
========================= */
const typingText = document.getElementById("typingText");

const words = [
    "Web Developer.",
    "RPL Student.",
    "Tech Enthusiast.",
    "Future Backend Developer.",
    "Learning Networking."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1600);
            return;
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();

/* =========================
   MOBILE NAVIGATION
========================= */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");

        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
    });
});

/* =========================
   THEME TOGGLE
========================= */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    themeToggle.innerHTML = isLight
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
});

/* =========================
   SCROLL PROGRESS
========================= */
const scrollProgress = document.getElementById("scrollProgress");

function updateScroll() {
    const scrollTop = window.scrollY;
    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    scrollProgress.style.width = progress + "%";
}

window.addEventListener("scroll", updateScroll);

/* =========================
   BACK TO TOP
========================= */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* =========================
   REVEAL ANIMATION
========================= */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});

/* =========================
   ACTIVE NAV LINK
========================= */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* =========================
   PROJECT FILTER
========================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(card => {
            const category = card.dataset.category;

            if (filter === "all" || category === filter) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        });
    });
});

/* =========================
   INTERACTIVE TERMINAL
========================= */
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

const commands = {
    help: `
AVAILABLE COMMANDS:

help       - Show available commands
about      - About me
skills     - My skills
projects   - My projects
learning   - Current learning topics
contact    - Contact information
clear      - Clear terminal
whoami     - Display identity
`,

    about: `
NAME     : M. Jauhar Hilmi
ROLE     : RPL Student
SCHOOL   : MAN 3 Tulungagung
INTEREST : Web Development & IT Infrastructure

Saya tertarik dengan pengembangan website,
server, backend, database dan jaringan.
`,

    skills: `
FRONTEND:
- HTML5
- CSS3
- JavaScript

TOOLS:
- Visual Studio Code
- Git / GitHub (Learning)

EXPLORING:
- Backend
- Database
- Web Server
- Networking
`,

    projects: `
PROJECTS:

[01] Student Attendance System
[02] Smartphone Store Website
[03] School Profile Website
[04] Web Infrastructure Exploration

Use the Projects section to explore more.
`,

    learning: `
CURRENT LEARNING:

- Backend Development
- HTTP & API
- Database & SQL
- Web Server
- Networking
- Internet Infrastructure
- Cybersecurity Basics
`,

    contact: `
CONTACT:

Email     : EMAIL_KAMU
GitHub    : github.com/USERNAME_KAMU
Instagram : instagram.com/USERNAME_KAMU

Replace these placeholders with your actual accounts.
`,

    whoami: `
M. Jauhar Hilmi
Software Development Student
Learning. Building. Exploring.
`,

    clear: "CLEAR"
};

function runCommand(command) {
    const cmd = command.trim().toLowerCase();

    if (!cmd) return;

    // Perintah clear
    if (cmd === "clear") {
        terminalOutput.innerHTML = "";
        return;
    }

    // Output perintah
    const result = commands[cmd] || `
Command not found: ${cmd}

Type "help" to see available commands.
`;

    // Input pengguna
    const inputLine = document.createElement("div");
    inputLine.style.color = "#00e5a0";
    inputLine.textContent = "jauhar@portfolio:~$ " + cmd;

    // Hasil
    const outputLine = document.createElement("div");
    outputLine.style.color = "#cbd5e1";
    outputLine.style.whiteSpace = "pre-wrap";
    outputLine.style.marginBottom = "15px";
    outputLine.textContent = result;

    terminalOutput.appendChild(inputLine);
    terminalOutput.appendChild(outputLine);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        const command = terminalInput.value;

        runCommand(command);

        terminalInput.value = "";
    }
});

/* Command chips */
document.querySelectorAll(".command-chip").forEach(button => {
    button.addEventListener("click", () => {
        runCommand(button.dataset.command);
        terminalInput.focus();
    });
});

/* =========================
   CONTACT FORM
========================= */
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const destination = "EMAIL_KAMU";

    const subject = encodeURIComponent(
        "Portfolio Contact - " + name
    );

    const body = encodeURIComponent(
        "Nama: " + name +
        "\nEmail: " + email +
        "\n\nPesan:\n" + message
    );

    window.location.href =
        "mailto:" + destination +
        "?subject=" + subject +
        "&body=" + body;
});

/* =========================
   FOOTER YEAR
========================= */
document.getElementById("year").textContent =
    new Date().getFullYear();
