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
const jokeIdInput = document.getElementById('joke-id-input');
const jokeIdBtn = document.getElementById('joke-id-btn');

// Helper function to display a joke and handle audio
function displayJoke(joke) {
    jokeDisplay.innerHTML = (joke.joke_text || 'No joke found.').replace(/\n/g, '<br>');
    jokeAudio.style.display = 'block';
    if (joke.audio_file_path) {
        jokeAudio.src = joke.audio_file_path;
        jokeAudio.load();
        if (autoplayCheckbox.checked) {
            jokeAudio.play();
        }
    } else {
        jokeAudio.src = '';
        jokeAudio.load();
    }
}

// Add click event listener for random joke button
randomJokeBtn.addEventListener('click', async () => {
    jokeDisplay.textContent = 'Loading...';
    jokeAudio.style.display = 'none';
    try {
        const response = await fetch(`${API_BASE_URL}/random`);
        if (!response.ok) {
            jokeDisplay.textContent = `Error: ${response.status} ${response.statusText}`;
            return;
        }
        const data = await response.json();
        if (data.error) {
            jokeDisplay.textContent = 'Error: ' + data.error;
            jokeAudio.style.display = 'none';
        } else {
            displayJoke(data);
        }
    } catch (err) {
        jokeDisplay.textContent = 'Failed to fetch joke. Is the backend running?';
        jokeAudio.style.display = 'none';
    }
});

// Add submit event listener for search form
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const term = searchInput.value.trim();
    if (!term) return;

    searchResults.innerHTML = 'Searching...';
    try {
        const response = await fetch(`${API_BASE_URL}/search?term=${encodeURIComponent(term)}`);
        const data = await response.json();
        if (data.error) {
            searchResults.textContent = 'Error: ' + data.error;
        } else if (data.jokes && data.jokes.length > 0) {
            searchResults.innerHTML = '';
            data.jokes.forEach(joke => {
                const div = document.createElement('div');
                div.className = 'search-result';
                div.textContent = joke.joke_text;
                if (joke.audio_file_path) {
                    const audio = document.createElement('audio');
                    audio.src = joke.audio_file_path;
                    audio.controls = true;
                    div.appendChild(audio);
                }
                searchResults.appendChild(div);
            });
        } else {
            searchResults.textContent = 'No jokes found.';
        }
    } catch (err) {
        searchResults.textContent = 'Failed to fetch search results.';
    }
});

// Add click event listener for joke by ID button
jokeIdBtn.addEventListener('click', async () => {
    const jokeId = jokeIdInput.value.trim();
    if (!jokeId) return;
    jokeDisplay.textContent = 'Loading...';
    jokeAudio.style.display = 'none';
    try {
        const response = await fetch(`${API_BASE_URL}/joke/${jokeId}`);
        if (!response.ok) {
            jokeDisplay.textContent = `Error: ${response.status} ${response.statusText}`;
            return;
        }
        const data = await response.json();
        if (data.error) {
            jokeDisplay.textContent = 'Error: ' + data.error;
        } else {
            displayJoke(data);
        }
    } catch (err) {
        jokeDisplay.textContent = 'Failed to fetch joke by ID.';
    }
});

// TODO: Add any additional functionality you want