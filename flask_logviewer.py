from flask import Flask, render_template, request, Response
from pygtail import Pygtail
import logging
import os
import sys
import time

app = Flask(__name__)

app.config["SECRET_KEY"] = "SECRETKEYSECRETKEYSECRETKEYSECRETKEYSECRETKEY"
app.config["DEBUG"] = os.environ.get("FLASK_DEBUG", True)
app.config["JSON_AS_ASCII"] = False

LOG_FILE = 'app.log'
log = logging.getLogger('__name__')
logging.basicConfig(filename=LOG_FILE, level=logging.DEBUG)


@app.route('/')
def entry_point():
    log.info("route =>'/env' - hit!")
    return render_template('base.html')


@app.route('/progress')
def progress():
    def generate():
        x = 0
        while x <= 100:
            yield "data:" + str(x) + "\n\n"
            x = x + 10
            time.sleep(0.5)
    return Response(generate(), mimetype='text/event-stream')


@app.route('/log')
def progress_log():
    def generate():
        for line in Pygtail(LOG_FILE, every_n=1):
            yield "data:" + str(line) + "\n\n"
            time.sleep(0.5)
    return Response(generate(), mimetype='text/event-stream')


@app.route('/env')
def show_env():
    log.info("route =>'/env' - hit")
    env = {}
    for k, v in request.environ.items():
        env[k] = str(v)
    log.info("route =>'/env' [env]:\n%s" % env)
    return env


if __name__ == '__main__':
    app.run(debug=True)
