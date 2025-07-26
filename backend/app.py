#!/usr/bin/env python3
"""
JokeGen Backend API Skeleton
Connect your database to the frontend
"""


from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Method 1: Add path and import

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'Database'))
from database_skeleton import get_random_joke, search_jokes, get_joke_by_number
import sqlite3


DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'jokegen.db')

def get_db_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    return connection

@app.route('/random', methods=['GET'])
def get_random_joke_endpoint():
    try:
        conn = get_db_connection()
        joke = get_random_joke(conn)
        conn.close()
        # Extract just the filename from the audio path
        audio_filename = os.path.basename(joke[3]) if joke[3] else None
        audio_file_path = f"/Joke audio/{audio_filename}" if audio_filename else None
        # Combine setup and punchline if needed
        joke_text = joke[2] if isinstance(joke[2], str) else '\n'.join(joke[2])
        return jsonify({'joke_text': joke_text, 'audio_file_path': audio_file_path})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/Joke audio/<filename>')
def serve_audio(filename):
    return send_from_directory('../website/Joke audio', filename)

@app.route('/')
def serve_index():
    return send_from_directory('../website', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('../website', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)

# Install dependencies
# RUN pip install flask flask-cors