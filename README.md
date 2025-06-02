# 🍽️ Radium Food Calendar / Календарь питания Radium

[English](#english) | [Русский](#русский)

---

## English

### 📖 Description

Radium Food Calendar is a Django-based web application for managing weekly meal planning and user meal selections. It allows administrators to upload Excel menu files and users to select their preferred meals for each day of the week.

### ✨ Features

- **Excel Menu Import**: Upload weekly menus from Excel files with smart parsing
- **User Management**: Admin panel for creating and managing users
- **Meal Selection**: Interactive interface for users to select daily meals
- **Multi-category Meals**: Support for salads, soups, main courses, sides, and bakery items
- **Complete Dish Management**: Mark main courses as complete dishes (no side required)
- **Export Functionality**: Export meal selections back to Excel format
- **Responsive Design**: Mobile-friendly interface
- **User Search**: Search and view other users' meal calendars
- **Weekly Planning**: Automatic week rotation and planning

### 🛠️ Technology Stack

- **Backend**: Django 5.0.2
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Database**: SQLite (default), PostgreSQL support
- **File Processing**: openpyxl, pandas
- **UI Components**: django-crispy-forms, Font Awesome icons

### 📋 Requirements

- Python 3.8+
- Django 5.0.2+
- See `requirements.txt` for full dependencies

### 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zefirkoooo/-Radium-.git
   cd -Radium-
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   
   **Windows:**
   ```bash
   .\venv\Scripts\activate
   ```
   
   **macOS/Linux:**
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   
   **If pip needs updating:**
   ```bash
   python.exe -m pip install --upgrade pip
   ```

5. **Apply database migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser account**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run development server**
   ```bash
   python manage.py runserver localhost:8000
   ```

8. **Access the application**
   
   Open your browser and navigate to: `http://localhost:8000`

### 📁 Project Structure

```
radium_food/
├── calendar_app/          # Main application
│   ├── models.py         # Database models
│   ├── views.py          # View logic
│   ├── forms.py          # Django forms
│   ├── urls.py           # URL routing
│   └── templates/        # HTML templates
├── static/               # Static files (CSS, JS, images)
├── media/                # User uploaded files
├── templates/            # Global templates
├── requirements.txt      # Python dependencies
└── manage.py            # Django management script
```

### 🎯 Usage

1. **Admin Setup**: Login with superuser account to access admin features
2. **Upload Menu**: Use the Excel upload feature to import weekly menus
3. **User Management**: Create user accounts for meal selection
4. **Meal Selection**: Users can select their preferred meals for each day
5. **Export Data**: Export meal selections to Excel for kitchen planning

### 📊 Excel File Format

The application expects Excel files with:
- Days of the week in columns (Monday-Friday)
- Meal categories in rows (Salads, Soups, Main Courses, Sides, Bakery)
- Meal names with optional descriptions in parentheses

### 🔧 Configuration

Key settings in `settings.py`:
- Database configuration
- Static files settings
- Media upload settings
- Logging configuration

### 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Русский

### 📖 Описание

Календарь питания Radium - это веб-приложение на Django для управления планированием еженедельного питания и выбором блюд пользователями. Позволяет администраторам загружать Excel-файлы с меню, а пользователям - выбирать предпочтительные блюда на каждый день недели.

### ✨ Функциональность

- **Импорт меню из Excel**: Загрузка еженедельных меню из Excel-файлов с умным парсингом
- **Управление пользователями**: Админ-панель для создания и управления пользователями
- **Выбор блюд**: Интерактивный интерфейс для выбора ежедневных блюд
- **Многокатегорийные блюда**: Поддержка салатов, супов, горячих блюд, гарниров и выпечки
- **Управление полноценными блюдами**: Отметка основных блюд как полноценных (гарнир не требуется)
- **Функция экспорта**: Экспорт выборов блюд обратно в Excel формат
- **Адаптивный дизайн**: Мобильно-дружественный интерфейс
- **Поиск пользователей**: Поиск и просмотр календарей питания других пользователей
- **Еженедельное планирование**: Автоматическая ротация недель и планирование

### 🛠️ Технологический стек

- **Backend**: Django 5.0.2
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **База данных**: SQLite (по умолчанию), поддержка PostgreSQL
- **Обработка файлов**: openpyxl, pandas
- **UI компоненты**: django-crispy-forms, иконки Font Awesome

### 📋 Требования

- Python 3.8+
- Django 5.0.2+
- См. `requirements.txt` для полного списка зависимостей

### 🚀 Установка

1. **Клонирование репозитория**
   ```bash
   git clone https://github.com/zefirkoooo/-Radium-.git
   cd -Radium-
   ```

2. **Создание виртуального окружения**
   ```bash
   python -m venv venv
   ```

3. **Активация виртуального окружения**
   
   **Windows:**
   ```bash
   .\venv\Scripts\activate
   ```
   
   **macOS/Linux:**
   ```bash
   source venv/bin/activate
   ```

4. **Установка зависимостей**
   ```bash
   pip install -r requirements.txt
   ```
   
   **Если нужно обновить pip:**
   ```bash
   python.exe -m pip install --upgrade pip
   ```

5. **Применение миграций базы данных**
   ```bash
   python manage.py migrate
   ```

6. **Создание учетной записи суперпользователя**
   ```bash
   python manage.py createsuperuser
   ```

7. **Запуск сервера разработки**
   ```bash
   python manage.py runserver localhost:8000
   ```

8. **Доступ к приложению**
   
   Откройте браузер и перейдите по адресу: `http://localhost:8000`

### 📁 Структура проекта

```
radium_food/
├── calendar_app/          # Основное приложение
│   ├── models.py         # Модели базы данных
│   ├── views.py          # Логика представлений
│   ├── forms.py          # Django формы
│   ├── urls.py           # URL маршрутизация
│   └── templates/        # HTML шаблоны
├── static/               # Статические файлы (CSS, JS, изображения)
├── media/                # Загруженные пользователями файлы
├── templates/            # Глобальные шаблоны
├── requirements.txt      # Python зависимости
└── manage.py            # Скрипт управления Django
```

### 🎯 Использование

1. **Настройка админа**: Войдите с учетной записью суперпользователя для доступа к функциям администратора
2. **Загрузка меню**: Используйте функцию загрузки Excel для импорта еженедельных меню
3. **Управление пользователями**: Создайте учетные записи пользователей для выбора блюд
4. **Выбор блюд**: Пользователи могут выбирать предпочтительные блюда на каждый день
5. **Экспорт данных**: Экспортируйте выборы блюд в Excel для планирования кухни

### 📊 Формат Excel файла

Приложение ожидает Excel файлы с:
- Дни недели в столбцах (Понедельник-Пятница)
- Категории блюд в строках (Салаты, Супы, Горячие блюда, Гарниры, Выпечка)
- Названия блюд с опциональными описаниями в скобках

### 🔧 Конфигурация

Ключевые настройки в `settings.py`:
- Конфигурация базы данных
- Настройки статических файлов
- Настройки загрузки медиа
- Конфигурация логирования

### 📝 Лицензия

Этот проект лицензирован под лицензией MIT - см. файл [LICENSE](LICENSE) для подробностей.

---

## 📞 Support / Поддержка

If you encounter any issues or have questions, please open an issue on GitHub.

Если у вас возникли проблемы или есть вопросы, пожалуйста, создайте issue на GitHub.

---

**Made with ❤️ for efficient meal planning / Создано с ❤️ для эффективного планирования питания**
