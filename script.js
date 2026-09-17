document.addEventListener('DOMContentLoaded', function() {
    // Theme switcher
    const toggleSwitch = document.querySelector('#theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (toggleSwitch && currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme, false);
    }

    // Header scroll effect
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinksItems.forEach(function(item) {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(function(card) {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Animate skill bars on scroll
    var skillLevels = document.querySelectorAll('.skill-level');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var width = entry.target.getAttribute('data-width') || entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(function() {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    skillLevels.forEach(function(skill) {
        observer.observe(skill);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                var headerHeight = header ? header.offsetHeight : 0;
                var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Contact form handling
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var subject = document.getElementById('subject').value.trim();
            var message = document.getElementById('message').value.trim();
            var formMessages = document.getElementById('form-messages');

            if (!name || !email || !subject || !message) {
                if (formMessages) {
                    formMessages.textContent = 'Please fill in all fields.';
                    formMessages.className = 'form-message form-error';
                }
                return;
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (formMessages) {
                    formMessages.textContent = 'Please enter a valid email address.';
                    formMessages.className = 'form-message form-error';
                }
                return;
            }

            if (formMessages) {
                formMessages.textContent = 'Thank you for your message! I will get back to you soon.';
                formMessages.className = 'form-message form-success';
            }
            contactForm.reset();

            setTimeout(function() {
                if (formMessages) {
                    formMessages.textContent = '';
                    formMessages.className = 'form-message';
                }
            }, 5000);
        });
    }

    // Typing effect for hero section
    var typingElement = document.querySelector('.hero-content h1 .highlight');
    if (typingElement) {
        var text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.borderRight = '2px solid var(--primary-color)';
        var i = 0;
        var typingInterval = setInterval(function() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                setInterval(function() {
                    typingElement.style.borderRight =
                        typingElement.style.borderRight === 'none' ? '2px solid var(--primary-color)' : 'none';
                }, 530);
            }
        }, 100);
    }
});
