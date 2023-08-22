from flask import Flask
from flask_cors import CORS
from os import environ
import os
from dotenv import load_dotenv, find_dotenv

from models.event import db
from routes.event_bp import event_bp

from routes.user_bp import user_bp

from flask_login import LoginManager


app = Flask(__name__)
CORS(app)

load_dotenv(find_dotenv())

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_URL')
app.config['SECRET_KEY'] = environ.get("SECRET_KEY")
print(environ.get("SECRET_KEY"))
#connect to local db
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:{pass}@localhost:5432/projectL'

db.init_app(app)
app.register_blueprint(event_bp, url_prefix='/events')
app.register_blueprint(user_bp, url_prefix='/users')


@app.route("/", methods=['GET'])
def home():
    return "Backend Server is up"


if __name__ == "__main__":
    with app.app_context():
        
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    app.debug = True
    app.run(host='0.0.0.0', port=5000)
