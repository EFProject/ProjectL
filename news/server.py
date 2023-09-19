from flask import Flask
from flask_cors import CORS
from os import environ
import os
from dotenv import load_dotenv, find_dotenv
from config import ApplicationConfig

from models.news import db
from routes.news_bp import news_bp
from sqlalchemy.sql import text


app = Flask(__name__)
CORS(app, supports_credentials=True)

load_dotenv(find_dotenv())

app.config['basedir'] = os.path.abspath(os.path.dirname(__file__))

app.config.from_object(ApplicationConfig)

db.init_app(app)
app.register_blueprint(news_bp, url_prefix='/news')


@app.route("/", methods=['GET'])
def home():
    return "News Server is up"


if __name__ == "__main__":
    with app.app_context():
        with open('models/query/exist_table', 'r') as file:
            query_text = file.read()
        query = text(query_text)

        if not db.session.query(query).scalar():
            db.create_all()

            with open('models/query/fk_user', 'r') as file:
                query_text = file.read()

            query = text(query_text)
            db.session.execute(query)
            db.session.commit()
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
