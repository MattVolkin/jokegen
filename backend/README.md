# JokeGen Backend API Skeleton

This backend connects your database to the frontend using Flask.

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the server:**
   ```bash
   python app.py
   ```

3. **Test the API:**
   - Open http://localhost:5000/random in your browser
   - Should return a random joke (once implemented)

## Your Tasks

### 1. Database Connection
- Implement `get_db_connection()` function
- Connect to your `jokegen.db` file

### 2. API Endpoints
- **`/random`** - Get a random joke
- **`/search?term=keyword`** - Search jokes
- **`/joke/<number>`** - Get specific joke by number

### 3. Integration
- Import your database functions from `../Database/database_skeleton.py`
- Call your existing functions in each endpoint
- Return JSON responses

## API Response Format
```json
{
  "joke_text": "Why did the chicken cross the road?",
  "audio_file_path": "/path/to/audio.mp3"
}
```

## Frontend Connection
Your frontend will make requests to:
- `http://localhost:5000/random`
- `http://localhost:5000/search?term=skeleton`

---
This skeleton provides the API structure - you connect it to your database! 