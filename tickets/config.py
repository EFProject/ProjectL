from dotenv import load_dotenv
import os

load_dotenv()


class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    JWT_SECRET = os.environ["JWT_SECRET"]
    TICKETS_API = os.environ["TICKETS_API"]

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True

    # connect to local db
    # SQLALCHEMY_DATABASE_URI = r"postgresql://postgres:{pass}@localhost:5432/projectL"
    SQLALCHEMY_DATABASE_URI = os.environ["DB_URL"]
