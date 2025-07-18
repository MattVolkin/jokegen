#!/usr/bin/env python3
"""
JokeGen Database Skeleton - Learning Project
Fill in the TODO sections to build your database skills
"""

from pathlib import Path
import sqlite3

def connect_to_database():
    # Place the database file in the backend folder
    backend_dir = Path(__file__).parent.parent / 'backend'
    backend_dir.mkdir(exist_ok=True)
    db_path = backend_dir / 'jokegen.db'
    connection = sqlite3.connect(str(db_path))
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

from pathlib import Path

def read_jokes_from_file(file_path="clean_base.txt", verbose=False):
    """Read jokes from the cleaned text file, grouping every section separated by a blank line as one joke."""
    if file_path is None:
        script_dir = Path(__file__).parent
        file_path = script_dir.parent / 'clean_base.txt'
    
    jokes = []
    joke = []

    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            if line.strip() == '':
                if joke:  # Avoid adding empty jokes
                    jokes.append(joke)
                    if verbose:
                        print("Joke added:", joke)
                    joke = []
            else:
                joke.append(line.strip())

    # Catch the last joke if the file doesn't end in a blank line
    if joke:
        jokes.append(joke)
        if verbose:
            print("Joke added:", joke)

    return jokes

def get_audio_files(audio_dir='../Joke audio'):
    audio_map = {}
    audio_dir = Path(audio_dir)
    for audio_file in audio_dir.glob('joke*.mp3'):
        # Extract the joke number from the filename
        num = int(audio_file.stem.replace('joke', ''))
        audio_map[num] = str(audio_file)
    return audio_map
    

def insert_joke(connection, joke_number, joke_text, audio_file_path):
    cursor = connection.cursor()
    cursor.execute('''
        INSERT INTO jokes (joke_number, joke_text, audio_file_path) 
        VALUES (?, ?, ?)
    ''', (joke_number, joke_text, audio_file_path))
    

def populate_database(connection):
    """TODO: Populate the database with all jokes"""
    print("Reading jokes from file...")
    jokes = read_jokes_from_file(verbose=True)
    print(f"Found {len(jokes)} jokes")
    
    print("Scanning audio files...")
    audio_files = get_audio_files()
    print(f"Found {len(audio_files)} audio files")
    
    print("Creating table...")
    create_jokes_table(connection)
    
    print("Inserting jokes...")
    for index, joke in enumerate(jokes):
        # Check if audio file exists for this joke
        audio_file_path = audio_files.get(index, None)
        insert_joke(connection, index, joke, audio_file_path)
    
    connection.commit()
    print("Database populated!")

def get_random_joke(connection):
    """TODO: Get a random joke from the database"""
    cursor = connection.cursor()
    cursor.execute('''SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1''')
    joke = cursor.fetchone()
    return joke

def search_jokes(connection, search_term):
    """TODO: Search jokes by text"""
    cursor = connection.cursor()
    cursor.execute('''SELECT * FROM jokes WHERE joke_text LIKE ?''', (f'%{search_term}%',))
    jokes = cursor.fetchall()
    return jokes
    
   

def get_joke_by_number(connection, joke_number):
    cursor = connection.cursor()
    cursor.execute('''SELECT * FROM jokes WHERE joke_number = ?''',(joke_number,))
    joke = cursor.fetchone()
    return joke

def main():
    """Main function to test your database"""
    try:
        # TODO: Connect to database
        connection = connect_to_database()
        
        # TODO: Populate database (uncomment when ready)
        populate_database(connection)
        
        # TODO: Test your functions
        random_joke = get_random_joke(connection)
        print(f"Random joke: {random_joke}")
        
        search_results = search_jokes(connection, "skeleton")
        print(f"Found {len(search_results)} skeleton jokes")
        
        if connection:
            connection.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    main()