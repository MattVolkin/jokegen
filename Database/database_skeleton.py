#!/usr/bin/env python3
"""
JokeGen Database Skeleton - Learning Project
Fill in the TODO sections to build your database skills
"""

import sqlite3
from pathlib import Path

def connect_to_database():
    connection = sqlite3.connect('jokegen.db')
    return connection

def create_jokes_table(connection):
    """TODO: Create the jokes table"""
    cursor = connection.cursor()
    cursor.execute('''
    CREATE TABLE jokes (
        id INTEGER PRIMARY KEY,
        joke_number INTEGER,
        joke_text TEXT,
        audio_file_path TEXT
    )
''')
   
    
    connection.commit()

def read_jokes_from_file(file_path='../base.txt'):
    """TODO: Read jokes from the text file"""
    jokes = []
    with open(file_path, 'r') as file:
        for line in file:
            line = line.strip()
            if line:
                jokes.append(line)

    return jokes

def get_audio_files(audio_dir='../Joke audio'):
    """TODO: Get list of audio files"""
    audio_files = {}
    audio_dir = Path(audio_dir)
    mp3_files = list(audio_dir.glob('*.mp3'))
    for mp3_file in mp3_files:
        filename = mp3_file.stem  # Remove extension
        if filename.startswith('joke'):
            joke_number = int(filename[4:])  # Remove 'joke' prefix
            audio_files[joke_number] = str(mp3_file)
    return audio_files
    
    # TODO:
    # 1. Use Path(audio_dir) to get the directory
    # 2. Find all .mp3 files using .glob('*.mp3')
    # 3. For each file, extract the joke number from filename
    #    (e.g., "joke42.mp3" -> 42)
    # 4. Store in dict: {joke_number: file_path}
    

def insert_joke(connection, joke_number, joke_text, audio_file_path):
    cursor = connection.cursor()
    cursor.execute('''
        INSERT INTO jokes (joke_number, joke_text, audio_file_path) 
        VALUES (?, ?, ?)
    ''', (joke_number, joke_text, audio_file_path))
    

def populate_database(connection):
    """TODO: Populate the database with all jokes"""
    print("Reading jokes from file...")
    jokes = read_jokes_from_file()
    print(f"Found {len(jokes)} jokes")
    
    print("Scanning audio files...")
    audio_files = get_audio_files()
    print(f"Found {len(audio_files)} audio files")
    
    print("Creating table...")
    create_jokes_table(connection)
    
    print("Inserting jokes...")
    # TODO: Loop through jokes and insert them
    # - For each joke, get the corresponding audio file
    # - Call insert_joke() for each one
    
    connection.commit()
    print("Database populated!")

def get_random_joke(connection):
    """TODO: Get a random joke from the database"""
    cursor = connection.cursor()
    
    # TODO: Write SELECT statement with ORDER BY RANDOM()
    # SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1
    
    return None

def search_jokes(connection, search_term):
    """TODO: Search jokes by text"""
    cursor = connection.cursor()
    
    # TODO: Write SELECT statement with LIKE
    # SELECT * FROM jokes WHERE joke_text LIKE ?
    # Use '%search_term%' for partial matches
    
    return []

def get_joke_by_number(connection, joke_number):
    """TODO: Get a specific joke by number"""
    cursor = connection.cursor()
    
    # TODO: Write SELECT statement
    # SELECT * FROM jokes WHERE joke_number = ?
    
    return None

def main():
    """Main function to test your database"""
    try:
        # TODO: Connect to database
        connection = connect_to_database()
        
        # TODO: Populate database (uncomment when ready)
        # populate_database(connection)
        
        # TODO: Test your functions
        # random_joke = get_random_joke(connection)
        # print(f"Random joke: {random_joke}")
        
        # search_results = search_jokes(connection, "skeleton")
        # print(f"Found {len(search_results)} skeleton jokes")
        
        if connection:
            connection.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    main() 