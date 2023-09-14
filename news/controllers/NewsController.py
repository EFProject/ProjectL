from flask import request, jsonify
from datetime import datetime
import requests
from flask import jsonify, request
from models.news import News, db
import os
api_key = os.environ.get("NEWS_API")

# get all news


def get_allNews():
    try:
        country = request.args.get('country')

        q = request.args.get('q')

        pageSize = request.args.get('pageSize')
        if pageSize is not None and int(pageSize) <= 0:
            pageSize = None

        page = request.args.get('page')
        if page is not None and int(page) <= 0:
            page = None

        url = f'https://newsapi.org/v2/top-headlines?category=sports'

        if country:
            url += f'&country={country}'

        if q:
            url += f'&q={q}'

        if pageSize:
            url += f'&pageSize={pageSize}'

        if page:
            url += f'&page={page}'

        url += f'&apiKey={api_key}'

        response = requests.get(url)
        allNews = response.json()

        return jsonify(allNews)
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
