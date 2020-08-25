from flask import jsonify, request, make_response
from flask_restx import Namespace, Resource, fields

from notedown_api.namespaces.auth.auth_controller import AuthController
from notedown_api.parsers import register_parser

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
    @auth_namespace.doc(security='basicAuth')
    def post(self):
        """Login a given user.

        Returns:

        """
        auth = request.authorization
        token = None
        status_code = 401
        controller = AuthController()

        if auth and auth.username:
            user = controller.get_user(auth.username)

            if user is not None and user.check_password(auth.password):
                token = controller.login_user(user)
                status_code = 200

        return make_response(jsonify(token=token), status_code)


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
        controller = AuthController()
        user = controller.add_user(email=args.email, password=args.password)
        return user
