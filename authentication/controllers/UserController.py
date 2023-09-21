from flask import request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
from models.user import db
from flask_login import login_user
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


def login():

    email = request.json['email']
    password = request.json['password']
    remember = True if request.json['remember'] else False
    user = User.query.filter_by(email=email).first()

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user or not check_password_hash(user.password, password):
        # if the user doesn't exist or password is wrong, reload the page
        return jsonify({"message": "Wrong email or password!"}), 404

    # if the above check passes, then we know the user has the right credentials
    login_user(user, remember=remember)
    # create a token
    access_token = create_access_token(identity=email)

    return jsonify({"message": "Welcome back" + user.name + "!",
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "access_token": access_token}), 200


@jwt_required()
def checkToken():

    email = get_jwt_identity()

    return jsonify({"message": "Allow" + email}), 200


def signup():
    email = request.json['email']
    name = request.json['name']
    password = request.json['password']

    # if this returns a user, then the email already exists in database
    user = User.query.filter_by(email=email).first()

    if user:  # if a user is found, we want to redirect back to signup page so user can try again
        return jsonify({"message": "Email already exist!"}), 400

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = User(email=email, name=name,
                    password=generate_password_hash(password, method='sha256'))

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({"message": "Signup successfully!"}), 200


def logout():
    session.pop("user_id", None)
    return 'Bye :('


def get_users():
    try:
        users = User.query.order_by(User.id.asc()).all()
        user_list = []
        for user in users:
            user_list.append(user.serialize)

        # if user_list:
        return {'users': user_list}
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "No user found"}), 404


def get_user(user_id):
    try:
        user = User.query.filter_by(id=user_id).one()
        formatted_user = user.serialize
        return {'user': formatted_user}
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return 'No User ' + str(user_id) + ' exists', 404


def update_user(user_id):
    new_email = request.json['email']
    new_name = request.json['name']
    new_password = request.json['password']
    old_password_plaintext = request.json['oldPassword']
    try:
        # Retrieve the user instance using .one()
        user = User.query.filter_by(id=user_id).one()
        if not user:
            return jsonify({"message": "User not found"}), 404
        
        validPasswordHash = check_password_hash(user.password, old_password_plaintext)
        if not validPasswordHash:
            return jsonify({"message": "Current password is wrong"}), 404

        if User.query.filter_by(email=new_email).first():
            return jsonify({"message": "Mail already exist!"}), 404
        
        if new_email != '':
            user.email = new_email
        if new_name != '':
            user.name = new_name
        if new_password != '':
            user.password = generate_password_hash(new_password, method='sha256')

        db.session.commit()
        return jsonify({"message": "User updated successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500

# delete an user


def delete_user(user_id):
    old_password_plaintext = request.json['oldPassword']
    try:
        user = User.query.filter_by(id=user_id).one()

        validPasswordHash = check_password_hash(user.password, old_password_plaintext)
        if not validPasswordHash:
            return jsonify({"message": "Current password is wrong"}), 404

        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500
