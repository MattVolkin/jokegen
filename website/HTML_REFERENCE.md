# HTML Reference Sheet for JokeGen Website

## **Basic HTML Structure**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Title</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Your content here -->
    <script src="app.js"></script>
</body>
</html>
```

## **Common Elements for Your Website**

### **Headers & Navigation**
```html
<header>
    <h1>JokeGen V2 cookies added</h1>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#search">Search</a></li>
        </ul>
    </nav>
</header>
```

### **Content Sections**
```html
<main>
    <section id="joke-section">
        <h2>Random Joke</h2>
        <div id="joke-display"></div>
        <button id="random-joke-btn">Get Random Joke</button>
    </section>

    <section id="search-section">
        <h2>Search Jokes</h2>
        <form id="search-form">
            <input type="text" id="search-input" placeholder="Search jokes...">
            <button type="submit">Search</button>
        </form>
        <div id="search-results"></div>
    </section>
</main>
```

### **Interactive Elements**
```html
<!-- Buttons -->
<button id="my-button">Click Me</button>
<button type="submit">Submit</button>
<button type="button" disabled>Disabled Button</button>

<!-- Forms -->
<form id="my-form">
    <input type="text" id="text-input" placeholder="Enter text...">
    <input type="email" id="email-input" placeholder="Enter email...">
    <input type="number" id="number-input" min="1" max="100">
    <textarea id="message" rows="4" placeholder="Enter message..."></textarea>
    <select id="category">
        <option value="">Choose category</option>
        <option value="dad-jokes">Dad Jokes</option>
        <option value="puns">Puns</option>
    </select>
</form>

<!-- Audio & Video -->
<audio id="joke-audio" controls>
    <source src="audio.mp3" type="audio/mpeg">
    Your browser doesn't support audio.
</audio>

<video id="joke-video" controls>
    <source src="video.mp4" type="video/mp4">
    Your browser doesn't support video.
</video>
```

### **Display Elements**
```html
<!-- Text Display -->
<div id="joke-text">Joke will appear here</div>
<p id="joke-description">Description here</p>
<span id="joke-number">#123</span>

<!-- Lists -->
<ul id="joke-list">
    <li class="joke-item">First joke</li>
    <li class="joke-item">Second joke</li>
</ul>

<ol id="top-jokes">
    <li>Best joke 1</li>
    <li>Best joke 2</li>
</ol>

<!-- Cards/Containers -->
<div class="joke-card">
    <h3>Joke Title</h3>
    <p>Joke content</p>
    <button class="play-audio">Play Audio</button>
</div>
```

### **Loading & Status Elements**
```html
<!-- Loading States -->
<div id="loading" style="display: none;">
    <p>Loading...</p>
    <div class="spinner"></div>
</div>

<!-- Error Messages -->
<div id="error-message" class="error" style="display: none;">
    <p>Something went wrong!</p>
</div>

<!-- Success Messages -->
<div id="success-message" class="success" style="display: none;">
    <p>Joke loaded successfully!</p>
</div>
```

### **Layout Elements**
```html
<!-- Containers -->
<div class="container">
    <div class="row">
        <div class="col">Left column</div>
        <div class="col">Right column</div>
    </div>
</div>

<!-- Grid Layout -->
<div class="joke-grid">
    <div class="joke-item">Joke 1</div>
    <div class="joke-item">Joke 2</div>
    <div class="joke-item">Joke 3</div>
</div>

<!-- Flexbox Layout -->
<div class="joke-flex">
    <div class="joke-content">Content</div>
    <div class="joke-actions">Actions</div>
</div>
```

### **Interactive Features**
```html
<!-- Favorites -->
<button id="favorite-btn" class="favorite-btn">
    <span class="heart">❤️</span> Favorite
</button>

<!-- Share -->
<button id="share-btn">Share Joke</button>

<!-- Categories -->
<div class="categories">
    <button class="category-btn" data-category="dad-jokes">Dad Jokes</button>
    <button class="category-btn" data-category="puns">Puns</button>
    <button class="category-btn" data-category="knock-knock">Knock Knock</button>
</div>

<!-- Pagination -->
<div class="pagination">
    <button id="prev-btn">Previous</button>
    <span id="page-info">Page 1 of 10</span>
    <button id="next-btn">Next</button>
</div>
```

### **Accessibility Features**
```html
<!-- Labels & Descriptions -->
<label for="search-input">Search for jokes:</label>
<input type="text" id="search-input" aria-describedby="search-help">
<div id="search-help">Type keywords to find jokes</div>

<!-- ARIA Labels -->
<button aria-label="Get random joke">🎲</button>
<button aria-label="Play audio for current joke">🔊</button>

<!-- Skip Links -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### **Meta Tags for Better UX**
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Find and share funny jokes">
    <meta name="keywords" content="jokes, humor, funny">
    <meta name="author" content="Your Name">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    
    <!-- Open Graph (for social sharing) -->
    <meta property="og:title" content="JokeGen">
    <meta property="og:description" content="The best joke website">
    <meta property="og:image" content="jokegen-logo.png">
</head>
```

## **Common Attributes**
- `id="unique-name"` - Unique identifier for JavaScript
- `class="style-name"` - CSS styling classes
- `style="property: value;"` - Inline CSS
- `data-*="value"` - Custom data attributes
- `aria-*="value"` - Accessibility attributes

## **Best Practices**
1. Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`)
2. Always include `alt` attributes for images
3. Use proper heading hierarchy (`h1`, `h2`, `h3`)
4. Include `aria-label` for interactive elements
5. Make sure forms have proper labels

---
This reference covers the most common HTML elements you'll need for your joke website! 

---

## 1. **Update your HTML (`index.html`):**

Add a checkbox for audio autoplay, for example just above or below the random joke button:

```html
<label>
  <input type="checkbox" id="autoplay-audio" checked>
  Play audio automatically
</label>
```

Place this near your random joke button, e.g.:
```html
<button id="random-joke-btn">Get Random Joke</button>
<label style="margin-left: 1em;">
  <input type="checkbox" id="autoplay-audio" checked>
  Play audio automatically
</label>
```

---

## 2. **Update your JavaScript (`app.js`):**

Get a reference to the checkbox at the top:
```javascript
const autoplayCheckbox = document.getElementById('autoplay-audio');
```

Update your random joke event handler to check the checkbox before playing audio:
```javascript
randomJokeBtn.addEventListener('click', async () => {
    try {
        jokeDisplay.textContent = 'Loading...';
        const response = await fetch(`${API_BASE_URL}/random`);
        const joke = await response.json();
        jokeDisplay.textContent = joke.joke_text;

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
});
```

---

**Now users can control whether audio plays automatically!**  
Let me know if you want this for search results as well. 