# JokeGen Android App

A fully functional Android app that replicates all features from the JokeGen web application, including random joke generation, search functionality, favorites management, and audio playback.

## Features

### 🎲 Random Joke Generation
- Fetch random jokes from the backend API
- Display joke text with proper formatting
- Audio playback for jokes with audio files

### 🔍 Search Functionality
- Search jokes by keywords
- Paginated results with "Show More" button
- Real-time search results display

### ❤️ Favorites Management
- Add/remove jokes to/from favorites
- Persistent storage using SharedPreferences
- Favorites dialog with full joke list
- Heart icon toggle functionality

### 🔊 Audio Playback
- Play audio files associated with jokes
- MediaPlayer integration
- Error handling for audio playback

### 🎨 Modern UI
- Clean, responsive design
- Material Design components
- Smooth animations and transitions
- Heart button for favorites

## Setup Instructions

### Prerequisites
- Android Studio (latest version)
- Android SDK (API level 23 or higher)
- Backend server running on `http://localhost:5000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jokegen/App
   ```

2. **Open in Android Studio**
   - Open Android Studio
   - Select "Open an existing Android Studio project"
   - Navigate to the `App` folder and select it

3. **Configure Backend URL**
   - For Android Emulator: The app uses `http://10.0.2.2:5000/` (maps to localhost)
   - For physical device: Update the base URL in `MainActivity.kt` to your computer's IP address

4. **Run the Backend**
   ```bash
   cd ../backend
   python app.py
   ```

5. **Build and Run**
   - Connect an Android device or start an emulator
   - Click "Run" in Android Studio
   - The app will install and launch automatically

## Project Structure

```
App/
├── app/
│   ├── src/main/
│   │   ├── java/com/jokegen/app/
│   │   │   ├── MainActivity.kt          # Main activity with UI logic
│   │   │   ├── JokeApiService.kt        # Retrofit API interface
│   │   │   ├── JokeAdapter.kt           # RecyclerView adapter
│   │   │   ├── FavoritesManager.kt      # Favorites persistence
│   │   │   └── FavoritesDialog.kt       # Favorites dialog
│   │   ├── res/
│   │   │   ├── layout/
│   │   │   │   ├── activity_main.xml    # Main screen layout
│   │   │   │   ├── item_joke.xml        # Individual joke item
│   │   │   │   ├── dialog_favorites.xml # Favorites dialog
│   │   │   │   └── sidebar_favorites.xml
│   │   │   ├── drawable/                # Custom drawables
│   │   │   └── values/
│   │   │       ├── strings.xml          # String resources
│   │   │       ├── colors.xml           # Color definitions
│   │   │       └── styles.xml           # App theme
│   │   └── AndroidManifest.xml          # App permissions and config
│   └── build.gradle                     # Module dependencies
├── build.gradle                         # Project configuration
└── settings.gradle                      # Project settings
```

## API Integration

The app connects to the same backend as the web version:

- **Random Joke**: `GET /random`
- **Search Jokes**: `GET /search?term=keyword`
- **Get Joke by Number**: `GET /joke/{number}`

### Response Format
```json
{
  "joke_text": "Why did the chicken cross the road?",
  "audio_file_path": "Joke audio/joke123.mp3"
}
```

## Dependencies

- **Retrofit**: HTTP client for API calls
- **Gson**: JSON parsing
- **Coroutines**: Asynchronous programming
- **RecyclerView**: Efficient list display
- **MediaPlayer**: Audio playback

## Troubleshooting

### Common Issues

1. **Network Error**: Ensure the backend is running and accessible
2. **Audio Not Playing**: Check if audio files exist in the backend
3. **Build Errors**: Sync project with Gradle files
4. **Emulator Issues**: Use `10.0.2.2` instead of `localhost` for API calls

### Debug Tips

- Check logcat for detailed error messages
- Verify network permissions in AndroidManifest.xml
- Test with different API endpoints
- Use Android Studio's network inspector

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the JokeGen application suite. 