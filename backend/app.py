#!/usr/bin/env python3
"""
JokeGen Backend API Skeleton
Connect your database to the frontend
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to make requests

# TODO: Set the path to your database file
DATABASE_PATH = '../jokegen.db'

def get_db_connection():
    """TODO: Create a database connection"""
    # TODO: Connect to your SQLite database
    # TODO: Return the connection
    pass

@app.route('/random', methods=['GET'])
def get_random_joke():
    """TODO: Get a random joke from the database"""
    try:
        # TODO: Get database connection
        # TODO: Call your get_random_joke function from database_skeleton.py
        # TODO: Return the joke as JSON
        # Example: return jsonify({'joke_text': joke[2], 'audio_file_path': joke[3]})
        return jsonify({'error': 'TODO: Implement random joke endpoint'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/search', methods=['GET'])
def search_jokes():
    """TODO: Search jokes by keyword"""
    try:
        term = request.args.get('term', '')
        if not term:
            return jsonify({'error': 'Search term required'}), 400
        
        # TODO: Get database connection
        # TODO: Call your search_jokes function from database_skeleton.py
        # TODO: Return the results as JSON
        # Example: return jsonify({'jokes': [{'joke_text': j[2]} for j in jokes]})
        return jsonify({'error': 'TODO: Implement search endpoint'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/joke/<int:joke_number>', methods=['GET'])
def get_joke_by_number(joke_number):
    """TODO: Get a specific joke by number"""
    try:
        # TODO: Get database connection
        # TODO: Call your get_joke_by_number function from database_skeleton.py
        # TODO: Return the joke as JSON
        return jsonify({'error': 'TODO: Implement get joke by number endpoint'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 