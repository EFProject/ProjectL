from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost/projectL'
db = SQLAlchemy(app)

with app.app_context():
    db.create_all()


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    # created_at = db.Column(db.DateTime, nullable=False, defalut=datetime.utcnow)

    def __repr__(self):
        return f"Event: {self.description}"

    def __init__(self, description):
        self.description = description

# Members API Route


@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
