from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class News(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(500))
    urlToImage = db.Column(db.String(255))
    published_at = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f"News: {self.title}"

    def __init__(self, title, description, urlToImage, published_at, user_id, url):
        self.title = title
        self.description = description
        self.urlToImage = urlToImage
        self.published_at = published_at
        self.user_id = user_id
        self.url = url

    @property
    def serialize(self):
        return {
            "title": self.title,
            "description": self.description,
            "id": self.id,
            "imageUrl": self.urlToImage,
            "published_at": self.published_at,
            "url": self.url,
            "user_id": self.user_id
        }
