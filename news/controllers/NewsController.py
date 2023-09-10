from datetime import datetime
import requests
from flask import jsonify, request
from models.news import News, db
import os
api_key = os.environ.get("NEWS_API")

# get all news


def get_allNews():
    try:
        url = f'https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey={api_key}'

        response = requests.get(url)
        allNews = response.json()

        return allNews
    except Exception as e:
        print("Exception:", e)
        return jsonify({"Error": e}), 404

# create an news


def create_news():
    try:
        title = request.json['title']
        description = request.json['description']
        imageUrl = request.json['imageUrl']
        news = News(title, description, imageUrl)
        db.session.add(news)
        db.session.commit()
        return news.serialize
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500

# get single news


def get_news(news_id):
    try:
        news = News.query.filter_by(id=news_id).one()
        formatted_news = news.serialize
        return {'news': formatted_news}
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return 'No News ' + str(news_id) + ' exists', 404


# edit an news
def update_news(news_id):
    try:
        # Retrieve the news instance using .one()
        news = News.query.filter_by(id=news_id).one()
        if not news:
            return jsonify({"message": "News not found"}), 404

        new_title = request.json.get('title')
        new_description = request.json.get('description')
        new_imagineUrl = request.json.get('imageUrl')
        news.title = new_title
        news.description = new_description
        news.imagineUrl = new_imagineUrl
        news.created_at = datetime.utcnow()  # Update the created_at field if needed

        db.session.commit()
        return jsonify({"message": "News updated successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500

# delete an news


def delete_news(news_id):
    try:
        news = News.query.filter_by(id=news_id).one()
        db.session.delete(news)
        db.session.commit()
        return jsonify({"message": "News deleted successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500
