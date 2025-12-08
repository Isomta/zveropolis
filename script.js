// Мобильное меню
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация облачка с речью
const speechBubble = document.getElementById('speechBubble');
const messages = [
    "Привет...<br>Как... дела...?",
    "Любишь... пончики...?",
    "Работа... зовет...<br>Через... час...",
    "Ты... тоже... любишь... медленно...?",
    "Добро... пожаловать...!"
];

let messageIndex = 0;
setInterval(() => {
    speechBubble.style.opacity = 0;
    
    setTimeout(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        speechBubble.innerHTML = messages[messageIndex];
        speechBubble.style.opacity = 1;
    }, 500);
}, 5000);

// Галерея
const galleryData = [
    {
        id: 1,
        img: "img/flash-work.jpg",
        caption: "Мой офис. Мой трон. Мой... компьютер... который... еще... грузится."
    },
    {
        id: 2,
        img: "img/flash-laugh.jpg", 
        caption: "Коллеги... оценили... мой... юмор. Через... несколько... минут."
    },
    {
        id: 3,
        img: "img/flash-car.jpg",
        caption: "Экстренный... вызов... на... пончик. Скорость... — это... состояние... души."
    },
    {
        id: 4,
        img: "img/flash-donut.jpg",
        caption: "Топливо... для... чемпионов... неторопливости."
    },
    {
        id: 5,
        img: "img/flash-main.jpg",
        caption: "Вот... я... какой! Улыбка... на... весь... день... (и... на... завтра)."
    }
];

let currentSlide = 0;
const galleryContainer = document.querySelector('.gallery-container');
const currentSlideElement = document.getElementById('currentSlide');
const totalSlidesElement = document.getElementById('totalSlides');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Инициализация галереи
function initGallery() {
    totalSlidesElement.textContent = galleryData.length;
    
    galleryData.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'gallery-slide';
        slideElement.style.transform = `translateX(${index * 100}%)`;
        
        const imgElement = document.createElement('img');
        imgElement.src = slide.img;
        imgElement.alt = `Флеш - изображение ${slide.id}`;
        imgElement.className = 'gallery-img';
        
        const captionElement = document.createElement('p');
        captionElement.className = 'slide-caption';
        captionElement.innerHTML = slide.caption;
        
        slideElement.appendChild(imgElement);
        slideElement.appendChild(captionElement);
        galleryContainer.appendChild(slideElement);
    });
    
    updateGallery();
}

// Обновление галереи
function updateGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
    
    currentSlideElement.textContent = currentSlide + 1;
}

// Следующий слайд
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % galleryData.length;
    updateGallery();
});

// Предыдущий слайд
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + galleryData.length) % galleryData.length;
    updateGallery();
});

// Автопрокрутка галереи
let galleryInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % galleryData.length;
    updateGallery();
}, 8000);

// Остановка автопрокрутки при наведении
galleryContainer.addEventListener('mouseenter', () => {
    clearInterval(galleryInterval);
});

galleryContainer.addEventListener('mouseleave', () => {
    galleryInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % galleryData.length;
        updateGallery();
    }, 8000);
});

// Кнопка шутки
const jokeButton = document.getElementById('jokeButton');
const jokeReaction = document.getElementById('jokeReaction');
const jokeReactions = [
    { text: "Флеш медленно подмигивает...", icon: "fas fa-eye", delay: 1000 },
    { text: "Флеш думает о пончике...", icon: "fas fa-donut", delay: 2000 },
    { text: "Флеш начинает печатать ответ...", icon: "fas fa-keyboard", delay: 3000 },
    { text: "Ответ почти готов... еще чуть-чуть...", icon: "fas fa-hourglass-half", delay: 4000 },
    { text: "Флеш улыбается и машет лапой!<br>Вот он, мгновенный ответ!", icon: "fas fa-check-circle", delay: 5000 }
];

jokeButton.addEventListener('click', function() {
    // Блокируем кнопку на время анимации
    jokeButton.disabled = true;
    jokeButton.style.opacity = "0.7";
    jokeReaction.innerHTML = "";
    
    // Показываем реакции по очереди
    jokeReactions.forEach((reaction, index) => {
        setTimeout(() => {
            jokeReaction.innerHTML = `
                <div class="reaction-step">
                    <i class="${reaction.icon}"></i>
                    <p>${reaction.text}</p>
                </div>
            `;
            
            // Последняя реакция - разблокируем кнопку
            if (index === jokeReactions.length - 1) {
                setTimeout(() => {
                    jokeButton.disabled = false;
                    jokeButton.style.opacity = "1";
                }, 3000);
            }
        }, reaction.delay);
    });
});

// Анимация прогресс-бара
const donutProgress = document.getElementById('donutProgress');
const progressPercent = document.getElementById('progressPercent');

function animateProgressBar() {
    let width = 0;
    const targetWidth = 72;
    const interval = setInterval(() => {
        if (width >= targetWidth) {
            clearInterval(interval);
        } else {
            width++;
            donutProgress.style.width = width + '%';
            progressPercent.textContent = width + '%';
        }
    }, 30);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    animateProgressBar();
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за секциями
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Изменение стиля навигации при скролле
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    }
});