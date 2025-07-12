# JokeGen Website Skeleton

This is the frontend skeleton for the JokeGen project.

## Structure
- `index.html`: Main HTML file
- `style.css`: Basic styles  
- `app.js`: Handles frontend logic and API calls

## Getting Started
Open `index.html` in your browser to view the static site.

## Your Tasks

### 1. **API Integration** (`app.js`)
- Set the correct `API_BASE_URL` to your backend
- Implement `fetch()` calls to your backend endpoints
- Handle API responses and errors

### 2. **Random Joke Feature**
- Fetch joke from `GET /random`
- Display joke text in `#joke-display`
- Show/hide audio player based on `audio_file_path`

### 3. **Search Feature**
- Fetch results from `GET /search?term=keyword`
- Display search results in `#search-results`
- Handle empty results

### 4. **Audio Playback**
- Set audio source when joke has audio
- Show/hide audio controls

### 5. **Error Handling**
- Handle network errors
- Show loading states
- Display user-friendly error messages

### 6. **Styling** (`style.css`)
- Customize colors, fonts, layout
- Add animations and transitions
- Make it responsive

## API Response Format
```json
// Random joke response:
{
  "joke_text": "Why did the chicken cross the road?",
  "audio_file_path": "/path/to/audio.mp3"
}

// Search response:
{
  "jokes": [
    {"joke_text": "Joke 1", "audio_file_path": "/path1.mp3"},
    {"joke_text": "Joke 2", "audio_file_path": "/path2.mp3"}
  ]
}
```

## Backend Endpoints
- `GET http://localhost:5000/random`
- `GET http://localhost:5000/search?term=keyword`

---
This skeleton provides the structure - you implement the functionality! 