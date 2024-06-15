from flask import Blueprint, request, jsonify
from database import mongo
from bson.objectid import ObjectId

admin_service = Blueprint('admin_service', __name__)

@admin_service.route('/isadmin', methods=['POST'])
def is_admin():
    data = request.get_json()
    admin = mongo.db.admins.find_one({'username':data['username'],'password': data['password']})
    if admin:
        return jsonify({'message': 'success','status':200})
    return jsonify({'message': 'Admin not found','status':404})

@admin_service.route('/admin', methods=['POST'])
def create_admin():
    data = request.get_json()
    mongo.db.admins.insert_one(data)
    return jsonify({'message': 'Admin created successfully'})