from flask import Flask
from flask_cors import CORS

from models.event import db
from routes.event_bp import event_bp

app = Flask(__name__)
CORS(app)

app.config.from_object('config')

db.init_app(app)
app.register_blueprint(event_bp, url_prefix='/events')

@app.route("/")
def home():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == "__main__":
    app.debug = True
    app.run()