// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navButtons = document.querySelector('.nav-buttons');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    const body = document.body;

    // Проверяем наличие всех элементов
    if (!menuToggle || !navButtons || !menuBackdrop) {
        console.warn('Menu elements not found on this page');
        return;
    }

    function toggleMenu() {
        navButtons.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Обработчик для кнопки меню
    menuToggle.addEventListener('click', toggleMenu);

    // Закрываем меню при клике на фон
    menuBackdrop.addEventListener('click', toggleMenu);

    // Закрываем меню при клике на пункт меню
    navButtons.addEventListener('click', function(event) {
        if (event.target.tagName === 'A' || event.target.closest('form')) {
            toggleMenu();
        }
    });

    // Закрываем меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navButtons.classList.remove('active');
            menuBackdrop.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// Get CSRF token from cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Add CSRF token to all AJAX requests (if jQuery is available)
if (typeof $ !== 'undefined') {
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
}