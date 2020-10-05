"""Token blacklist model definition."""
from datetime import datetime

from notedown_api.extensions import db


class TokenBlackList(db.Model):
    """Token blacklist model.

    Attributes:
        id: Id of the token added.
        token: Token string added.
        date_added: Current time at object creation time.
    """
    __tablename__ = 'token_blacklist'
    __table_args__ = {'extend_existing': True}

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
    )

    token = db.Column(db.String())

    date_added = db.Column(db.DateTime, nullable=False)

    def __init__(self, *args, **kwargs):
        """On construction, set date of addition."""
        super().__init__(*args, **kwargs)
        self.date_added = datetime.utcnow()

    def __repr__(self) -> dict:
        representation = {
            self.__class__: {
                self.id: self.token
            }
        }
        return representation
