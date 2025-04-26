// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initThemeToggle();
    initVisitorCounter();
    initHamburgerMenu();
    initScrollToSections();
    initStickyHeader();
    initProgressBar();
    initTypingAnimation();
    initSkillBars();
    initSkillTabs();
    initRadarChart();
    initCube();
    initFlipCards();
    initSectionReveal();
    initLazyLoading();
    initDayTimeline();
    initContactForm();
});

// Theme Toggle
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeSwitch.checked = true;
    }
}

// Visitor Counter with animation
function initVisitorCounter() {
    let count = localStorage.getItem('visitCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitCount', count);
    
    const counter = document.getElementById('visitorCount');
    
    // Animate counting up
    let currentCount = 0;
    const interval = setInterval(() => {
        currentCount++;
        counter.textContent = currentCount;
        if (currentCount >= count) {
            clearInterval(interval);
        }
    }, 100);
}

// Hamburger Menu for Mobile
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger-icon');
    const nav = document.getElementById('main-nav');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('open');
        nav.classList.toggle('open');
    });
}

// Smooth Scroll to Sections
function initScrollToSections() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const hamburger = document.getElementById('hamburger-icon');
            const nav = document.getElementById('main-nav');
            hamburger.classList.remove('open');
            nav.classList.remove('open');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Sticky Header and Scroll-activated Navigation
function initStickyHeader() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Sticky header effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight current section in navigation
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Progress Bar
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const fullHeight = document.body.clientHeight;
        const scrolled = window.scrollY;
        
        const percentScrolled = (scrolled / (fullHeight - windowHeight)) * 100;
        progressBar.style.width = `${percentScrolled}%`;
    });
}

// Typing Animation
function initTypingAnimation() {
    const textElement = document.getElementById('typing-text');
    const text = "I'm a passionate CS student specializing in AI/ML. I love coding, designing, and solving complex problems.";
    const introText = document.querySelector('.intro-text');
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < text.length) {
            textElement.innerHTML = text.substring(0, charIndex + 1) + '<span class="typing-cursor">|</span>';
            charIndex++;
            setTimeout(typeWriter, 50);
        } else {
            // Remove cursor when typing is done
            textElement.innerHTML = text;
            // Show the rest of the intro text
            setTimeout(() => {
                introText.classList.remove('hidden');
                introText.style.animation = 'fadeIn 1s ease';
            }, 500);
        }
    }
    
    typeWriter();
}

// Animated Skill Bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth;
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Skill Tabs
function initSkillTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.skill-tab');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Hide all tabs
            tabContents.forEach(tab => tab.classList.remove('active'));
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Show selected tab
            document.getElementById(tabId).classList.add('active');
            button.classList.add('active');
        });
    });
}

// Radar Chart for Skills
function initRadarChart() {
    const ctx = document.getElementById('skillsRadarChart').getContext('2d');
    
    const data = {
        labels: ['Java', 'Python', 'C++', 'HTML/CSS', 'JavaScript', 'Machine Learning'],
        datasets: [{
            label: 'Skills Proficiency',
            data: [85, 90, 75, 80, 65, 70],
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: 'rgba(52, 152, 219, 1)',
            pointBackgroundColor: 'rgba(52, 152, 219, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
        }]
    };
    
    const config = {
        type: 'radar',
        data: data,
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };
    
    const radarChart = new Chart(ctx, config);
}

// 3D Rotating Cube
function initCube() {
    const cube = document.getElementById('skills-cube');
    const controls = {
        rotateLeft: document.getElementById('rotate-left'),
        rotateRight: document.getElementById('rotate-right'),
        rotateUp: document.getElementById('rotate-up'),
        rotateDown: document.getElementById('rotate-down')
    };
    
    let rotateX = -20;
    let rotateY = -20;
    
    function updateCube() {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    
    controls.rotateLeft.addEventListener('click', () => {
        rotateY -= 90;
        updateCube();
    });
    
    controls.rotateRight.addEventListener('click', () => {
        rotateY += 90;
        updateCube();
    });
    
    controls.rotateUp.addEventListener('click', () => {
        rotateX -= 90;
        updateCube();
    });
    
    controls.rotateDown.addEventListener('click', () => {
        rotateX += 90;
        updateCube();
    });
    
    // Mouse drag rotation for cube
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    cube.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - previousMousePosition.x;
            const dy = e.clientY - previousMousePosition.y;
            
            rotateY += dx * 0.5;
            rotateX -= dy * 0.5;
            
            updateCube();
            
            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    document.addEventListener('mouseleave', () => {
        isDragging = false;
    });
    
    // Initial rotation
    updateCube();
}

// Flip Cards Animation
function initFlipCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// Section Reveal Animation
function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Lazy Loading Images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Daily Timeline Animation
// Daily Timeline Animation
function initDayTimeline() {
    const timelineItems = document.querySelectorAll('.day-timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submit-button');
    const formStatus = document.getElementById('form-status');
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Real-time validation
    emailInput.addEventListener('blur', () => {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
            emailInput.classList.add('error');
            emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
        } else {
            emailInput.classList.remove('error');
            emailInput.nextElementSibling.textContent = '';
        }
    });
    
    // Submit form
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Validate name
        if (!nameInput.value.trim()) {
            nameInput.classList.add('error');
            nameInput.nextElementSibling.textContent = 'Name is required';
            isValid = false;
        } else {
            nameInput.classList.remove('error');
            nameInput.nextElementSibling.textContent = '';
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            emailInput.classList.add('error');
            emailInput.nextElementSibling.textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            emailInput.classList.add('error');
            emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailInput.classList.remove('error');
            emailInput.nextElementSibling.textContent = '';
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            messageInput.classList.add('error');
            messageInput.nextElementSibling.textContent = 'Message is required';
            isValid = false;
        } else {
            messageInput.classList.remove('error');
            messageInput.nextElementSibling.textContent = '';
        }
        
        if (isValid) {
            // Disable submit button to prevent multiple submissions
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission (replace with actual AJAX request)
            setTimeout(() => {
                formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                formStatus.classList.add('success');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.classList.remove('success');
                }, 5000);
            }, 1500);
        }
    });
}