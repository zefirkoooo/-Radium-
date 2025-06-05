document.getElementById('menu-file').addEventListener('change', function(e) {
    var fileName = e.target.files[0] ? e.target.files[0].name : 'Файл не выбран';
    document.querySelector('.file-status').textContent = fileName;
    document.getElementById('upload-btn').disabled = !e.target.files[0];
});

function uploadFile() {
    var fileInput = document.getElementById('menu-file');
    var file = fileInput.files[0];
    if (!file) {
        alert('Пожалуйста, выберите файл для загрузки');
        return;
    }

    var formData = new FormData();
    formData.append('excel_file', file);
    formData.append('csrfmiddlewaretoken', getCookie('csrftoken'));

    // Добавляем выбранный тип парсера
    var parserType = document.querySelector('input[name="parser_type"]:checked').value;
    formData.append('parser_type', parserType);

    var uploadBtn = document.getElementById('upload-btn');
    uploadBtn.disabled = true;
    uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';

    fetch(window.location.href, {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url;
            return;
        }
        return response.text().then(text => {
            try {
                return JSON.parse(text);
            } catch (e) {
                // Если ответ не JSON, просто перезагружаем страницу
                window.location.reload();
                return null;
            }
        });
    })
    .then(data => {
        if (data && data.status === 'success') {
            location.reload();
        } else if (data && data.message) {
            alert('Ошибка при загрузке файла: ' + data.message);
        } else {
            // Если нет данных или они некорректны, просто перезагружаем страницу
            window.location.reload();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Произошла ошибка при загрузке файла');
    })
    .finally(() => {
        uploadBtn.disabled = false;
        uploadBtn.innerHTML = '<i class="fas fa-upload"></i> Загрузить меню';
    });
}

function confirmClear() {
    return confirm('Вы уверены, что хотите очистить весь календарь? Это действие нельзя отменить.');
}