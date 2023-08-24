from flask import Blueprint
from controllers.UserController import login, signup, logout, get_users, get_user, update_user, delete_user,create_token

user_bp = Blueprint('auth', __name__)

user_bp.route('/', methods=['GET'])(get_users)
user_bp.route('/<int:user_id>', methods=['GET'])(get_user)
user_bp.route('/login', methods=['POST'])(login)
user_bp.route('/signup', methods=['POST'])(signup)
user_bp.route('/logout', methods=['POST'])(logout)
user_bp.route('/<int:user_id>/edit', methods=['PUT'])(update_user)
user_bp.route('/<int:user_id>', methods=['DELETE'])(delete_user)

user_bp.route('/token', methods=['POST'])(create_token)
