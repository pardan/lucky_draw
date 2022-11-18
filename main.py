from flask import Flask, render_template, request, jsonify
import lucky_draw2
import flask
from flask_cors import CORS
from werkzeug.utils import secure_filename
import json
import numpy

app = Flask(__name__,
            static_url_path='',
            static_folder='static',
            template_folder='templates')
CORS(app)


@app.route('/')
def test():
    yield str(lucky_draw2.main())

@app.route('/test2')
def test2():
    message = {'greeting': 'Hello from Flask!'}
    return jsonify(message)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
