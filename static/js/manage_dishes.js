document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.complete-dish-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const dishId = this.dataset.dishId;
            const isComplete = this.checked;

            fetch('/update-complete-dish-status/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    meal_id: dishId,
                    is_complete: isComplete
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!data.success) {
                    this.checked = !this.checked;
                    alert(data.error || 'Произошла ошибка при обновлении статуса');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.checked = !this.checked;
                alert('Произошла ошибка при обновлении статуса');
            });
        });
    });

    // Auto-refresh the page every 5 minutes
    setTimeout(function() {
        window.location.reload();
    }, 5 * 60 * 1000);
});