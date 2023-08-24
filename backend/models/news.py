from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class News(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    imageUrl = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"News: {self.title}"

    def __init__(self, title, description, imageUrl):
        self.title = title
        self.description = description
        self.imageUrl = imageUrl


    @property
    def serialize(self):
        return {
            "title": self.title,
            "description": self.description,
            "id": self.id,
            "imageUrl": self.imageUrl,
            "created_at": self.created_at
        }