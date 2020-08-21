from datetime import datetime

from flask import jsonify, request
from flask_restx import Namespace, Resource, fields

from notedown_api.db_models import UserModel
from notedown_api.extensions import db
from notedown_api.parsers import register_parser
from notedown_api.utils import create_token

auth_namespace = Namespace('auth', description='Auth related operations')

user_schema = auth_namespace.model(
    "user_schema",
    {
        "id": fields.Integer,
        "email": fields.String,
    }
)


@auth_namespace.route("/login")
class Login(Resource):

    @auth_namespace.response(200, "Success")
    @auth_namespace.response(404, "Not found error")
    def post(self):
        """Login a given user.

        Returns:

        """
        auth = request.authorization
        token = None

        if auth and auth.username:
            user = db.session.query(UserModel)\
                .filter_by(email=auth.username)\
                .first()
            if user is not None and user.check_password(auth.password):
                token = create_token(user.email)
                user.last_login = datetime.utcnow()
                db.session.add(user)
                db.session.commit()

        return jsonify(token=token)


@auth_namespace.route("/register")
class RegisterUser(Resource):

    @auth_namespace.marshal_with(user_schema)
    @auth_namespace.expect(register_parser)
    @auth_namespace.response(200, "Success")
    @auth_namespace.response(404, "Not found error")
    def post(self):
        """Register a user on the database.

        """
        args = register_parser.parse_args()

        user = UserModel(
            email=args.email,
            last_login=datetime.utcnow()
        )
        user.set_password(args.password)
        db.session.add(user)
        db.session.commit()
        return user
