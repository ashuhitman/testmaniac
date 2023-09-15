from flask import Flask, request, jsonify

app = Flask(__name__)

app.route("/", methods=['GET'])
def book():
    return "books"

if __name__ == '__main__':
    app.run(debug=True)