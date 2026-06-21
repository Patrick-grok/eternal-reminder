/* ============================================================
   ДОСТУП К САЙТУ — поменяй имя и пароль на свои здесь:
   ============================================================ */
const VALID_NAME = "Элина";
const VALID_PASS = "6.05.2009";

/* ============================================================
   ДАТА ОТСЧЁТА ТАЙМЕРА — отсюда таймер идёт вечно вперёд
   ============================================================ */
const START_DATE = new Date(2025, 3, 22, 0, 0, 0); // 22.04.2025 (месяцы с 0 — 3 = апрель)

/* ---------------- ВХОД ---------------- */
const loginForm   = document.getElementById('login-form');
const loginScreen = document.getElementById('login-screen');
const mainPage    = document.getElementById('main-page');
const loginError  = document.getElementById('login-error');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('login-name').value.trim().toLowerCase();
    const pass = document.getElementById('login-pass').value;

    if (name === VALID_NAME.toLowerCase() && pass === VALID_PASS) {
        loginScreen.style.opacity = '0';
        loginScreen.style.transition = 'opacity 0.4s ease';
        setTimeout(() => {
            loginScreen.style.display = 'none';
            mainPage.classList.add('visible');
            startTimer();
            spawnHearts();
        }, 380);
    } else {
        loginError.classList.add('show');
        loginScreen.querySelector('.login-card').animate(
            [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-8px)' },
                { transform: 'translateX(8px)' },
                { transform: 'translateX(0)' }
            ],
            { duration: 300 }
        );
    }
});

/* ---------------- ТАЙМЕР ---------------- */
function startTimer() {
    updateTimer();
    requestAnimationFrame(timerLoop);
}

function timerLoop() {
    updateTimer();
    requestAnimationFrame(timerLoop);
}

function updateTimer() {
    const now = new Date();
    let diff = Math.max(0, now - START_DATE); // миллисекунды

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const ms      = Math.floor(diff % 1000);

    document.getElementById('t-days').textContent    = days;
    document.getElementById('t-hours').textContent   = String(hours).padStart(2, '0');
    document.getElementById('t-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('t-seconds').textContent = String(seconds).padStart(2, '0');
    document.getElementById('t-ms').textContent      = String(ms).padStart(3, '0');
}

/* ---------------- ЛЕТАЮЩИЕ СЕРДЕЧКИ (фон) ---------------- */
function spawnHearts() {
    const container = document.getElementById('hearts-bg');
    const total = 18;

    for (let i = 0; i < total; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '♥';

        const left = Math.random() * 100;
        const duration = 9 + Math.random() * 10;
        const delay = Math.random() * 12;
        const size = 14 + Math.random() * 18;
        const drift = (Math.random() * 80 - 40) + 'px';

        heart.style.left = left + 'vw';
        heart.style.fontSize = size + 'px';
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = delay + 's';
        heart.style.setProperty('--drift', drift);

        container.appendChild(heart);
    }
}