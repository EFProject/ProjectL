from flask import Blueprint

from controllers.NewsController import get_allNews, create_news, get_news, update_news, delete_news

news_bp = Blueprint('news_bp', __name__)

news_bp.route('/', methods=['GET'])(get_allNews)
news_bp.route('/create', methods=['POST'])(create_news)
news_bp.route('/<int:news_id>', methods=['GET'])(get_news)
news_bp.route('/<int:news_id>/edit', methods=['PUT'])(update_news)
news_bp.route('/<int:news_id>', methods=['DELETE'])(delete_news)
