// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let currentSlide = 0;
let progressValue = 0;
const totalSlides = 2;

// ===== МОБИЛЬНОЕ МЕНЮ =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ===== ПЛАВНАЯ ПРОКРУТКА =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ОБЛАЧКО С РЕЧЬЮ =====
const speechBubble = document.getElementById('speechBubble');
const phrases = [
    "Привет! Как дела?",
    "Любишь пончики?",
    "Работа зовет...",
    "Не торопись!",
    "Улыбнись!",
    "Все будет хорошо..."
];

let phraseIndex = 0;

function changePhrase() {
    speechBubble.style.opacity = '0';
    
    setTimeout(() => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speechBubble.innerHTML = phrases[phraseIndex];
        speechBubble.style.opacity = '1';
    }, 500);
}

// Меняем фразу каждые 5 секунд
setInterval(changePhrase, 5000);

// ===== ГАЛЕРЕЯ =====
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Показ слайда
function showSlide(index) {
    // Скрываем все слайды
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Убираем активный класс у всех точек
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Показываем текущий слайд
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

// Следующий слайд
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Предыдущий слайд
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Клики по кнопкам
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Клики по точкам
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Автопрокрутка галереи
let galleryInterval = setInterval(nextSlide, 8000);

// Остановка автопрокрутки при наведении
const galleryContainer = document.querySelector('.gallery-container');
galleryContainer.addEventListener('mouseenter', () => {
    clearInterval(galleryInterval);
});

galleryContainer.addEventListener('mouseleave', () => {
    galleryInterval = setInterval(nextSlide, 8000);
});

// ===== ПРОГРЕСС-БАР ПОНЧИКОВ =====
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');

function animateProgress() {
    let width = 0;
    const targetWidth = 72; // 72%
    
    const timer = setInterval(() => {
        if (width >= targetWidth) {
            clearInterval(timer);
        } else {
            width++;
            progressFill.style.width = width + '%';
            progressPercent.textContent = width + '%';
        }
    }, 30);
}

// ===== КНОПКА ШУТКИ =====
const jokeBtn = document.getElementById('jokeBtn');
const jokeResponse = document.getElementById('jokeResponse');

const jokeSteps = [
    { text: "Флеш медленно открывает глаза...", delay: 800, icon: "fas fa-eye" },
    { text: "Думает о твоем сообщении...", delay: 1600, icon: "fas fa-brain" },
    { text: "Решает ответить...", delay: 2400, icon: "fas fa-check" },
    { text: "Начинает печатать...", delay: 3200, icon: "fas fa-keyboard" },
    { text: "Почти готово...", delay: 4000, icon: "fas fa-hourglass-half" },
    { text: "<strong>Готово! 🎉</strong><br>Флеш улыбается и машет лапой!", delay: 4800, icon: "fas fa-hand-wave" }
];

jokeBtn.addEventListener('click', function() {
    // Блокируем кнопку
    jokeBtn.disabled = true;
    jokeBtn.style.opacity = '0.7';
    jokeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Жди ответа...</span>';
    
    // Очищаем предыдущий ответ
    jokeResponse.innerHTML = '';
    
    // Показываем шаги по очереди
    jokeSteps.forEach((step, index) => {
        setTimeout(() => {
            const stepElement = document.createElement('div');
            stepElement.className = 'joke-step';
            stepElement.innerHTML = `
                <i class="${step.icon}"></i>
                <span>${step.text}</span>
            `;
            jokeResponse.appendChild(stepElement);
            
            // Прокручиваем к последнему шагу
            stepElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // После последнего шага разблокируем кнопку
            if (index === jokeSteps.length - 1) {
                setTimeout(() => {
                    jokeBtn.disabled = false;
                    jokeBtn.style.opacity = '1';
                    jokeBtn.innerHTML = '<i class="fas fa-bolt"></i><span>Нажми для мгновенного ответа!</span>';
                }, 2000);
            }
        }, step.delay);
    });
});

// ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Наблюдаем за основными элементами
document.querySelectorAll('.story-content, .gallery-container, .contact-cards').forEach(el => {
    observer.observe(el);
});

// ===== ИЗМЕНЕНИЕ ШАПКИ ПРИ СКРОЛЛЕ =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'var(--shadow)';
    }
});

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
document.addEventListener('DOMContentLoaded', () => {
    // Показываем первый слайд
    showSlide(0);
    
    // Запускаем анимацию прогресс-бара
    setTimeout(animateProgress, 1000);
    
    // Добавляем анимацию появления элементов
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300 + index * 200);
    });
});

// ===== КЛАВИАТУРНЫЕ СОКРАЩЕНИЯ =====
document.addEventListener('keydown', (e) => {
    // Стрелки для галереи
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
    
    // Пробел для шутки
    if (e.key === ' ' && !jokeBtn.disabled) {
        e.preventDefault();
        jokeBtn.click();
    }
});