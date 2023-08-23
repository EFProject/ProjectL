from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
from models.event import db
from flask_login import login_user, current_user, logout_user


def login():
    if current_user.is_authenticated:
        return jsonify(message='Sei autenticato'), 200
    # login code goes here
    email = request.json['email']
    password = request.json['password']
    remember = True if request.json['remember'] else False
    user = User.query.filter_by(email=email).first()

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user or not check_password_hash(user.password, password):
        return 'Wrong data!' # if the user doesn't exist or password is wrong, reload the page

    # if the above check passes, then we know the user has the right credentials
    login_user(user, remember=remember)
    return 'Welcome strunz! (30 grazie :))'

def signup():
    email = request.json['email']
    name = request.json['name']
    password = request.json['password']

    user = User.query.filter_by(email=email).first() # if this returns a user, then the email already exists in database

    if user: # if a user is found, we want to redirect back to signup page so user can try again
        return 'Already exist!'

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return 'Welcome!'

def logout():
    logout_user()
    return 'Addio pezzo di merda :('

def get_users():
    try:
        users = User.query.order_by(User.id.asc()).all()
        user_list = []
        for user in users:
            user_list.append(user.serialize)
        
        #if user_list:
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
    try:
        user = User.query.filter_by(id=user_id).one()  # Retrieve the user instance using .one()
        if not user:
            return jsonify({"message": "user not found"}), 404
        
        if User.query.filter_by(email=new_email).first():
            return jsonify({"message": "mail already exist!"}), 404
        
        user.email = new_email
        user.name = new_name
        user.password = generate_password_hash(new_password, method='sha256')
        
        db.session.commit()
        return jsonify({"message": "user updated successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500

#delete an user
def delete_user(user_id):
    try:
        user = User.query.filter_by(id=user_id).one()
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "user deleted successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500