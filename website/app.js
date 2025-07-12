// app.js - JokeGen Website Skeleton

// TODO: Replace with your backend API endpoint
const API_BASE_URL = 'http://localhost:5000';

const jokeDisplay = document.getElementById('joke-display');
const randomJokeBtn = document.getElementById('random-joke-btn');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const jokeAudio = document.getElementById('joke-audio');

// Show a random joke
randomJokeBtn.addEventListener('click', async () => {
    // TODO: Fetch a random joke from the backend
    // Example:
    // const res = await fetch(`${API_BASE_URL}/random`);
    // const joke = await res.json();
    // jokeDisplay.textContent = joke.joke_text;
    // if (joke.audio_file_path) {
    //     jokeAudio.src = joke.audio_file_path;
    //     jokeAudio.style.display = 'block';
    // } else {
    //     jokeAudio.style.display = 'none';
    // }
    jokeDisplay.textContent = 'TODO: Display a random joke here.';
    jokeAudio.style.display = 'none';
});

// Search jokes
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const term = searchInput.value.trim();
    if (!term) return;
    // TODO: Fetch search results from the backend
    // Example:
    // const res = await fetch(`${API_BASE_URL}/search?term=${encodeURIComponent(term)}`);
    // const jokes = await res.json();
    // searchResults.innerHTML = jokes.map(j => `<div>${j.joke_text}</div>`).join('');
    searchResults.innerHTML = '<div>TODO: Show search results here.</div>';
}); 