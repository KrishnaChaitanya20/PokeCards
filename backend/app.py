from flask import Flask, jsonify
from database import mongo,redis
from Card.CardService import card_service
from User.UserService import user_service
from Game.GameService import game_service
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"]=os.environ.get('MONGO_URI')
mongo.init_app(app)
app.config["REDIS_URL"]=os.environ.get('REDIS_URL')
redis.init_app(app)


# Register blueprints here
app.register_blueprint(card_service)
app.register_blueprint(user_service)
app.register_blueprint(game_service)

@app.route('/', methods=['GET'])
def home():
    return jsonify({'response': 'Hello, World!'})

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'response': 'pong!'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)