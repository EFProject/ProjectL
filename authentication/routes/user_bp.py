from flask import Blueprint
from controllers.UserController import login, checkToken, signup, logout, get_users, get_user, get_user_by_email, update_user, delete_user

user_bp = Blueprint('auth', __name__)

user_bp.route('/', methods=['GET'])(get_users)
user_bp.route('/get_by_email/<string:email>',
              methods=['GET'])(get_user_by_email)
user_bp.route('/<int:user_id>', methods=['GET'])(get_user)
user_bp.route('/login', methods=['POST'])(login)
user_bp.route('/checkToken', methods=['GET'])(checkToken)
user_bp.route('/signup', methods=['POST'])(signup)
user_bp.route('/logout', methods=['POST'])(logout)
user_bp.route('/<int:user_id>/edit', methods=['PUT'])(update_user)
user_bp.route('/<int:user_id>', methods=['DELETE'])(delete_user)
