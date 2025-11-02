// Language Management
const langData = {
    ko: {
        'nav-home': '홈',
        'nav-about': '소개',
        'nav-products': '제품',
        'nav-contact': '연락처'
    },
    en: {
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-products': 'Products',
        'nav-contact': 'Contact'
    }
};

let currentLang = localStorage.getItem('preferred-lang') || 'en';

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferred-lang', lang);
    
    // Update all elements with data-ko and data-en attributes
    document.querySelectorAll('[data-ko][data-en]').forEach(element => {
        const text = lang === 'ko' ? element.getAttribute('data-ko') : element.getAttribute('data-en');
        element.textContent = text;
    });
    
    // Update navigation menu items
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (langData[lang] && langData[lang][key]) {
            element.textContent = langData[lang][key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Language button event listeners
document.getElementById('langKo').addEventListener('click', () => updateLanguage('ko'));
document.getElementById('langEn').addEventListener('click', () => updateLanguage('en'));

// Initialize language on page load
updateLanguage(currentLang);

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

