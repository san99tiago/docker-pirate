# Built-in imports
import os

# General module imports
from flask import Flask
from flask_restful import Api, Resource, reqparse, abort

# Own imports
import developers_orm
import developers_parser

# Main flask application and api wrapper
app = Flask(__name__)
api = Api(app)

# Create developer's argument parser for the request body (specific params)
developer_parser = developers_parser.create_developers_request_parser()


class SpecificDeveloperApi(Resource):
    def __init__(self):
        self.devs = developers_orm.DevelopersORM()

    def get(self, id_type, id_value):
        self.abort_if_developer_does_not_exist(id_type, id_value)
        return self.devs.get_developer_by_id_params(id_type, id_value), 200

    def post(self, id_type, id_value):
        args = developer_parser.parse_args()
        self.abort_if_params_do_not_match(id_type, id_value, args)
        self.abort_if_developer_exists(id_type, id_value)
        if (self.devs.create_developer(args) > 0):
            return {"message": "Created correctly"}, 201
        return {"message": "Error at the creation"}, 404

    def put(self, id_type, id_value):
        args = developer_parser.parse_args()
        self.abort_if_params_do_not_match(id_type, id_value, args)
        self.abort_if_developer_does_not_exist(id_type, id_value)
        if (self.devs.update_developer(args) > 0):
            return {"message": "Updated correctly"}, 201
        return {"message": "Nothing to update"}, 200

    def delete(self, id_type, id_value):
        self.abort_if_developer_does_not_exist(id_type, id_value)
        if (self.devs.delete_developer_by_id_params(id_type, id_value) > 0):
            return {"message": "Deleted ok"}, 204
        return {"message": "Error at the delete"}, 404

    def abort_if_developer_exists(self, id_type, id_value):
        if self.devs.developer_exists(id_type, id_value) == True:
            abort(404, message="Developer already exists.")

    def abort_if_developer_does_not_exist(self, id_type, id_value):
        if self.devs.developer_exists(id_type, id_value) == False:
            abort(404, message="Developer does not exist.")

    def abort_if_params_do_not_match(self, id_type, id_value, args):
        if (args["id_type"] != id_type or args["id_value"] != id_value):
            abort(404, message="Path and Body parameters do not match.")


class AllDevelopersApi(Resource):
    def __init__(self):
        self.devs = developers_orm.DevelopersORM()

    def get(self):
        return self.devs.get_all_developers(), 200


# Path for the API endpoint to specific developers based on id params
api.add_resource(
    SpecificDeveloperApi,
    *[
        "/developers/<string:id_type>/<string:id_value>",
        "/developer/<string:id_type>/<string:id_value>"
    ]
)

# Path for the API endpoint to all developers
api.add_resource(
    AllDevelopersApi,
    *[
        "/developers"
    ]
)


if __name__ == "__main__":
    host = os.getenv('FLASK_RUN_HOST', '0.0.0.0')
    port = os.getenv('FLASK_RUN_PORT', 5000)
    app.run(host=host, port=port, debug=True)
