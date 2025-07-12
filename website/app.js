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

// TODO: Add click event listener for random joke button
randomJokeBtn.addEventListener('click', async () => {
    // TODO: Fetch random joke from backend
    // TODO: Display the joke text
    // TODO: Show/hide audio player if joke has audio
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