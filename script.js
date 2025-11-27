// Navegación móvil
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Cerrar menú al hacer clic en enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Header scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }
});

// CALCULADORA DE PRÉSTAMOS
const amountInput = document.getElementById('amount');
const calculateBtn = document.getElementById('calculate-btn');
const amountValue = document.getElementById('amount-value');
const loanAmountEl = document.getElementById('loan-amount');
const loanCostEl = document.getElementById('loan-cost');
const guaranteeEl = document.getElementById('guarantee');
const totalPaymentEl = document.getElementById('total-payment');
const weeklyPaymentEl = document.getElementById('weekly-payment');
const lateFeeEl = document.getElementById('late-fee');

// Actualizar valor mostrado cuando se mueve el slider
amountInput.addEventListener('input', () => {
    amountValue.textContent = Number(amountInput.value).toLocaleString('es-MX');
});

// Función de cálculo
function calculateLoan() {
    const loanAmount = parseFloat(amountInput.value);
    const thousands = loanAmount / 1000;
    
    // Cálculos según reglas PENCOCRE
    // Costo: $90 por cada $1,000
    const loanCost = thousands * 90;
    
    // Garantía: $100 por cada $1,000
    const guarantee = thousands * 100;
    
    // Mora: $50 por cada $1,000
    const lateFee = thousands * 50;
    
    // Total a Pagar = Monto + Costo + Garantía
    const totalToPay = loanAmount + loanCost;
    
    // Pago Semanal = Total / 16
    const weeklyPayment = totalToPay / 16; 
    
    // Mostrar resultados con animación y formato
    animateValue(loanAmountEl, extractNumber(loanAmountEl.textContent), loanAmount, 800);
    animateValue(loanCostEl, extractNumber(loanCostEl.textContent), loanCost, 800);
    animateValue(guaranteeEl, extractNumber(guaranteeEl.textContent), guarantee, 800);
    animateValue(totalPaymentEl, extractNumber(totalPaymentEl.textContent), totalToPay, 1000);
    animateValue(weeklyPaymentEl, extractNumber(weeklyPaymentEl.textContent), weeklyPayment, 1000);
    animateValue(lateFeeEl, extractNumber(lateFeeEl.textContent), lateFee, 800);
}

// Función auxiliar para obtener número de texto formateado (si ya tiene valor)
function extractNumber(text) {
    if(!text || text === '$0') return 0;
    return parseFloat(text.replace(/[^0-9.-]+/g,""));
}

// Animación de valores
function animateValue(element, start, end, duration) {
    // Si start es NaN (por primera carga), usar 0
    if (isNaN(start)) start = 0;
    
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const current = start + (end - start) * easeOutQuart;
        
        element.textContent = current.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Event Listeners
calculateBtn.addEventListener('click', calculateLoan);

// Calcular al cargar la página automáticamente
window.addEventListener('load', calculateLoan);
