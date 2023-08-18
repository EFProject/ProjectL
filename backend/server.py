from flask import Flask
from flask_cors import CORS
from os import environ

from models.event import db
from routes.event_bp import event_bp

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_URL')

db.init_app(app)
app.register_blueprint(event_bp, url_prefix='/events')

@app.route("/", methods=['GET'])
def home():
    return {"Backend Server is up"}

if __name__ == "__main__":
    #with app.app_context():
        #db.create_all()
    app.debug = True
    app.run(host='0.0.0.0', port=5000)