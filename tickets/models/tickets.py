from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Tickets(db.Model):
    __tablename__ = 'tickets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), nullable=False)
    info = db.Column(db.String(1500))
    promoter = db.Column(db.String(255))
    urlToImage = db.Column(db.String(255))
    localDate = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f"Tickets: {self.name}"

    def __init__(self, name, info, promoter, urlToImage, localDate, user_id, url):
        self.name = name
        self.info = info
        self.promoter = promoter
        self.urlToImage = urlToImage
        self.localDate = localDate
        self.user_id = user_id
        self.url = url

    @property
    def serialize(self):
        return {
            "name": self.name,
            "info": self.info,
            "promoter": self.promoter,
            "id": self.id,
            "imageUrl": self.urlToImage,
            "localDate": self.localDate,
            "url": self.url,
            "user_id": self.user_id
        }
