from django import template

register = template.Library()

@register.filter
def get_item(dictionary, key):
    """Получение элемента из словаря по ключу"""
    return dictionary.get(key, []) 