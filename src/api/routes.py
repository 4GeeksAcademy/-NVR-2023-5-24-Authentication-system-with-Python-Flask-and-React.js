"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pet
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#GET Endpoints

@api.route("/pets", methods=["GET"])
@jwt_required()
def get_all_pets():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        pets = Pet.query.all()
        pets_serialized = [pet.serialize() for pet in pets]
        return jsonify({"pets": pets_serialized}), 200
    return jsonify({"Message": "User does not exist"}), 401

@api.route("/pets/<int:target_user_id>", methods=["GET"])
def get_all_pets_by_user(target_user_id):

    target_user = User.query.filter_by(id=target_user_id).first()
    if not target_user:
        return jsonify({"Message": "User not found"}), 404
    
    pets = Pet.query.filter_by(user_id=target_user.id).all()
    pets_serialized = [pet.serialize() for pet in pets]
    return jsonify({"pets": pets_serialized}), 200

@api.route("/users", methods=["GET"])
def get_all_users():
    users = User.query.all()
    users_serialized = [user.serialize() for user in users]
    return jsonify({"users": users_serialized}), 200
     

#POST endpoints

@api.route("/users", methods=["POST"])
def create_user():
    body= request.json
    user_already_exists = User.query.filter_by(email = body["email"] ).first()
    if user_already_exists:
        return jsonify({"Message":"Email already in use"}), 301
    new_user = User(email=body["email"] , password=body["password"], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"Message":"User sucessfully created"}), 200

@api.route("/login", methods=["POST"])
def login():
    body= request.json
    user = User.query.filter_by(email = body["email"], password= body["password"]  ).first()
    if user:
        token = create_access_token(identity=user.id)
        return jsonify({"Message":"token delivered", "token":token}), 200
    
    return jsonify({"Message":"Could not deliver token"}), 401