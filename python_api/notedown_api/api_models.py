from flask_restx import fields, OrderedModel

note_model = OrderedModel(
    'note_schema', {
        "id": fields.String,
        "text": fields.String,
        "date": fields.DateTime,
    })

user_model = OrderedModel(
    'user_model', {

    }
)
