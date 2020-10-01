from datetime import datetime

from notedown_api.db_models import UserModel
from notedown_api.extensions import db
from notedown_api.utils import create_token


class AuthController:

    @staticmethod
    def add_user(email: str, password: str) -> UserModel:
        """

        Args:
            email: User's email.
            password: User's password.

        Returns:
            UserModel created.
        """
        last_login = datetime.utcnow()
        username = hash((email, last_login.timestamp()))
        user = UserModel(email=email, last_login=last_login, username=username)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def get_user(email: str) -> UserModel:
        """Retrieve a user from the database based on a given email.

        Args:
            email: User's email.

        Returns:
            UserModel retieved from the database.
        """
        user = db.session.query(UserModel).filter_by(email=email).first()
        return user

    @staticmethod
    def login_user(user: UserModel) -> str:
        """Log a given user in and generate the token to other operations.

        Args:
            user: UserModel entity.

        Returns:
            Token generated.
        """
        token = create_token(user.email)
        user.last_login = datetime.utcnow()
        db.session.add(user)
        db.session.commit()
        return token
