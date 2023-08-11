from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Event(db.Model):
    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Event: {self.description}"

    def __init__(self, description):
        self.description = description

    @property
    def serialize(self):
        return {
            "description": self.description,
            "id": self.id,
            "created_at": self.created_at
        }