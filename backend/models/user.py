from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import UserMixin

from models.news import db

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))
    role = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f"User: {self.id, self.email, self.name, self.password, self.role}"

    def __init__(self, email, password, name):
        self.email = email
        self.password = password
        self.name = name

    @property
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            "name": self.name,
            "role": self.role
        }