from flask_restful import reqparse


def create_developers_request_parser():
    # Create developer's argument parser for the request body (specific params)
    developer_parser = reqparse.RequestParser()
    developer_parser.add_argument(
        "name", type=str, help="name of the developer is required", required=True)
    developer_parser.add_argument(
        "lastname", type=str, help="lastname of the developer is required", required=True)
    developer_parser.add_argument(
        "id_type", type=str, help="id_type of the developer is required", required=True)
    developer_parser.add_argument(
        "id_value", type=str, help="id_value of the developer is required", required=True)
    developer_parser.add_argument(
        "area", type=str, help="area of the developer is required", required=True)
    developer_parser.add_argument(
        "age", type=int, help="age of the developer is required", required=True)
    return developer_parser
