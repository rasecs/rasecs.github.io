// ========================================
// NAVEGACIÓN MÓVIL
// ========================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menú móvil
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ========================================
// HEADER STICKY CON SCROLL
// ========================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Añadir clase cuando hay scroll
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// CALCULADORA DE PRÉSTAMOS
// ========================================
const amountInput = document.getElementById('amount');
const termInput = document.getElementById('term');
const rateInput = document.getElementById('rate');
const calculateBtn = document.getElementById('calculate-btn');

const amountValue = document.getElementById('amount-value');
const termValue = document.getElementById('term-value');
const rateValue = document.getElementById('rate-value');

const monthlyPaymentEl = document.getElementById('monthly-payment');
const totalPaymentEl = document.getElementById('total-payment');
const totalInterestEl = document.getElementById('total-interest');

// Actualizar valores mostrados cuando se mueven los sliders
amountInput.addEventListener('input', () => {
    amountValue.textContent = Number(amountInput.value).toLocaleString('es-MX');
});

termInput.addEventListener('input', () => {
    termValue.textContent = termInput.value;
});

rateInput.addEventListener('input', () => {
    rateValue.textContent = rateInput.value;
});

// Función para calcular el préstamo
function calculateLoan() {
    const principal = parseFloat(amountInput.value);
    const months = parseFloat(termInput.value);
    const monthlyRate = parseFloat(rateInput.value) / 100;
    
    // Fórmula del pago mensual
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const x = Math.pow(1 + monthlyRate, months);
    const monthlyPayment = (principal * monthlyRate * x) / (x - 1);
    
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;
    
    // Mostrar resultados con animación
    animateValue(monthlyPaymentEl, 0, monthlyPayment, 1000);
    animateValue(totalPaymentEl, 0, totalPayment, 1000);
    animateValue(totalInterestEl, 0, totalInterest, 1000);
}

// Función para animar los números
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * progress;
        element.textContent = '$' + current.toLocaleString('es-MX', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Calcular al hacer clic en el botón
calculateBtn.addEventListener('click', calculateLoan);

// Calcular automáticamente al cargar la página
window.addEventListener('load', calculateLoan);

// ========================================
// FORMULARIO DE CONTACTO
// ========================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        loanAmount: document.getElementById('loan-amount').value,
        purpose: document.getElementById('purpose').value,
        message: document.getElementById('message').value
    };
    
    // Validar que se haya aceptado términos
    const termsAccepted = document.getElementById('terms').checked;
    
    if (!termsAccepted) {
        showNotification('Debes aceptar los términos y condiciones', 'error');
        return;
    }
    
    // Aquí normalmente enviarías los datos a un servidor
    // Por ahora, mostraremos un mensaje de éxito
    console.log('Datos del formulario:', formData);
    
    // Simular envío
    showNotification('¡Solicitud enviada con éxito! Te contactaremos pronto.', 'success');
    
    // Limpiar formulario
    contactForm.reset();
    
    // Opcional: Redirigir a WhatsApp con mensaje predefinido
    setTimeout(() => {
        const whatsappMessage = `Hola, soy ${formData.name}. Me interesa solicitar un préstamo de ${formData.loanAmount} para ${formData.purpose}.`;
        const whatsappUrl = `https://wa.me/525512345678?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
    }, 2000);
});

// ========================================
// SISTEMA DE NOTIFICACIONES
// ========================================
function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Añadir estilos si no existen
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 20px 30px;
                border-radius: 10px;
                color: white;
                font-weight: 600;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10000;
                animation: slideIn 0.5s ease;
            }
            
            .notification-success {
                background: linear-gradient(135deg, #4caf50, #66bb6a);
            }
            
            .notification-error {
                background: linear-gradient(135deg, #f44336, #ef5350);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-content i {
                font-size: 1.5rem;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// ========================================
// BOTÓN SCROLL TO TOP
// ========================================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Añadir estilos de animación
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .animate-on-scroll {
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyle);

// Observar elementos
const animateElements = document.querySelectorAll('.service-card, .benefit-card, .step, .form-wrapper');
animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// ========================================
// CONTADOR ANIMADO EN HERO STATS
// ========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('es-MX');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('es-MX');
        }
    }, 16);
}

// Activar contadores cuando la sección sea visible
const heroSection = document.querySelector('.hero');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Aquí podrías animar los contadores si tuvieras números específicos
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

heroObserver.observe(heroSection);

// ========================================
// VALIDACIÓN DE FORMULARIO EN TIEMPO REAL
// ========================================
const formInputs = contactForm.querySelectorAll('input, select, textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Validación según el tipo de campo
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    } else if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Email inválido';
        }
    } else if (input.type === 'tel' && value) {
        const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Teléfono inválido';
        }
    }
    
    // Mostrar/ocultar error
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        removeErrorMessage(input);
    } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
        showErrorMessage(input, errorMessage);
    }
    
    return isValid;
}

function showErrorMessage(input, message) {
    removeErrorMessage(input);
    
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#f44336';
    error.style.fontSize = '0.85rem';
    error.style.marginTop = '5px';
    
    input.parentElement.appendChild(error);
}

function removeErrorMessage(input) {
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// ========================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ACTUALIZACIÓN AUTOMÁTICA DE AÑO EN FOOTER
// ========================================
const currentYear = new Date().getFullYear();
document.querySelector('.footer-bottom p').innerHTML = 
    `&copy; ${currentYear} PENCOCRE S.A.S DE C.V. Todos los derechos reservados.`;

// ========================================
// PREVENCIÓN DE ENVÍO MÚLTIPLE DE FORMULARIO
// ========================================
let formSubmitting = false;

contactForm.addEventListener('submit', (e) => {
    if (formSubmitting) {
        e.preventDefault();
        return;
    }
    formSubmitting = true;
    
    // Resetear después de 3 segundos
    setTimeout(() => {
        formSubmitting = false;
    }, 3000);
});

// ========================================
// CONSOLE LOG DE BIENVENIDA
// ========================================
console.log('%c🏦 PENCOCRE S.A.S DE C.V.', 'color: #00bcd4; font-size: 20px; font-weight: bold;');
console.log('%cPréstamos Personales Rápidos y Seguros', 'color: #1a237e; font-size: 14px;');
console.log('%cDesarrollado con ❤️ para tu negocio', 'color: #009688; font-size: 12px;');

// ========================================
// DETECCIÓN DE DISPOSITIVO MÓVIL
// ========================================
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    document.body.classList.add('mobile-device');
}

// ========================================
// LAZY LOADING PARA IMÁGENES (SI LAS AGREGAS)
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para navegadores que no soportan lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}