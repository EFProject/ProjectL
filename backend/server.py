from flask import Flask
from flask_cors import CORS
from os import environ

from models.event import db
from routes.event_bp import event_bp

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_URL')

#connect to local db
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:{pass}@localhost:5432/projectL'

db.init_app(app)
app.register_blueprint(event_bp, url_prefix='/events')


@app.route("/", methods=['GET'])
def home():
    return "Backend Server is up"


if __name__ == "__main__":
    with app.app_context():
        from sqlalchemy import inspect

        inspector = inspect(db.engine)
        if not inspector.has_table('events'):
            db.create_all()
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
