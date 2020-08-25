import datetime
import logging
from functools import wraps

import jwt
from flask import url_for, request
from werkzeug.utils import redirect

from notedown_api.config import TOKEN_SECRET
from notedown_api.db_models import UserModel

logger = logging.getLogger()


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
            logger.warning('Token is missing on request header.')
            return {'message': 'Token is missing.'}, 401

        try:
            decode_token(token)

        except Exception as exe_error:
            logger.error(str(exe_error))
            return {'message': 'Token is invalid.'}, 403

        return function(*args, **kwargs)

    return decorated


def decode_token(token: str) -> dict:
    """Decode information on the token provided.

    Args:
        token: Token to be decoded.

    Returns:
        Dictionary with decoded payload of the token.
    """
    jwt_options = {
        'verify_signature': True,
        'verify_exp': True,
        'verify_nbf': False,
        'verify_iat': True,
        'verify_aud': False
    }
    try:
        payload = jwt.decode(
            token,
            TOKEN_SECRET,
            algorithms=['HS256'],
            options=jwt_options,
        )
        return payload
    except (
            jwt.ExpiredSignatureError, jwt.InvalidTokenError,
            Exception) as exec_error:
        logger.error(
            "Decoding token '%s', error type %s",
            token,
            str(exec_error)
        )
        raise exec_error


def create_token(email: str) -> str:
    """Create the token based on the user's email

    Args:
        email:

    Returns:
        String with the token created.
    """
    current_time = datetime.datetime.utcnow()
    token = jwt.encode(
        {
            "user": email,
            "exp": (current_time + datetime.timedelta(minutes=1440)),
        },
        TOKEN_SECRET
    )

    return token.decode("UTF-8")
