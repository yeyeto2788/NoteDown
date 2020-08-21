import datetime
from functools import wraps

import jwt
from flask import url_for, request
from werkzeug.utils import redirect

from notedown_api.config import SECRET_KEY
from notedown_api.db_models import UserModel


def load_user(user_id: int) -> UserModel or None:
    """Check if user is logged-in on every page load.

    Args:
        user_id: Id of the user to be loaded.

    Returns:
        User object if found otherwise None.
    """

    if user_id is not None:
        return UserModel.query.get(user_id)

    return None


def unauthorized():
    """Redirect unauthorized users to Login page.

    Returns:
        It will redirect the request into the login page.
    """

    return redirect(url_for('auth_login'))


def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        token = None

        if 'X-API-KEY' in request.headers:
            token = request.headers['X-API-KEY']

        if not token:
            return {'message': 'Token is missing.'}, 401

        try:
            decode_token(token)

        except Exception:
            return {'message': 'Token is invalid.'}, 403

        print(f"Token: {token}")
        return function(*args, **kwargs)

    return decorated


def decode_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError) as exec_error:
        raise exec_error


def create_token(email):
    token = jwt.encode(
        {
            "user": email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(
                minutes=1440),
        },
        SECRET_KEY
    )

    return token.decode("UTF-8")
