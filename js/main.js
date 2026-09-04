// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 600);
});

// ===== MATRIX RAIN EFFECT =====
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, columns, drops;

    function resizeMatrix() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / 14);
        drops = Array(columns).fill(1);
    }
    resizeMatrix();

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]|&^%$#@!';

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = '14px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * 14;
            const y = drops[i] * 14;
            ctx.fillStyle = Math.random() > 0.98 ? '#00ff41' : '#00cc33';
            ctx.fillText(text, x, y);
            if (y > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);
    window.addEventListener('resize', resizeMatrix);
}

// ===== TYPING EFFECT (only on home page) =====
const typedTextEl = document.getElementById('typedText');
if (typedTextEl) {
    const words = ['an ethical hacker', 'a penetration tester', 'a security researcher', 'a bug hunter'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 2500);
}

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open', navLinks.classList.contains('active'));
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            if (window.matchMedia('(max-width: 768px)').matches) {
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Scroll effect
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Active link on scroll (only for single-page sections)
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
if (sections.length > 0 && navAnchors.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursorDot.style.left = e.clientX - 2 + 'px';
        cursorDot.style.top = e.clientY - 2 + 'px';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    });

    // Hover effect on links
    document.querySelectorAll('a, button, .btn, .skill-tag, .cert-badge').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#C778DD';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#00ff41';
        });
    });
}

console.log('%c[SYSTEM] Portfolio initialized successfully', 'color: #00ff41; font-size: 14px; font-weight: bold;');
console.log('%c[SYSTEM] Welcome, visitor. Access granted.', 'color: #C778DD; font-size: 12px;');