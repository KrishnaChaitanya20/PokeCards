from flask import Blueprint, jsonify, request
from database import mongo, redis
from bson.objectid import ObjectId
import uuid
import json


'''
schema for object in queue
{
    "playerId": string,
    "level": int
    "status": string
}

schema for game object
{
    "game_id": uuid,
    "player1": "string",
    "player1_cards": list[card],
    "onfield1": card,

    "player2": "string", 
    "player2_cards": list[card],
    "onfield2": card,

    "turn": int,
    "timeout": int,
    "status": "string"
}
'''


game_service = Blueprint('game_service', __name__)
types = ['normal','fire', 'water','grass', 'flying','fighting','poison','ground','rock','bug','ghost','electric','psychic','ice','dragon','dark','steel','fairy']
timeout=20
attack_multiplier = {
    ('water', 'fire'): 2,
    ('water','grass'): 0.5,
    ('fire','water'): 0.5,
    ('fire','grass'): 2,
    ('grass','fire'): 0.5,
    ('grass','water'): 2,
    ('electric','water'): 2,
    ('electric','ground'): 0.5    
}

def get_multiplier(attacker, defender):
    if (attacker, defender) in attack_multiplier:
        return attack_multiplier[(attacker, defender)]
    if (defender, attacker) in attack_multiplier:
        return 1/attack_multiplier[(defender, attacker)]
    return 1


############################################

@game_service.route('/game/redis', methods=['GET'])
def get_keys():
    keys = redis.keys()
    keys = [key.decode('utf-8') for key in keys]
    res = {}
    for key in keys:
        val=json.loads(redis.get(key))
        res[key]=val
    return jsonify(res)

############################################

@game_service.route('/game/mongo', methods=['GET'])
def get_mongo():
    games = mongo.db.games.find({}, {"_id": 0})
    res = {}
    for game in games:
        res[game['game_id']] = game
    return jsonify(res)

############################################
    
@game_service.route('/game/queue', methods=['POST'])
def queue():
    data = request.get_json()
    player_id = data['playerId']
    level = data['level']
    queue = redis.get('queue')
    #if queue empty create new queue
    if queue is None: 
        queue = []
        queue.append({"playerId": player_id, "level": level, "status": "waiting"})
        redis.set('queue', json.dumps(queue))
        return jsonify({"status": "waiting"})
    else: # if queue not empty check if player is already in queue
        queue=json.loads(queue)
        for player in queue:
            if player['playerId'] == player_id and player['status'] == "waiting": #if player is already in queue return waiting
                return jsonify({"status": "waiting"})
            elif player['playerId'] == player_id and player['status'] == "matched": #if player is already matched return game_id
                queue.remove(player)
                redis.set('queue', json.dumps(queue))
                return jsonify({"status": "matched", "game_id": player['game_id']})
            
        #if player not in queue check if there is a match
        for opponent in queue:
            if abs(opponent['level'] - level)<5 and opponent['status'] == "waiting": #if there is a match
                game_id = str(uuid.uuid4())
                opponent['status'] = "matched"
                opponent['game_id'] = game_id
                redis.set('queue', json.dumps(queue))
                gameObj = {
                    "game_id": game_id,
                    "player1": player_id,
                    "player1_cards": [],
                    "onfield1": None,
                    "player2": opponent['playerId'],
                    "player2_cards": [],
                    "onfield2": None,
                    "turn": player_id,
                    "timeout": timeout,
                    "status": "playing"
                }
                redis.set(game_id, json.dumps(gameObj))
                mongo.db.games.insert_one(gameObj)
                return jsonify({"status": "matched", "game_id": game_id})
    queue.append({"playerId": player_id, "level": level, "status": "waiting"}) #if no match add player to queue
    return jsonify({"status": "waiting"})

#######################################################

@game_service.route('/game/init_match', methods=['Post'])
def init_match():
    data = request.get_json()
    game_id = data['game_id']
    game = redis.get(game_id)

    if game is None: #if game not in redis get from mongo
        game = mongo.db.games.find_one({"game_id": game_id})
        if game is None:
            return jsonify({"status": "not found"})
        redis.set(game_id, json.dumps(game))
    else: #if game in redis convert to dict
        game = json.loads(game)

    player_id = data['player_id']
    player_cards = data['player_cards']
    if game['player1'] == player_id:
        game['player1_cards'] = player_cards
        game['onfield1'] = player_cards[0]
    else:
        game['player2_cards'] = player_cards
        game['onfield2'] = player_cards[0]

    redis.set(game_id, json.dumps(game))
    return jsonify({"status": "success"})

