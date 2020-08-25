"""Extensions to be used on the application"""
from logging.config import dictConfig

from flask_login import LoginManager
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine

from notedown_api.config import SQLALCHEMY_DATABASE_URI, authorizations

# API
api = Api(
    version='1.0',
    title='NoteDown API',
    description='Simple note taking API.',
    ordered=True,
    prefix="/api/v1/",
    doc="/docs",
    authorizations=authorizations,
)

# Database ORM
db = SQLAlchemy()
engine = create_engine(
    SQLALCHEMY_DATABASE_URI,
    # connect_args={'sslmode': 'require'}
)

# Login manager
login_manager = LoginManager()
login_manager.session_protection = "strong"
# login_manager.login_view = "auth.login"

logging_configuration = {
    'version': 1,
    'formatters': {
        'default': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        }
    },
    'handlers': {
        'wsgi': {
            'class': 'logging.StreamHandler',
            'stream': 'ext://flask.logging.wsgi_errors_stream',
            'formatter': 'default'
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': './notedown_api.log',
            'formatter': 'default',
            'maxBytes': 1024,
            'backupCount': 5
        }
    },
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi', 'file']
    }
}

dictConfig(logging_configuration)
