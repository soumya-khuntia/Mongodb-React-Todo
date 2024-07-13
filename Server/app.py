from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/todos_db"
mongo = PyMongo(app)
CORS(app)

@app.route('/todos', methods=['GET'])
def get_todos():
    todos = mongo.db.todos.find()
    result = []
    for todo in todos:
        result.append({'id': str(todo['_id']), 'text': todo['text'], 'completed': todo['completed']})
    return jsonify(result)

@app.route('/todos', methods=['POST'])
def add_todo():
    data = request.get_json()
    todo_id = mongo.db.todos.insert_one({'text': data['text'], 'completed': False}).inserted_id
    return jsonify({'id': str(todo_id), 'text': data['text'], 'completed': False})

@app.route('/todos/<id>', methods=['PUT'])
def update_todo(id):
    data = request.get_json()
    mongo.db.todos.update_one({'_id': ObjectId(id)}, {'$set': {'text': data['text'], 'completed': data['completed']}})
    return jsonify({'id': id, 'text': data['text'], 'completed': data['completed']})

@app.route('/todos/<id>', methods=['DELETE'])
def delete_todo(id):
    mongo.db.todos.delete_one({'_id': ObjectId(id)})
    return jsonify({'id': id})

if __name__ == '__main__':
    app.run(debug=True)
