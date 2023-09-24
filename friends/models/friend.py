from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Friend(db.Model):
    __tablename__ = 'friends'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    friend_id = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"Friend: {self.id, self.user_id, self.friend_id, self.status}"

    def __init__(self, user_id, friend_id, status):
        self.user_id = user_id
        self.friend_id = friend_id
        self.status = status

    @property
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "friend_id": self.friend_id,
            "status": self.status
        }
