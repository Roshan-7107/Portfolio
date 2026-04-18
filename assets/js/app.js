document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       Mobile Menu Toggle
       ========================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.replace('bx-menu', 'bx-x');
        } else {
            menuIcon.classList.replace('bx-x', 'bx-menu');
        }
    });

    // Close menu when a link is clicked
    const links = document.querySelectorAll('.nav-links li a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.replace('bx-x', 'bx-menu');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuIcon.classList.replace('bx-x', 'bx-menu');
        }
    });

    // Close menu on scroll
    window.addEventListener('scroll', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuIcon.classList.replace('bx-x', 'bx-menu');
        }
    });

    /* ==========================================
       Intersection Observer for Fade-In Effects
       ========================================== */
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* ==========================================
       Active Link Highlighting on Scroll
       ========================================== */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').substring(1) === current) {
                li.classList.add('active');
            }
        });
    });

    /* ==========================================
       Simple Typewriter Effect Initialization
       (CSS handles the cursor blinking, here we could add text cycling,
        but for a single string, CSS is enough. Let's make it robust.)
       ========================================== */
    const typewriterElement = document.querySelector('.typewriter');
    // If you ever want multiple strings to rotate, logic goes here.
    
    /* ==========================================
       Navbar Glass Blur on Scroll
       ========================================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.boxShadow = 'var(--glass-shadow)';
        }
    });
    /* ==========================================
       Scroll Progress Bar
       ========================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight * 100}%`;
        if(scrollProgress) scrollProgress.style.width = scroll;
    });

    /* ==========================================
       Cursor Spotlight
       ========================================== */
    const spotlight = document.getElementById('cursor-spotlight');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let spotlightX = mouseX;
    let spotlightY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateSpotlight() {
        if(spotlight) {
            // Smooth interpolation
            spotlightX += (mouseX - spotlightX) * 0.1;
            spotlightY += (mouseY - spotlightY) * 0.1;
            
            spotlight.style.left = `${spotlightX}px`;
            spotlight.style.top = `${spotlightY}px`;
        }
        requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();

    /* ==========================================
       3D Card Tilt Effect
       ========================================== */
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // Disable tilt on small screens for performance
            if (window.innerWidth <= 768) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
            const tiltY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none'; // remove transition for smooth tracking
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease'; // restore transition for smooth reset
        });
    });

    /* ==========================================
       Particle System Background
       ========================================== */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 70; // Adjust for density
        const connectDistance = 140; // distance at which particles connect

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction - Magnetic Repel
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const repelRadius = 160;
                
                if (distance < repelRadius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    // Strong force curve
                    const force = (repelRadius - distance) / repelRadius;
                    
                    // Instant physical push away from mouse
                    this.x -= forceDirectionX * force * 5;
                    this.y -= forceDirectionY * force * 5;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Active connection to mouse node
                const mDx = mouseX - particles[i].x;
                const mDy = mouseY - particles[i].y;
                const mDistance = Math.sqrt(mDx * mDx + mDy * mDy);

                if (mDistance < 220) {
                    ctx.beginPath();
                    // Purple interaction glow
                    ctx.strokeStyle = `rgba(112, 0, 255, ${0.5 * (1 - mDistance / 220)})`;
                    ctx.lineWidth = 1.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                }

                // Connect particles to each other network
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < connectDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - distance / connectDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }

        resizeCanvas();
        animateParticles();
    }
});
