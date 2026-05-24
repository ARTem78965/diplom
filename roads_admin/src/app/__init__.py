import os

from datetime import timedelta
from flask import Flask
from flask import jsonify
from flask import make_response

from .extensions import register_extensions
from .migrations import db_init

UPLOAD_FOLDER = './src/app/recognition/img'
SECRET_KEY = os.urandom(32)

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = SECRET_KEY

app.config['SESSION_COOKIE_HTTPONLY'] = False
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False
app.config['SESSION_COOKIE_NAME'] = 'flask_session'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=1)
app.config['SESSION_REFRESH_EACH_REQUEST'] = True
app.config['CSRF_COOKIE_HTTPONLY'] = True
app.config['CSRF_COOKIE_SECURE'] = True
app.config['CSRF_COOKIE_SAMESITE'] = 'Lax'

register_extensions(app)
db_init(app)

@app.after_request
def set_security_headers(response):
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    
    return response

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': 'Bad Request'}), 400)


@app.errorhandler(401)
def bad_request(error):
    return make_response(jsonify({'error': 'Unauthorized'}), 401)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not Found'}), 404)


@app.errorhandler(422)
def not_found_args(error):
    return make_response(jsonify({'error': 'Unprocessable Entity'}), 422)
