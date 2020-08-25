"""Configuration variables used on the application."""
import os

# Flask configuration variables.
DEBUG = True
CSRF_ENABLED = True
SECRET_KEY = os.urandom(16)
TOKEN_SECRET = os.getenv("TOKEN_SECRET", "noteDown_Not_so_secret_key")

APP_ROOT_DIR = os.path.dirname(os.path.abspath(__name__))

# Database configuration variables.
# SQLALCHEMY_DATABASE_URI = f"postgres://{__credentials}@{__url}"
SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(APP_ROOT_DIR, 'test.db')}"
SQLALCHEMY_TRACK_MODIFICATIONS = False

authorizations = {
    "apiKey": {
        "type": "apiKey",
        "in": "header",
        "name": "X-API-KEY"
    },
    "basicAuth": {
        "type": "basic",
    }
}
