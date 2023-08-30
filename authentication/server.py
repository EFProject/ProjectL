from flask import Flask
from flask_cors import CORS
from os import environ
import os
from dotenv import load_dotenv, find_dotenv
from config import ApplicationConfig

from models.user import db
from routes.user_bp import user_bp

from flask_login import LoginManager
from models.user import User

from flask_jwt_extended import JWTManager




app = Flask(__name__)
CORS(app, supports_credentials=True)

load_dotenv(find_dotenv())

app.config['basedir'] = os.path.abspath(os.path.dirname(__file__))

app.config.from_object(ApplicationConfig)

db.init_app(app)
app.register_blueprint(user_bp, url_prefix='/users')

jwt = JWTManager(app)

@app.route("/", methods=['GET'])
def home():
    return "Backend Server is up"


if __name__ == "__main__":
    with app.app_context():
        
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))
    
    app.debug = True
    app.run(host='0.0.0.0', port=5001)