#######################################################

@game_service.route('/game/move', methods=['POST'])
def move():
    #Gather data from request
    data = request.get_json()
    game_id = data['game_id']
    player_id = data['player_id']
    move= data['move']

    #Get game object from redis or mongo
    game = redis.get(game_id)
    if game is None:
        game = mongo.db.games.find_one({"game_id": game_id})
        if game is None:
            return jsonify({"status": "not found"})
        redis.set(game_id, json.dumps(game))
    else:
        game = json.loads(game)

    #Check if game is over
    if game['status'] != "playing":
        return jsonify({"status": "game over"})
    else:
        #Check if it is player's turn
        if game['turn'] != player_id:
            game['timeout'] -= 5
            #Check if player has timed out
            if(game['timeout'] <= 0):
                game['status'] = "game over"
                if player_id == game['player1']:
                    game['winner'] = game['player2']
                else:
                    game['winner'] = game['player1']
                redis.set(game_id, json.dumps(game))
                mongo.db.games.update_one({"game_id": game_id}, {"$set": {"status": "game over", "winner": game['winner']}})
                return jsonify({"status": "timeout", "winner": game['winner']})
            
            redis.set(game_id, json.dumps(game))
            return jsonify({"status": "not your turn"})
        else:
            #set player_cards and onfield based on player_id
            if player_id == game['player1']:
                player_cards = game['player1_cards']
                onfield = game['onfield1']
            else:
                player_cards = game['player2_cards']
                onfield = game['onfield2']
            
            #Check if player wants to quit
            if move=='quit':
                game['status'] = "game over"
                if player_id == game['player1']:
                    game['winner'] = game['player2']
                else:
                    game['winner'] = game['player1']
                redis.set(game_id, json.dumps(game))
                mongo.db.games.update_one({"game_id": game_id}, {"$set": {"status": "game over", "winner": game['winner']}})
                return jsonify({"status": "quit", "winner": game['winner']})

            #Check if move is swap
            if move == 'swap':
                swap_to=request['swap_to']
                game[onfield]=player_cards[swap_to]
                game['turn'] = game['player1'] if player_id == game['player2'] else game['player2']
                game['timeout'] = timeout
                redis.set(game_id, json.dumps(game))
                return jsonify({"status": "success"})
            
            #Check if move is valid
            if move not in onfield['moves']:
                return jsonify({"status": "invalid move"})
            
            #if move is attack
            else:
                attacker = onfield
                defender = game['onfield1'] if player_id == game['player2'] else game['onfield2']
                attacker_type = attacker['type']
                defender_type = defender['type']
                multiplier = get_multiplier(attacker_type, defender_type)
                damage = attacker['power'] * multiplier
                defender['hp'] -= damage
                if(defender['hp'] > 0):
                    game['turn'] = game['player1'] if player_id == game['player2'] else game['player2']
                    game['timeout'] = timeout
                    redis.set(game_id, json.dumps(game))
                    return jsonify({"status": "success"})
                
                opponent = game['player1'] if player_id == game['player2'] else game['player2']
                opponent_cards = game['player1_cards'] if player_id == game['player2'] else game['player2_cards']
                #check if defender is dead and player has more cards
                if defender['hp'] <= 0 and len(opponent_cards) > 0:
                    opponent_cards.remove(defender)
                    game['onfield1'] = opponent_cards[0] if player_id == game['player1'] else game['onfield1']
                    game['onfield2'] = opponent_cards[0] if player_id == game['player2'] else game['onfield2']

                    game['turn'] = game['player1'] if player_id == game['player2'] else game['player2']
                    game['timeout'] = timeout
                    redis.set(game_id, json.dumps(game))
                    return jsonify({"status": "success"})
                #check if defender is dead and player has no more cards
                elif defender['hp'] <= 0 and len(opponent_cards) == 0:
                    game['status'] = "game over"
                    game['winner'] = player_id
                    redis.set(game_id, json.dumps(game))
                    mongo.db.games.update_one({"game_id": game_id}, {"$set": {"status": "game over", "winner": game['winner']}})
                    return jsonify({"status": "success", "winner": game['winner']})
                else:
                    return jsonify({"status": "error"})