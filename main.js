/**
 * Wassim Swaileh - Personal Website
 * Common JavaScript functionality
 */

// Theme Management
const ThemeManager = {
    init() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;
        
        if (!themeToggle) return;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        this.updateIcon(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateIcon(newTheme);
        });
    },
    
    updateIcon(theme) {
        const themeIcon = document.getElementById('themeIcon');
        if (!themeIcon) return;
        
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
};

// Scroll to Top
const ScrollManager = {
    init() {
        const scrollTopBtn = document.getElementById('scrollTop');
        if (!scrollTopBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

// Intersection Observer for Animations
const AnimationManager = {
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
};

// Navbar Scroll Effect
const NavbarManager = {
    init() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }
        });
    }
};

// Smooth Scroll for Anchor Links
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// Active Navigation Link
const ActiveNavManager = {
    init() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};

// Publications Filter (if applicable)
const PublicationsFilter = {
    init() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const publications = document.querySelectorAll('.publication-item');
        
        if (!filterBtns.length) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                publications.forEach(pub => {
                    if (filter === 'all' || pub.dataset.category === filter) {
                        pub.style.display = 'block';
                        setTimeout(() => pub.classList.add('animate-fadeIn'), 10);
                    } else {
                        pub.style.display = 'none';
                        pub.classList.remove('animate-fadeIn');
                    }
                });
            });
        });
    }
};

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    ScrollManager.init();
    AnimationManager.init();
    NavbarManager.init();
    SmoothScroll.init();
    ActiveNavManager.init();
    PublicationsFilter.init();
});

// Export modules for potential external use
window.WSApp = {
    ThemeManager,
    ScrollManager,
    AnimationManager,
    NavbarManager,
    SmoothScroll,
    ActiveNavManager,
    PublicationsFilter
};
