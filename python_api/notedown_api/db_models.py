"""Database models declaration."""
from datetime import datetime

from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from notedown_api.extensions import db

notes = db.Table('user_notes',
                 db.Column('note_id', db.Integer, db.ForeignKey('notes.id'),
                           primary_key=True),
                 db.Column('user_id', db.Integer, db.ForeignKey('users.id'),
                           primary_key=True)
                 )


class UserModel(UserMixin, db.Model):
    """User account model.

    Attributes:
        id: User's id.
        name: User's name.
        email: User's email.
        password: sha256 hash password.
        last_login: Time when user was last logged in.

    """

    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}
    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
    )
    username = db.Column(
        db.String(),
        unique=True,
        nullable=False
    )
    email = db.Column(
        db.String(),
        unique=True,
        nullable=False
    )
    password = db.Column(
        db.String(200),
        primary_key=False,
        unique=False,
        nullable=False
    )
    last_login = db.Column(
        db.DateTime,
        index=False,
        unique=False,
        nullable=True
    )
    notes = db.relationship(
        'NoteModel',
        secondary=notes,
        lazy='dynamic',
        cascade="all,delete",
        backref=db.backref('UserModel', lazy=True)
    )

    def set_password(self, password: str) -> None:
        """Create hashed password.

        This will create the hash of the password and store it in a
        attribute.
        """
        self.password = generate_password_hash(password, method='sha256')

    def check_password(self, password: str) -> bool:
        """Check hashed password.

        Returns:
            True if password is valid, otherwise False.
        """
        return check_password_hash(self.password, password)

    def __repr__(self) -> dict:
        representation = {
            self.__class__: {
                self.email: self.username
            }
        }
        return representation


class NoteModel(db.Model):
    """Tasks for the To Do list."""
    __tablename__ = 'notes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.Text)
    date_created = db.Column(db.DateTime, nullable=False)
    date_edited = db.Column(db.DateTime, nullable=False)

    user = db.relationship(
        'UserModel',
        secondary=notes,
        lazy='subquery',
        backref=db.backref('NoteModel', lazy=True)
    )

    def __init__(self, *args, **kwargs):
        """On construction, set date of creation."""
        super().__init__(*args, **kwargs)
        self.date_created = datetime.utcnow()

    def __repr__(self) -> dict:
        representation = {
            self.__class__: {
                self.id: self.text
            }
        }
        return representation
