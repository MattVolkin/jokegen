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
const showMoreBtn = document.getElementById('show-more-btn');

let searchResultsData = [];  // Store all jokes returned by search
let visibleCount = 0;        // Track how many results are currently shown
const RESULTS_PER_BATCH = 5; // Number of jokes shown per click


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
    showMoreBtn.style.display = 'none';
} else if (data.jokes && data.jokes.length > 0) {
    searchResultsData = data.jokes;
    visibleCount = 0;
    searchResults.innerHTML = '';
    showMoreBtn.style.display = 'block';
    renderSearchBatch();
} else {
    searchResults.textContent = 'No jokes found.';
    showMoreBtn.style.display = 'none';
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

function renderSearchBatch() {
    const end = Math.min(visibleCount + RESULTS_PER_BATCH, searchResultsData.length);
    for (let i = visibleCount; i < end; i++) {
        const joke = searchResultsData[i];
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
    }
    visibleCount = end;

    // Hide button if all results are shown
    if (visibleCount >= searchResultsData.length) {
        showMoreBtn.style.display = 'none';
    }
}

showMoreBtn.addEventListener('click', renderSearchBatch);

// TODO: Add any additional functionality you want