from flask import request, jsonify
from models.friend import Friend, db
from sqlalchemy import or_


def get_friends(user_id):
    try:
        friends = Friend.query.filter(
            or_(Friend.user_id == user_id, Friend.friend_id == user_id),
            Friend.status == "accepted"
        ).all()

        friends_list = []
        for friend in friends:
            friends_list.append(friend.serialize)

        return {'friends': friends_list}
    except Exception as e:
        print("Exception:", e)
        return 'No Friends for the user ' + str(user_id) + ' exists', 404


def get_requests(friend_id):
    try:
        friends = Friend.query.filter_by(
            friend_id=friend_id, status="pending").all()

        friends_list = []
        for friend in friends:
            friends_list.append(friend.serialize)

        return {'friends': friends_list}
    except Exception as e:
        print("Exception:", e)
        return 'No Request for the user ' + str(friend_id) + ' exists', 404


def cancel_friend(friend_id):
    try:
        friend = Friend.query.filter_by(id=friend_id).one()
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"message": "Friendship deleted successfully"})
    except Exception as e:
        print("Exception:", e)
        return jsonify({"message": "Something went wrong"}), 500


def create_request():
    try:
        user_id = request.json['user_id']
        friend_id = request.json['friend_id']
        status = "pending"

        user = Friend.query.filter_by(
            user_id=user_id, friend_id=friend_id).first()
        if user:
            return jsonify({"message": "Already created!"}), 400
        friend = Friend(user_id, friend_id, status)
        db.session.add(friend)
        db.session.commit()
        return friend.serialize
    except Exception as e:
        print("Exception:", e)
        return jsonify({"message": e}), 500


def accept_request(request_id):
    try:
        request = Friend.query.filter_by(id=request_id).one()
        if not request:
            return jsonify({"message": "Request not found"}), 404

        request.status = "accepted"

        db.session.commit()
        return jsonify({"message": "Request accepted successfully"})
    except Exception as e:
        print("Exception:", e)
        return jsonify({"message": "Something went wrong"}), 500


def refuse_request(request_id):
    try:
        friend = Friend.query.filter_by(id=request_id).one()
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"message": "Request refused successfully"})
    except Exception as e:
        print("Exception:", e)
        return jsonify({"message": "Something went wrong"}), 500
