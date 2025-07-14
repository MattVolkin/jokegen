// app.js - JokeGen Website Skeleton

// TODO: Set your backend API endpoint
const API_BASE_URL = 'http://localhost:5000';

// TODO: Get references to HTML elements
const jokeDisplay = document.getElementById('joke-display');
const randomJokeBtn = document.getElementById('random-joke-btn');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const jokeAudio = document.getElementById('joke-audio');
const autoplayCheckbox = document.getElementById('autoplay-audio');

// TODO: Add click event listener for random joke button
randomJokeBtn.addEventListener('click', async () => {
<<<<<<< HEAD
    try {
        // Show loading state
        jokeDisplay.textContent = 'Loading...';
        
        // Fetch random joke from backend
        const response = await fetch(`${API_BASE_URL}/random`);
        const joke = await response.json();
        
        // Display the joke text
        jokeDisplay.textContent = joke.joke_text;
        
        // Show/hide audio player if joke has audio
        if (joke.audio_file_path) {
            jokeAudio.src = joke.audio_file_path;
            jokeAudio.style.display = 'block';
            // Only play if the checkbox is checked
            if (autoplayCheckbox.checked) {
                jokeAudio.play().catch((err) => {
                    console.warn('Audio playback was prevented:', err);
                });
            }
        } else {
            jokeAudio.style.display = 'none';
            jokeAudio.src = '';
        }
    } catch (error) {
        jokeDisplay.textContent = 'Error loading joke';
        console.error('Error:', error);
    }
=======
    // TODO: Fetch random joke from backend
    // TODO: Display the joke text
    // TODO: Show/hide audio player if joke has audio
>>>>>>> parent of ece4ba1 (frontend started)
});

// TODO: Add submit event listener for search form
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const term = searchInput.value.trim();
    if (!term) return;
    
    // TODO: Fetch search results from backend
    // TODO: Display search results
});

// TODO: Add any additional functionality you want 