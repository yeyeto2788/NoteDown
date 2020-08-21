from flask_restx import reqparse

notes_parser = reqparse.RequestParser()

notes_parser.add_argument(
    'text',
    type=str,
    help='Text of the note',
    required=True,
)
