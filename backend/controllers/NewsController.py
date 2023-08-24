from datetime import datetime

from flask import jsonify, request

from models.news import News, db


#get all news
def get_allNews():
    try:
        allNews = News.query.order_by(News.id.asc()).all()
        news_list = []
        for news in allNews:
            news_list.append(news.serialize)
        
        #if news_list:
        return {'news': news_list}
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "No news found"}), 404

#create an news
def create_news():
    try:
        title = request.json['title']
        description = request.json['description']
        imageUrl = request.json['imageUrl']
        news = News(title,description,imageUrl)
        db.session.add(news)
        db.session.commit()
        return news.serialize
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500

#get single news
def get_news(news_id):
    try:
        news = News.query.filter_by(id=news_id).one()
        formatted_news = news.serialize
        return {'news': formatted_news}
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return 'No News ' + str(news_id) + ' exists', 404


#edit an news
def update_news(news_id):
    try:
        news = News.query.filter_by(id=news_id).one()  # Retrieve the news instance using .one()
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

#delete an news
def delete_news(news_id):
    try:
        news = News.query.filter_by(id=news_id).one()
        db.session.delete(news)
        db.session.commit()
        return jsonify({"message": "News deleted successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500
