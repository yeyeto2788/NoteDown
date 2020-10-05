import logging
import os

from flask import Flask, jsonify
from flask_cors import CORS

from notedown_api.blueprints import root_bp
from notedown_api.config import APP_ROOT_DIR
from notedown_api.extensions import db, login_manager, api
from notedown_api.namespaces import auth_namespace, notes_namespace
from notedown_api.utils import load_user, unauthorized

logger = logging.getLogger()


def configure_database(app: Flask) -> None:
    """Configuration of the database.
    Args:
        app: a Flask application.
    """
    db.init_app(app)
    db.create_all()


def configure_login(app: Flask) -> None:
    """Initialize the login manager for the application.

    Args:
        app: a Flask application.
    """
    login_manager.user_loader(load_user)
    login_manager.unauthorized_handler(unauthorized)
    login_manager.init_app(app)


def configure_blueprints(app: Flask) -> None:
    """Registration of the application blueprints.
    Args:
        app: a Flask application.
    """
    app.register_blueprint(root_bp, url_prefix='/')


def configure_api(app: Flask) -> None:
    api.init_app(
        app
    )
    api.add_namespace(auth_namespace, '/auth')
    api.add_namespace(notes_namespace, '/notes')


def page_not_found(exec_error):
    """Function to render a specific template based on the
    execution error.

    Args:
        exec_error: Execution error.

    Returns:
        Renders the '404.html' template.
    """
    error = {
        "code": exec_error.code,
        "description": exec_error.description
    }
    logger.error(
        "Code '%s', Description '%s'",
        exec_error.code,
        exec_error.description
    )
    return jsonify(error)


def create_app() -> Flask:
    """Creation of the Flask.app object as factory method.

    More info, here:
    http://flask.pocoo.org/docs/patterns/appfactories/.

    Returns:
        app: a Flask app already configured to run.
    """
    logger.info("Initializing application.")
    app = Flask(__name__, static_folder=os.path.join(APP_ROOT_DIR, "build"))
    app.config.from_pyfile("config.py")
    app.register_error_handler(404, page_not_found)
    app.register_error_handler(500, page_not_found)

    with app.app_context():
        CORS(app)
        configure_database(app)
        configure_api(app)
        configure_blueprints(app)
        configure_login(app)

    logger.info("Exposing the following endpoints %s", app.url_map)

    return app
