// app.js - JokeGen Website Skeleton

const API_BASE_URL = 'http://127.0.0.1:5000';

// Cookie utility functions and helpers
function getFavoritesFromCookies() {
    const match = document.cookie.match(/(?:^|; )favorites=([^;]*)/);
    return match ? JSON.parse(decodeURIComponent(match[1])) : [];
}

function setFavoritesToCookies(favorites) {
    const encoded = encodeURIComponent(JSON.stringify(favorites));
    document.cookie = `favorites=${encoded}; path=/; max-age=31536000`; // 1 year
}

window.addEventListener('DOMContentLoaded', () => {
    // DOM references
    const jokeDisplay = document.getElementById('joke-display');
    const randomJokeBtn = document.getElementById('random-joke-btn');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const jokeAudio = document.getElementById('joke-audio');
    const autoplayCheckbox = document.getElementById('autoplay-audio');
    const searchSection = document.getElementById('search-section');
    const showMoreBtn = document.getElementById('show-more-btn');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const favoritesSidebar = document.getElementById('favorites-sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const favoritesSidebarList = document.getElementById('favorites-sidebar-list');

    let searchResultsData = [];
    let visibleCount = 0;
    const RESULTS_PER_BATCH = 5;

    // Toggle favorite status and update sidebar
    function toggleFavorite(joke) {
        const jokeKey = joke.joke_text;
        let favorites = getFavoritesFromCookies();
        const isFavorited = favorites.some(fav => fav.joke_text === jokeKey);

        if (!isFavorited) {
            favorites.push(joke);
            setFavoritesToCookies(favorites);
        } else {
            favorites = favorites.filter(fav => fav.joke_text !== jokeKey);
            setFavoritesToCookies(favorites);
        }
        updateFavoritesUI();
    }

    // Render favorites in sidebar only
    function renderFavoritesSidebar(favorites) {
        favoritesSidebarList.innerHTML = '';
        if (favorites.length === 0) {
            favoritesSidebarList.innerHTML = '<p>No favorites yet.</p>';
            return;
        }
        favorites.forEach(joke => {
            const fav = document.createElement('div');
            fav.className = 'favorite-item';
            fav.style.display = 'flex';
            fav.style.alignItems = 'center';
            fav.style.justifyContent = 'space-between';
            fav.style.marginBottom = '1rem';

            const jokeText = document.createElement('span');
            jokeText.textContent = joke.joke_text;
            jokeText.style.flex = '1';
            jokeText.style.cursor = 'pointer';
            jokeText.addEventListener('click', () => displayJoke(joke));

            const heart = document.createElement('span');
            heart.textContent = '♥';
            heart.style.cursor = 'pointer';
            heart.style.fontSize = '1.5rem';
            heart.style.color = 'red';
            heart.style.marginLeft = '1rem';
            heart.classList.add('favorited');
            heart.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(joke);
                // Update heart color and class after toggling
                heart.style.color = isJokeFavorited(joke) ? 'red' : 'black';
                heart.classList.toggle('favorited', isJokeFavorited(joke));
            });

            fav.appendChild(jokeText);
            fav.appendChild(heart);
            favoritesSidebarList.appendChild(fav);
        });
    }

    function updateFavoritesUI() {
        const favorites = getFavoritesFromCookies();
        renderFavoritesSidebar(favorites);
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
            heart.style.color = isJokeFavorited(joke) ? 'red' : 'black';
            heart.style.marginLeft = '1rem';
            heart.classList.toggle('favorited', isJokeFavorited(joke));
            heart.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(joke);
                // Update heart color and class after toggling
                heart.style.color = isJokeFavorited(joke) ? 'red' : 'black';
                heart.classList.toggle('favorited', isJokeFavorited(joke));
            });

            mediaContainer.appendChild(audio);
            mediaContainer.appendChild(heart);
            jokeDisplay.appendChild(mediaContainer);
        }
    }

    function isJokeFavorited(joke) {
        const favorites = getFavoritesFromCookies();
        return favorites.some(fav => fav.joke_text === joke.joke_text);
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
                heart.style.color = isJokeFavorited(joke) ? 'red' : 'black';
                heart.style.marginLeft = '1rem';
                heart.classList.toggle('favorited', isJokeFavorited(joke));
                heart.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFavorite(joke);
                    // Update heart color and class after toggling
                    heart.style.color = isJokeFavorited(joke) ? 'red' : 'black';
                    heart.classList.toggle('favorited', isJokeFavorited(joke));
                });

                mediaContainer.appendChild(audio);
                mediaContainer.appendChild(heart);
                div.appendChild(mediaContainer);
            }

            searchResults.appendChild(div);
        }
        visibleCount = end;
        // Show or hide the "Show More Results" button
        showMoreBtn.style.display = (visibleCount < searchResultsData.length) ? 'block' : 'none';
    }

    // Hamburger menu logic
    hamburgerMenu.addEventListener('click', () => {
        favoritesSidebar.classList.add('open');
    });

    closeSidebar.addEventListener('click', () => {
        favoritesSidebar.classList.remove('open');
    });

    // Initial sidebar render
    updateFavoritesUI();

    // Add all event listeners here
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
            console.error(err);
        }
    });

    // Add submit event listener for search form
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const term = searchInput.value.trim();
        if (!term) return;

        searchResults.innerHTML = 'Searching...';
        searchSection.style.display = 'block'; // Show search section when searching

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
                renderSearchBatch();
                searchSection.style.display = 'block';
            } else {
                searchResults.textContent = 'No jokes found.';
                showMoreBtn.style.display = 'none';
            }
        } catch (err) {
            searchResults.textContent = 'Failed to fetch search results.';
            showMoreBtn.style.display = 'none';
            console.error(err);
        }
    });

    // Add click event listener for show more button
    showMoreBtn.addEventListener('click', renderSearchBatch);
});
