"""Notes model definition."""
from datetime import datetime

from notedown_api.extensions import db
from notedown_api.models.user_model import notes


class NoteModel(db.Model):
    """Note model.

    Attributes:
        id:
        text:
        date_created:
        date_edited:
        user:
    """
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
