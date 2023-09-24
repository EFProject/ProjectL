from flask import Blueprint
from controllers.FriendController import get_friends, get_requests, cancel_friend, create_request, accept_request, refuse_request
friend_bp = Blueprint('friend', __name__)

friend_bp.route('/<int:user_id>', methods=['GET'])(get_friends)
friend_bp.route('/requests/<int:friend_id>', methods=['GET'])(get_requests)
friend_bp.route('/<int:friend_id>/cancel_friend',
                methods=['DELETE'])(cancel_friend)
friend_bp.route('/create_request', methods=['POST'])(create_request)
friend_bp.route('<int:request_id>/accept_request',
                methods=['PUT'])(accept_request)
friend_bp.route('<int:request_id>/delete_request',
                methods=['DELETE'])(refuse_request)
