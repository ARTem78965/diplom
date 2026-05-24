from functools import wraps
from flask_login import current_user
from flask import abort


def user_authenticated(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not current_user.is_authenticated:
            abort(401)
        
        return func(*args, **kwargs)

    return wrapper
