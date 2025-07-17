#!/usr/bin/env python3
"""
JokeGen Backend API Skeleton
Connect your database to the frontend
"""

from flask import Flask, jsonify, request
from flask_cors import CORS

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
        print("Fetching random joke...")
        joke = get_random_joke(get_db_connection())
        print("Joke fetched:", joke)
        # Combine setup and punchline if stored separately
        if isinstance(joke[2], list) or isinstance(joke[2], tuple):
            joke_text = '\n'.join(joke[2])
        else:
            joke_text = joke[2]
        return jsonify({'joke_text': joke_text, 'audio_file_path': joke[3]})
    except Exception as e:
        print("Error in /random:", e)
        return jsonify({'error': str(e)}), 500

@app.route('/search', methods=['GET'])
def search_jokes_endpoint():
    try:
        term = request.args.get('term', '')
        if not term:
            return jsonify({'error': 'Search term required'}), 400
        connection= get_db_connection()
        jokes = search_jokes(connection,term)
        return jsonify({'jokes':[{'joke_text':joke[2],'audio_file_path':joke[3]}for joke in jokes]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/joke/<int:joke_number>', methods=['GET'])
def get_joke_by_number_endpoint(joke_number):
    try:
        connection = get_db_connection()        
        joke = get_joke_by_number(connection, joke_number)        
        return jsonify({'joke_text': joke[2], 'audio_file_path': joke[3]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)