from flask import Flask
from flask_cors import CORS
from os import environ
import os
from dotenv import load_dotenv, find_dotenv
from config import ApplicationConfig

from models.tickets import db
from routes.tickets_bp import tickets_bp
from sqlalchemy.sql import text


app = Flask(__name__)
CORS(app, supports_credentials=True)

load_dotenv(find_dotenv())

app.config['basedir'] = os.path.abspath(os.path.dirname(__file__))

app.config.from_object(ApplicationConfig)

db.init_app(app)
app.register_blueprint(tickets_bp, url_prefix='/tickets')


@app.route("/", methods=['GET'])
def home():
    return "Tickets Server is up"


if __name__ == "__main__":
    with app.app_context():
            
        db.create_all()

    app.debug = True
    app.run(host='0.0.0.0', port=5002)
