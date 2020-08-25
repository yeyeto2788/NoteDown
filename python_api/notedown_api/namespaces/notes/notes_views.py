import logging

from flask import make_response, jsonify, request
from flask_restx import Namespace, Resource, fields

from notedown_api.namespaces.notes.notes_controller import NotesController
from notedown_api.parsers import notes_parser
from notedown_api.utils import token_required

notes_namespace = Namespace('notes', description='Notes related operations')
logger = logging.getLogger()

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
@notes_namespace.doc(security={"apiKey": "X-API-KEY"})
class Notes(Resource):

    @notes_namespace.marshal_with(note_schema)
    @notes_namespace.expect(notes_parser)
    @token_required
    def post(self, id):
        """Edit a given note.

        Args:
            id: Note's id.

        Returns:
            NoteModel modified.
        """
        args = notes_parser.parse_args()
        token = request.headers['X-API-KEY']
        controller = NotesController()
        user_email = controller.get_email_from_token(token)
        note = controller.edit_user_note(email=user_email, note_id=id,
                                         note_text=args.text)

        if note is not None:
            return note
        else:
            return make_response(jsonify(message="That note does not exists"),
                                 400)

    @notes_namespace.marshal_with(note_schema)
    @token_required
    def get(self, id):
        """Get an specific note.

        Args:
            id: Note's id.

        Returns:
            NoteModel retrieved.
        """
        token = request.headers['X-API-KEY']
        controller = NotesController()
        user_email = controller.get_email_from_token(token)
        note = controller.get_user_note(email=user_email, note_id=id)
        return note

    @notes_namespace.marshal_with(note_schema)
    @token_required
    def delete(self, id):
        """Delete a given note.

        Args:
            id: Note's id.

        Returns:
            NoteModel deleted.
        """
        token = request.headers['X-API-KEY']
        controller = NotesController()
        user_email = controller.get_email_from_token(token)
        note = controller.delete_user_note(email=user_email, note_id=id)
        return note


@notes_namespace.route("/")
@notes_namespace.doc(security={"apiKey": "X-API-KEY"})
class Notes(Resource):

    @notes_namespace.marshal_list_with(note_schema)
    @token_required
    def get(self) -> list:
        """Get all notes.

        Returns:
            List with all notes on the database.
        """
        token = request.headers['X-API-KEY']
        controller = NotesController()
        user_email = controller.get_email_from_token(token)
        notes = controller.get_user_notes(email=user_email)
        return notes

    @notes_namespace.marshal_with(note_schema)
    @notes_namespace.expect(notes_parser)
    @token_required
    def post(self):
        """Add a note to the database.

        Returns:
            NoteModel added to the database.
        """
        args = notes_parser.parse_args()
        token = request.headers['X-API-KEY']
        controller = NotesController()
        user_email = controller.get_email_from_token(token)
        note = controller.add_user_note(email=user_email, note_text=args.text)
        return note
