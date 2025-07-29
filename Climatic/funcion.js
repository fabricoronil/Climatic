// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace (móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Remover clase active de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
        });
    });

    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Efecto de scroll suave para los enlaces del menú
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 70px por la altura del navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cambiar el enlace activo basado en el scroll
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY + 100;
        
        // Solo verificar la sección de inicio por ahora
        const inicioSection = document.querySelector('#inicio');
        if (inicioSection) {
            const inicioTop = inicioSection.offsetTop;
            const inicioBottom = inicioTop + inicioSection.offsetHeight;
            
            if (scrollPosition >= inicioTop && scrollPosition < inicioBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                document.querySelector('a[href="#inicio"]').classList.add('active');
            }
        }
    });

    // Animación de aparición de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos que queremos animar
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(feature);
    });

    // Efecto de partículas de nieve (simulando frío)
    function createSnowflakes() {
        const snowContainer = document.createElement('div');
        snowContainer.className = 'snow-container';
        snowContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(snowContainer);

        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.innerHTML = '❄';
            snowflake.style.cssText = `
                position: absolute;
                top: -10px;
                color: rgba(173, 216, 230, 0.6);
                font-size: ${Math.random() * 10 + 10}px;
                left: ${Math.random() * 100}%;
                animation: fall ${Math.random() * 3 + 2}s linear infinite;
                pointer-events: none;
            `;
            
            snowContainer.appendChild(snowflake);
            
            setTimeout(() => {
                if (snowflake.parentNode) {
                    snowflake.parentNode.removeChild(snowflake);
                }
            }, 5000);
        }

        // Crear copos de nieve periódicamente
        setInterval(createSnowflake, 300);
    }

    // Agregar CSS para la animación de caída
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            from {
                transform: translateY(-100px) rotate(0deg);
                opacity: 1;
            }
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Inicializar efecto de nieve
    createSnowflakes();

    // Efecto de hover mejorado para el botón CTA
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Aquí puedes agregar la funcionalidad para solicitar cotización
            alert('¡Gracias por tu interés! Nos contactaremos contigo pronto para tu cotización de aire acondicionado.');
        });

        // Efecto de ondas al hacer click
        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    }

    // Agregar animación de ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Efecto de paralaje sutil en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
});