import logging
from datetime import datetime

from notedown_api.db_models import NoteModel
from notedown_api.extensions import db
from notedown_api.namespaces.auth.auth_controller import AuthController
from notedown_api.utils import decode_token

logger = logging.getLogger()


class NotesController(AuthController):

    @staticmethod
    def get_email_from_token(token: str) -> str:
        """Decode token information and extract the user's email.

        Args:
            token: Token to get info from.

        Returns:
            User's email address on the token.
        """
        payload = decode_token(token)
        user_email = payload.get('user')
        return user_email

    def add_user_note(self, email: str, note_text: str) -> NoteModel:
        """Add a note to the database linked to the given user.

        Args:
            email: User's email.
            note_text: Text of the note.

        Returns:
            NoteModel added.
        """
        user = self.get_user(email)
        note = NoteModel(
            text=note_text,
            date_created=datetime.utcnow(),
            date_edited=datetime.utcnow(),
            user=[user]
        )
        db.session.add(note)
        db.session.commit()
        return note

    def get_user_note(self, email: str, note_id: str) -> NoteModel:
        """Retrieve a note by a given id.

        Args:
            email: User's email.
            note_id: Note's id.

        Returns:
            NoteModel retrieved from the database.
        """
        user = self.get_user(email)
        note = user.notes.filter_by(id=note_id).first()
        return note

    def get_user_notes(self, email: str) -> list:
        """Retrieve all user's notes from the database.

        Args:
            email: User's email.

        Returns:
            List of NoteModel entities.
        """
        user = self.get_user(email)
        notes = user.notes.all()
        return notes

    def delete_user_note(self, email: str, note_id: str) -> NoteModel:
        """Delete a note on the database.

        Args:
            email: User's email.
            note_id: Note's id.

        Returns:
            Deleted NoteModel
        """
        user = self.get_user(email)
        note = user.notes.filter_by(id=note_id).first()
        user.notes.remove(note)
        db.session.commit()
        return note

    def edit_user_note(self, email: str, note_id: str,
                       note_text: str) -> NoteModel:
        """Edit some attributes to a given note.

        Args:
            email: User's email.
            note_id: Note's id.
            note_text: Text of the note.

        Returns:
            Edited NoteModel.
        """
        note = self.get_user_note(email=email, note_id=note_id)
        note.text = note_text
        note.date_edited = datetime.utcnow()
        db.session.add(note)
        db.session.commit()
        return note
