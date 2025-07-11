# SQL Reference for JokeGen Database

## Basic SQL Commands

### 1. CREATE TABLE
```sql
CREATE TABLE jokes (
    id INTEGER PRIMARY KEY,
    joke_number INTEGER,
    joke_text TEXT,
    audio_file_path TEXT
);
```

### 2. INSERT
```sql
INSERT INTO jokes (joke_number, joke_text, audio_file_path) 
VALUES (42, 'Why did the chicken cross the road?', 'Joke audio/joke42.mp3');
```

### 3. SELECT
```sql
-- Get all jokes
SELECT * FROM jokes;

-- Get specific columns
SELECT joke_number, joke_text FROM jokes;

-- Get random joke
SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1;

-- Search jokes
SELECT * FROM jokes WHERE joke_text LIKE '%skeleton%';

-- Get joke by number
SELECT * FROM jokes WHERE joke_number = 42;
```

### 4. UPDATE
```sql
UPDATE jokes 
SET joke_text = 'New joke text' 
WHERE joke_number = 42;
```

### 5. DELETE
```sql
DELETE FROM jokes WHERE joke_number = 42;
```

## Python SQLite Examples

### Connect to Database
```python
import sqlite3
connection = sqlite3.connect('jokegen.db')
cursor = connection.cursor()
```

### Execute SQL
```python
# Create table
cursor.execute('''
    CREATE TABLE jokes (
        id INTEGER PRIMARY KEY,
        joke_number INTEGER,
        joke_text TEXT,
        audio_file_path TEXT
    )
''')

# Insert data
cursor.execute('''
    INSERT INTO jokes (joke_number, joke_text, audio_file_path) 
    VALUES (?, ?, ?)
''', (42, 'Joke text here', 'audio_file.mp3'))

# Query data
cursor.execute('SELECT * FROM jokes WHERE joke_number = ?', (42,))
joke = cursor.fetchone()

# Get all results
cursor.execute('SELECT * FROM jokes')
all_jokes = cursor.fetchall()
```

### Commit Changes
```python
connection.commit()
connection.close()
```

## Common Patterns

### File Reading
```python
with open('../base.txt', 'r', encoding='utf-8') as f:
    for line in f:
        joke = line.strip().rstrip('\t')
        # Process joke
```

### Directory Scanning
```python
from pathlib import Path
audio_dir = Path('../Joke audio')
mp3_files = list(audio_dir.glob('*.mp3'))

for mp3_file in mp3_files:
    filename = mp3_file.stem  # Remove extension
    if filename.startswith('joke'):
        joke_number = int(filename[4:])  # Remove 'joke' prefix
```

### Error Handling
```python
try:
    cursor.execute('SELECT * FROM jokes')
    results = cursor.fetchall()
except sqlite3.Error as e:
    print(f"Database error: {e}")
except Exception as e:
    print(f"Error: {e}")
```

## Learning Order

1. **Start Simple**: Just create a table and insert one joke
2. **Add Reading**: Read jokes from the text file
3. **Add Audio**: Scan the audio directory
4. **Add Queries**: Write SELECT statements
5. **Add Search**: Use LIKE for text search
6. **Add Random**: Use ORDER BY RANDOM()

## Tips

- Always use `?` placeholders in Python to prevent SQL injection
- Remember to call `connection.commit()` after INSERT/UPDATE/DELETE
- Use `connection.close()` when done
- Test each function individually before combining them
- Use `../` to go up one directory level when accessing files outside the Database folder 