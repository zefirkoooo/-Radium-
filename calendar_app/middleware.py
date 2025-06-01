# calendar_app/middleware.py

import time
import logging
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)


class PerformanceMiddleware(MiddlewareMixin):
    """Middleware для мониторинга производительности запросов"""

    def process_request(self, request):
        request.start_time = time.time()

    def process_response(self, request, response):
        if hasattr(request, 'start_time'):
            duration = time.time() - request.start_time

            # Логируем медленные запросы (больше 1 секунды)
            if duration > 1.0:
                logger.warning(
                    f"Slow request: {request.method} {request.path} "
                    f"took {duration:.2f}s for user {getattr(request.user, 'username', 'anonymous')}"
                )

            # Добавляем заголовок с временем выполнения
            response['X-Response-Time'] = f"{duration:.3f}s"

        return response


class CacheControlMiddleware(MiddlewareMixin):
    """Middleware для кэширования статических файлов"""

    def process_response(self, request, response):
        # Кэшируем статические файлы на 1 год
        if request.path.startswith('/static/'):
            response['Cache-Control'] = 'public, max-age=31536000'  # 1 год
            response['Expires'] = 'Thu, 31 Dec 2025 23:59:59 GMT'

        # Кэшируем изображения на 1 месяц
        elif request.path.startswith('/media/') and any(
                request.path.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.gif', '.ico']
        ):
            response['Cache-Control'] = 'public, max-age=2592000'  # 1 месяц

        # Не кэшируем динамический контент
        elif request.path.startswith('/admin/') or request.path in ['/', '/home/', '/login/']:
            response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            response['Pragma'] = 'no-cache'
            response['Expires'] = '0'

        return response


class SecurityHeadersMiddleware(MiddlewareMixin):
    """Middleware для заголовков безопасности"""

    def process_response(self, request, response):
        # Заголовки безопасности
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'

        # CSP для статических ресурсов
        if not request.path.startswith('/admin/'):
            response['Content-Security-Policy'] = (
                "default-src 'self'; "
                "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; "
                "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; "
                "font-src 'self' https://cdnjs.cloudflare.com; "
                "img-src 'self' data:; "
                "connect-src 'self';"
            )

        return response