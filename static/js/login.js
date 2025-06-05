document.addEventListener('DOMContentLoaded', function() {
    // Удаляем дублирующиеся сообщения на странице
    removeDuplicateMessages();

    const searchInput = document.getElementById('user-search');
    const searchBtn = document.getElementById('search-btn');
    const suggestions = document.getElementById('search-suggestions');
    const searchResults = document.getElementById('search-results');
    const resultsUsername = document.getElementById('results-username');
    const resultsContent = document.getElementById('results-content');
    const closeResults = document.getElementById('close-results');

    // Функция для удаления дублирующихся сообщений
    function removeDuplicateMessages() {
        // Удаляем сообщения из base.html (которые отображаются вверху страницы)
        const baseMessages = document.querySelector('div[style*="padding"] > .messages');
        if (baseMessages) {
            baseMessages.remove();
        }

        // Оставляем только сообщения внутри карточки логина
        const cardMessages = document.querySelector('.card .messages');
        if (cardMessages) {
            const messages = Array.from(cardMessages.children);
            const uniqueMessages = new Map();

            messages.forEach(message => {
                const text = message.textContent.trim();
                const className = message.className;
                const key = `${className}-${text}`;

                if (!uniqueMessages.has(key)) {
                    uniqueMessages.set(key, message);
                } else {
                    message.remove();
                }
            });
        }
    }

    // Проверяем наличие всех элементов
    if (!searchInput || !searchBtn || !suggestions || !searchResults || !resultsUsername || !resultsContent || !closeResults) {
        console.warn('Search elements not found on this page');
        return;
    }

    let searchTimeout;

    // Автоподсказки при вводе
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();

        if (query.length >= 2) {
            searchTimeout = setTimeout(() => {
                fetchSuggestions(query);
            }, 300);
        } else {
            suggestions.innerHTML = '';
            suggestions.style.display = 'none';
        }
    });

    // Поиск по нажатию кнопки
    searchBtn.addEventListener('click', function() {
        const username = searchInput.value.trim();
        if (username) {
            searchUserCalendar(username);
        }
    });

    // Поиск по Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const username = this.value.trim();
            if (username) {
                searchUserCalendar(username);
            }
        }
    });

    // Закрытие результатов
    closeResults.addEventListener('click', function() {
        searchResults.style.display = 'none';
        searchInput.value = '';
        suggestions.innerHTML = '';
        suggestions.style.display = 'none';
    });

    // Закрытие подсказок при клике вне
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-input-wrapper')) {
            suggestions.style.display = 'none';
        }
    });

    // Получение автоподсказок
    function fetchSuggestions(query) {
        // Отменяем предыдущий запрос если он есть
        if (window.currentSuggestionRequest) {
            window.currentSuggestionRequest.abort();
        }

        const controller = new AbortController();
        window.currentSuggestionRequest = controller;

        fetch(`/api/search-users/?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            signal: controller.signal
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.users && data.users.length > 0) {
                showSuggestions(data.users);
            } else {
                suggestions.innerHTML = '<div class="suggestion-item no-results">Пользователи не найдены</div>';
                suggestions.style.display = 'block';
            }
        })
        .catch(error => {
            if (error.name !== 'AbortError') {
                console.error('Error fetching suggestions:', error);
                suggestions.innerHTML = '<div class="suggestion-item error">Ошибка поиска</div>';
                suggestions.style.display = 'block';
            }
        })
        .finally(() => {
            window.currentSuggestionRequest = null;
        });
    }

    // Отображение автоподсказок
    function showSuggestions(users) {
        suggestions.innerHTML = '';
        users.forEach(user => {
            const suggestion = document.createElement('div');
            suggestion.className = 'suggestion-item';
            suggestion.textContent = user.display_name || user.username;
            suggestion.addEventListener('click', function() {
                searchInput.value = user.username;
                suggestions.innerHTML = '';
                suggestions.style.display = 'none';
                searchUserCalendar(user.username);
            });
            suggestions.appendChild(suggestion);
        });
        suggestions.style.display = 'block';
    }

    // Поиск календаря пользователя
    function searchUserCalendar(username) {
        // Отменяем предыдущий запрос если он есть
        if (window.currentCalendarRequest) {
            window.currentCalendarRequest.abort();
        }

        // Показываем индикатор загрузки
        resultsContent.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Загрузка...</div>';
        resultsUsername.textContent = `Календарь питания: ${username}`;
        searchResults.style.display = 'block';

        // Скрываем подсказки
        suggestions.style.display = 'none';

        const controller = new AbortController();
        window.currentCalendarRequest = controller;

        fetch(`/api/user-calendar/?username=${encodeURIComponent(username)}`, {
            method: 'GET',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            signal: controller.signal
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                showUserCalendar(data.calendar);
            } else {
                resultsContent.innerHTML = `<div class="error"><i class="fas fa-exclamation-triangle"></i> ${data.error}</div>`;
            }
        })
        .catch(error => {
            if (error.name !== 'AbortError') {
                console.error('Error fetching calendar:', error);
                resultsContent.innerHTML = '<div class="error"><i class="fas fa-exclamation-triangle"></i> Ошибка при загрузке календаря</div>';
            }
        })
        .finally(() => {
            window.currentCalendarRequest = null;
        });
    }

    // Отображение календаря пользователя - только текущая неделя
    function showUserCalendar(calendar) {
        let html = '';

        // Показываем только текущую неделю
        if (calendar.current_week && calendar.current_week.length > 0) {
            html += '<div class="week-section current-week-only">';
            html += '<h5><i class="fas fa-calendar-week"></i> Календарь питания на текущую неделю</h5>';
            html += generateWeekHTML(calendar.current_week);
            html += '</div>';
        } else {
            html = '<div class="no-data"><i class="fas fa-calendar-times"></i> Нет данных о меню на текущую неделю</div>';
        }

        resultsContent.innerHTML = html;
    }

    // Генерация HTML для недели
    function generateWeekHTML(week) {
        let html = '<div class="week-grid">';

        week.forEach(day => {
            const hasMenu = day.has_menu !== false;
            const cardClass = hasMenu ? 'day-card-mini' : 'day-card-mini no-menu';

            html += `
                <div class="${cardClass}">
                    <h6><i class="fas fa-calendar-day"></i> ${day.date} (${day.day_name})</h6>
                    <div class="meals-mini">
            `;

            if (!hasMenu) {
                html += '<div class="meal-item no-menu-item"><i class="fas fa-calendar-times"></i> Меню отсутствует</div>';
            } else if (day.selections.not_eating) {
                html += '<div class="meal-item not-eating"><i class="fas fa-times-circle"></i> Не ем</div>';
            } else {
                let hasSelections = false;

                if (day.selections.salad) {
                    html += `<div class="meal-item">🥗 ${day.selections.salad}</div>`;
                    hasSelections = true;
                }
                if (day.selections.soup) {
                    html += `<div class="meal-item">🍲 ${day.selections.soup}</div>`;
                    hasSelections = true;
                }
                if (day.selections.main) {
                    html += `<div class="meal-item">🍖 ${day.selections.main}</div>`;
                    hasSelections = true;
                }
                if (day.selections.side) {
                    html += `<div class="meal-item">🥔 ${day.selections.side}</div>`;
                    hasSelections = true;
                }
                if (day.selections.bakery) {
                    html += `<div class="meal-item">🥨 ${day.selections.bakery}</div>`;
                    hasSelections = true;
                }

                if (!hasSelections) {
                    html += '<div class="meal-item no-selection"><i class="fas fa-question-circle"></i> Блюда не выбраны</div>';
                }
            }

            html += `
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }
});