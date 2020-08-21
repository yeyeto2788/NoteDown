from datetime import datetime

from flask import make_response, jsonify
from flask_restx import Namespace, Resource, fields

from notedown_api.db_models import NoteModel
from notedown_api.extensions import db
from notedown_api.parsers import notes_parser
from notedown_api.utils import token_required

notes_namespace = Namespace('notes', description='Notes related operations')

note_schema = notes_namespace.model(
    'note_schema',
    {
        "id": fields.Integer,
        "text": fields.String,
        "date_created": fields.DateTime,
        "date_edited": fields.DateTime,
    }
)


@notes_namespace.route("/<id>")
class Notes(Resource):

    @notes_namespace.marshal_with(note_schema)
    @notes_namespace.expect(notes_parser)
    @notes_namespace.doc(security="apiKey")
    # @token_required
    def post(self, id):
        """Edit a given note.

        Args:
            id: Note's id.

        Returns:
            NoteModel modified.
        """
        args = notes_parser.parse_args()
        note = db.session.query(NoteModel).filter_by(id=id).first()

        if note is not None:
            note.text = args.text
            note.date_edited = datetime.utcnow()
            db.session.add(note)
            db.session.commit()
            return note
        else:
            return make_response(jsonify(message="That note does not exists"), 400)

    @notes_namespace.marshal_with(note_schema)
    def get(self, id):
        """Get an specific note.

        Args:
            id: Note's id.

        Returns:
            NoteModel retrieved.
        """
        note = db.session.query(NoteModel).filter_by(id=id).first()
        return note

    @notes_namespace.marshal_with(note_schema)
    def delete(self, id):
        """Delete a given note.

        Args:
            id: Note's id.

        Returns:
            NoteModel deleted.
        """
        note = db.session.query(NoteModel).filter_by(id=id).first()
        db.session.delete(note)
        db.session.commit()
        return note


@notes_namespace.route("/")
class Notes(Resource):

    @notes_namespace.marshal_list_with(note_schema)
    def get(self) -> list:
        """Get all notes.

        Returns:
            List with all notes on the database.
        """
        notes = db.session.query(NoteModel).all()
        return notes

    @notes_namespace.marshal_with(note_schema)
    @notes_namespace.expect(notes_parser)
    def post(self):
        """Add a note to the database.

        Returns:
            NoteModel added to the database.
        """
        args = notes_parser.parse_args()
        text = args.text
        note = NoteModel(
            text=text,
            date_created=datetime.utcnow(),
            date_edited=datetime.utcnow()
        )
        db.session.add(note)
        db.session.commit()
        return note
