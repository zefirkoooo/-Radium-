function handleMainDishSelection(radio, isCompleteDish) {
    const sidesCategory = document.querySelector('.sides-category');
    if (sidesCategory) {
        if (isCompleteDish) {
            sidesCategory.style.display = 'none';
            // Снимаем выбор с гарнира, если он был выбран
            const selectedSide = document.querySelector('input[name="selected_side"]:checked');
            if (selectedSide) {
                selectedSide.checked = false;
            }
            // Убираем required с гарниров
            document.querySelectorAll('input[name="selected_side"]').forEach(input => {
                input.required = false;
            });
        } else {
            sidesCategory.style.display = 'block';
            // Возвращаем required гарнирам
            document.querySelectorAll('input[name="selected_side"]').forEach(input => {
                input.required = true;
            });
        }
    }
}

// Добавляем обработчики для радио-кнопок основных блюд
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики изменения для основных блюд
    document.querySelectorAll('input[name="selected_main"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const isComplete = this.getAttribute('data-is-complete') === 'true';
            handleMainDishSelection(this, isComplete);
        });
    });

    // Проверяем начальное состояние
    const selectedMain = document.querySelector('input[name="selected_main"]:checked');
    if (selectedMain) {
        const isComplete = selectedMain.getAttribute('data-is-complete') === 'true';
        handleMainDishSelection(selectedMain, isComplete);
    }

    // Обработчик для чекбокса "НЕ ЕМ"
    const notEatingCheckbox = document.getElementById('id_not_eating');
    if (notEatingCheckbox) {
        notEatingCheckbox.addEventListener('change', function() {
            const mealInputs = document.querySelectorAll('input[type="radio"]');
            mealInputs.forEach(input => {
                input.disabled = this.checked;
                if (this.checked) {
                    input.checked = false;
                }
            });
        });
    }
});