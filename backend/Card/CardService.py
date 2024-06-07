from flask import Blueprint, jsonify, request
from database import mongo

card_service = Blueprint('card_service', __name__)
'''
Schema for card object
{
    "name": "string",
    "type": "string",
    "image": "imageurl",
    "hp": "int",
    "moves": {
        1: ["string", "int"],
        2: ["string", "int"],
        3: ["string", "int"],
        4: ["string", "int"]
    },
    "weakness": "string",
    "resistance": "string",
    "description": "string"
}

'''


@card_service.route('/cards', methods=['GET'])
def get_cards():
    limit = request.args.get('limit', default=20, type=int)
    start = request.args.get('start', default=0, type=int)
    
    
    cards = mongo.db.cards.find({}).skip(start).limit(limit)
    response = []
    for card in cards:
        card['_id'] = str(card['_id'])
        response.append(card)
    return jsonify(response)

@card_service.route('/cards', methods=['POST'])
def add_card():
    data = request.get_json()
    if(type(data) is list):
        for card in data:
            mongo.db.cards.insert_one(card)
        return jsonify({'response': 'Cards added successfully!'})
    elif(type(data) is dict):
        mongo.db.cards.insert_one(data)
        return jsonify({'response': 'Card added successfully!'})
    return jsonify({'response': 'Invalid request!'})

@card_service.route('/cards/<name>', methods=['GET'])
def get_card(name):
    card = mongo.db.cards.find_one({'name': name})
    card['_id'] = str(card['_id'])
    return jsonify(card)

@card_service.route('/cards/<name>', methods=['PUT'])
def update_card(name):
    card = request.get_json()
    mongo.db.cards.update_one
    (
        {'name': name},
        {'$set': card}
    )
    return jsonify({'response': 'Card updated successfully!'})

@card_service.route('/cards/<name>', methods=['DELETE'])
def delete_card(name):
    mongo.db.cards.delete_one({'name': name})
    return jsonify({'response': 'Card deleted successfully!'})



