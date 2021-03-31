from flask import Flask, flash, redirect, render_template, request, session, abort
app = Flask(__name__)


@app.route("/", strict_slashes=False)
def index():
    return "Hello my friend, this is the index!"


@app.route("/members", strict_slashes=False)
def get_members():
    """
    Method to "simulate/test" a REST-API to get all members
    """

    return "[{\"id\":\"1\", \"name\":\"Santiago\", \"lastname\":\"Garcia\"}, \
        {\"id\":\"2\", \"name\":\"Monica\", \"lastname\":\"Hill\"}]"


@app.route("/members/<int:id>", strict_slashes=False)
def get_member_by_id(id):
    """
    Method to "simulate/test" a REST-API to get specific member
    """
    if (id == 1):
        return "{\"id\":\"1\", \"name\":\"Santiago\", \"lastname\":\"Garcia\"}"
    elif (id == 2):
        return "{\"id\":\"2\", \"name\":\"Monica\", \"lastname\":\"Hill\"}"
    else:
        return "Member with id {} not found.".format(id)


@app.route("/hello/<string:name>/", strict_slashes=False)
def hello(name):
    return render_template(
        'hello.html', name=name)


if __name__ == "__main__":
    app.run("0.0.0.0", debug=False)
