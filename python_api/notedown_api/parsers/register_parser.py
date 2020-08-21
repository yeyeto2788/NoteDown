from flask_restx import reqparse

register_parser = reqparse.RequestParser()
register_parser.add_argument(
    'email', type=str,
    help='User\'s email',
    required=True
)
register_parser.add_argument(
    'password',
    type=str,
    help='User\'s password',
    required=True
)
