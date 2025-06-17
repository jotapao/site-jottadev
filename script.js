 // Initialize AOS
        AOS.init({ duration: 800, once: true, offset: 50 });

        // Initialize Lucide Icons
        lucide.createIcons();

        // Mobile Menu
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        document.querySelectorAll('.nav-link-mobile').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });

        // Dynamic Year
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Header Style on Scroll
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            header.classList.toggle('shadow-lg', window.scrollY > 50);
        });

        // Active Nav Link Highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a.nav-link');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 85) current = section.getAttribute('id');
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) link.classList.add('active');
            });
        });

        // Portfolio Filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => {
                    btn.classList.remove('active-filter', 'bg-[#00FF7F]', 'text-black');
                    btn.classList.add('bg-gray-700', 'text-white');
                });
                button.classList.add('active-filter', 'bg-[#00FF7F]', 'text-black');
                button.classList.remove('bg-gray-700', 'text-white');
                const filter = button.dataset.filter;
                portfolioItems.forEach(item => {
                    item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none';
                });
            });
        });

        // Project Modal
        const projectItems = document.querySelectorAll('.portfolio-item');
        const modal = document.getElementById('project-modal');
        const modalContent = document.getElementById('modal-content');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const projectData = {
            "Site Institucional": {img: "...", category: "Site Institucional", description: "...", tech: "...", results: "..."},
            "Sistema de Gestão": {img: "...", category: "Sistema Web", description: "...", tech: "...", results: "..."},
            "LP de Lançamento": {img: "...", category: "Landing Page", description: "...", tech: "...", results: "..."}
        };
        projectItems.forEach(item => {
            item.addEventListener('click', () => { /* ... (modal logic is unchanged) ... */ });
        });
        const closeModal = () => { /* ... (modal logic is unchanged) ... */ };
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


        // Typing effect
        const typingH1 = document.getElementById('typing-h1');
        const typingP = document.getElementById('typing-p');
        const cursor = document.querySelector('.typing-cursor');
        const h1Text = "Transformamos negócios com <span class='text-[#00FF7F]'>soluções digitais</span> inteligentes.";
        const pText = "Da estratégia à execução, criamos sites, sistemas e campanhas de tráfego pago que geram resultados reais para sua empresa.";
        const typeSpeed = 40;
        const pDelay = 500;

        function typeWriter(element, text, speed, index = 0, callback) {
            if (index < text.length) {
                element.innerHTML = text.substring(0, index + 1);
                setTimeout(() => typeWriter(element, text, speed, index + 1, callback), speed);
            } else if (callback) {
                callback();
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
             setTimeout(() => {
                typeWriter(typingH1, h1Text, typeSpeed, 0, () => {
                    setTimeout(() => {
                        cursor.style.display = 'none';
                        typeWriter(typingP, pText, typeSpeed, 0, null);
                    }, pDelay);
                });
            }, 500);
        });


        // Plexus background effect
        const canvas = document.getElementById('hero-canvas');
        const ctx = canvas.getContext('2d');
        let particlesArray;

        function setupCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        setupCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = '#00FF7F';
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
                this.x += this.speedX;
                this.y += this.speedY;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 12000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
                    if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                        opacityValue = 1 - (distance / 25000);
                        ctx.strokeStyle = `rgba(0, 255, 127, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            connect();
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            setupCanvas();
            init();
        });

        init();
        animate();