import os
from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)


class DevelopersApi(Resource):
    def get(self, id):
        return{"data": id}


api.add_resource(DevelopersApi, *["/developers/<string:id>", "/developer/<string:id>"])

if __name__ == "__main__":
    host = os.getenv('FLASK_RUN_HOST', '0.0.0.0')
    port = os.getenv('FLAS_RUN_PORT', 5000)
    app.run(host=host, port=port, debug=True)
