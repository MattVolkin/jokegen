// app.js - JokeGen Website Skeleton

// Get references to HTML elements
const jokeDisplay = document.getElementById('joke-display');
const randomJokeBtn = document.getElementById('random-joke-btn');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const jokeAudio = document.getElementById('joke-audio');

// TODO: Set your backend API endpoint
const API_BASE_URL = 'http://localhost:5000';

// TODO: Add click event listener for random joke button
randomJokeBtn.addEventListener('click', async () => {
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
        } else {
            jokeAudio.style.display = 'none';
        }
    } catch (error) {
        jokeDisplay.textContent = 'Error loading joke';
        console.error('Error:', error);
    }
});

// TODO: Add submit event listener for search form
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const term = searchInput.value.trim();
    if (!term) return;
    
    try {
        // Show loading state
        searchResults.innerHTML = 'Searching...';
        
        // Fetch search results from backend
        const response = await fetch(`${API_BASE_URL}/search?term=${encodeURIComponent(term)}`);
        const data = await response.json();
        
        // Display search results
        if (data.jokes && data.jokes.length > 0) {
            searchResults.innerHTML = data.jokes.map(joke => 
                `<div class="joke-result">${joke.joke_text}</div>`
            ).join('');
        } else {
            searchResults.innerHTML = 'No jokes found';
        }
    } catch (error) {
        searchResults.innerHTML = 'Error searching jokes';
        console.error('Error:', error);
    }
});

// TODO: Add any additional functionality you want 