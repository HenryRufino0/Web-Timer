from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

SAVE_FILE = 'timers.json'

if not os.path.exists(SAVE_FILE):
    with open(SAVE_FILE, 'w') as f:
        json.dump([], f)

@app.route('/timers', methods=['GET'])
def get_timers():
    with open(SAVE_FILE, 'r') as f:
        timers = json.load(f)
    return jsonify(timers)

@app.route('/timers', methods=['POST'])
def add_timer():
    data = request.json
    with open(SAVE_FILE, 'r') as f:
        timers = json.load(f)
    timers.append(data)
    with open(SAVE_FILE, 'w') as f:
        json.dump(timers, f)
    return '', 204

@app.route('/timers/<label>', methods=['DELETE'])
def delete_timer(label):
    with open(SAVE_FILE, 'r') as f:
        timers = json.load(f)
    timers = [t for t in timers if t['label'] != label]
    with open(SAVE_FILE, 'w') as f:
        json.dump(timers, f)
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
