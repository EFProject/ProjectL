from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import UserMixin
import sys, os
sys.path.append(os.path.abspath('..'))
from backend import login_manager 


from models.event import db

@login_manager.user_loader
def load_user(user_id):
    # since the user_id is just the primary key of our user table, use it in the query for the user
    return User.query.get(int(user_id))

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