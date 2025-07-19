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
const favoritesSection = document.getElementById('favorites-section');

let searchResultsData = [];  // Store all jokes returned by search
let visibleCount = 0;        // Track how many results are currently shown
const RESULTS_PER_BATCH = 5; // Number of jokes shown per click

function toggleFavorite(joke, heartElement) {
    const isFavorited = heartElement.classList.toggle('favorited');
    heartElement.style.color = isFavorited ? 'red' : 'black';

    const existing = favoritesSection.querySelector(`[data-id="${joke.id}"]`);

    if (isFavorited && !existing) {
        const fav = document.createElement('div');
        fav.className = 'favorite-item';
        fav.dataset.id = joke.id;
        fav.style.display = 'flex';
        fav.style.alignItems = 'center';
        fav.style.justifyContent = 'space-between';

        const jokeText = document.createElement('span');
        jokeText.textContent = joke.joke_text;
        jokeText.style.flex = '1';

        const heart = document.createElement('span');
        heart.textContent = '♥';
        heart.style.cursor = 'pointer';
        heart.style.fontSize = '1.5rem';
        heart.style.color = 'red';
        heart.style.marginLeft = '1rem';

        heart.addEventListener('click', () => toggleFavorite(joke, heart));

        fav.appendChild(jokeText);
        fav.appendChild(heart);
        favoritesSection.appendChild(fav);
    }

    if (!isFavorited && existing) {
        existing.remove();
    }
}

// Helper function to display a joke and handle audio
function displayJoke(joke) {
    jokeDisplay.innerHTML = '';

    const jokeText = document.createElement('p');
    jokeText.innerHTML = (joke.joke_text || 'No joke found.').replace(/\n/g, '<br>');
    jokeDisplay.appendChild(jokeText);

    if (joke.audio_file_path) {
        const mediaContainer = document.createElement('div');
        mediaContainer.style.display = 'flex';
        mediaContainer.style.alignItems = 'center';
        mediaContainer.style.justifyContent = 'space-between';

        const audio = document.createElement('audio');
        audio.src = joke.audio_file_path;
        audio.controls = true;
        audio.style.flex = '1';

        const heart = document.createElement('span');
        heart.textContent = '♥';
        heart.style.cursor = 'pointer';
        heart.style.fontSize = '1.5rem';
        heart.style.color = 'black';
        heart.style.marginLeft = '1rem';
        heart.addEventListener('click', () => toggleFavorite(joke, heart));

        mediaContainer.appendChild(audio);
        mediaContainer.appendChild(heart);
        jokeDisplay.appendChild(mediaContainer);
    }
}

function renderSearchBatch() {
    const end = Math.min(visibleCount + RESULTS_PER_BATCH, searchResultsData.length);
    for (let i = visibleCount; i < end; i++) {
        const joke = searchResultsData[i];
        const div = document.createElement('div');
        div.className = 'search-result';

        const jokeText = document.createElement('p');
        jokeText.textContent = joke.joke_text;
        div.appendChild(jokeText);

        if (joke.audio_file_path) {
            const mediaContainer = document.createElement('div');
            mediaContainer.style.display = 'flex';
            mediaContainer.style.alignItems = 'center';
            mediaContainer.style.justifyContent = 'space-between';

            const audio = document.createElement('audio');
            audio.src = joke.audio_file_path;
            audio.controls = true;
            audio.style.flex = '1';

            const heart = document.createElement('span');
            heart.textContent = '♥';
            heart.style.cursor = 'pointer';
            heart.style.fontSize = '1.5rem';
            heart.style.color = 'black';
            heart.style.marginLeft = '1rem';
            heart.addEventListener('click', () => toggleFavorite(joke, heart));

            mediaContainer.appendChild(audio);
            mediaContainer.appendChild(heart);
            div.appendChild(mediaContainer);
        }

        searchResults.appendChild(div);
    }
    visibleCount = end;
    if (visibleCount >= searchResultsData.length) {
        showMoreBtn.style.display = 'none';
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
        showMoreBtn.style.display = 'none';
    }
});

// Add click event listener for show more button
showMoreBtn.addEventListener('click', renderSearchBatch);

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
