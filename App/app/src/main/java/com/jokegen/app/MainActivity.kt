package com.jokegen.app

import android.media.MediaPlayer
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.coroutines.*
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : AppCompatActivity() {
    private lateinit var jokeDisplay: TextView
    private lateinit var randomJokeBtn: Button
    private lateinit var searchInput: EditText
    private lateinit var searchBtn: Button
    private lateinit var searchResults: RecyclerView
    private lateinit var showMoreBtn: Button
    private lateinit var openFavoritesBtn: Button
    private lateinit var jokeAdapter: JokeAdapter
    private lateinit var favoritesAdapter: JokeAdapter
    
    private var searchResultsData = mutableListOf<Joke>()
    private var visibleCount = 0
    private val RESULTS_PER_BATCH = 5
    private var mediaPlayer: MediaPlayer? = null
    
    // Retrofit setup
    private val retrofit = Retrofit.Builder()
        .baseUrl("http://192.168.6.35:5000/") // Your computer's IP address
        .addConverterFactory(GsonConverterFactory.create())
        .build()
    
    private val jokeApiService = retrofit.create(JokeApiService::class.java)
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        initializeViews()
        setupRecyclerViews()
        setupEventListeners()
        updateFavoritesUI()
    }
    
    private fun initializeViews() {
        jokeDisplay = findViewById(R.id.jokeDisplay)
        randomJokeBtn = findViewById(R.id.randomJokeBtn)
        searchInput = findViewById(R.id.searchInput)
        searchBtn = findViewById(R.id.searchBtn)
        searchResults = findViewById(R.id.searchResults)
        showMoreBtn = findViewById(R.id.showMoreBtn)
        openFavoritesBtn = findViewById(R.id.openFavoritesBtn)
    }
    
    private fun setupRecyclerViews() {
        jokeAdapter = JokeAdapter(mutableListOf()) { joke ->
            displayJoke(joke)
        }
        searchResults.layoutManager = LinearLayoutManager(this)
        searchResults.adapter = jokeAdapter
    }
    
    private fun setupEventListeners() {
        randomJokeBtn.setOnClickListener {
            fetchRandomJoke()
        }
        
        searchBtn.setOnClickListener {
            performSearch()
        }
        
        showMoreBtn.setOnClickListener {
            renderSearchBatch()
        }
        
        openFavoritesBtn.setOnClickListener {
            showFavorites()
        }
    }
    
    private fun fetchRandomJoke() {
        jokeDisplay.text = "Loading..."
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = jokeApiService.getRandomJoke()
                withContext(Dispatchers.Main) {
                    if (response.isSuccessful) {
                        val joke = response.body()
                        if (joke != null) {
                            displayJoke(joke)
                        } else {
                            jokeDisplay.text = "Error: No joke received"
                        }
                    } else {
                        jokeDisplay.text = "Error: ${response.code()} ${response.message()}"
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    jokeDisplay.text = "Failed to fetch joke. Is the backend running?"
                }
            }
        }
    }
    
    private fun performSearch() {
        val term = searchInput.text.toString().trim()
        if (term.isEmpty()) return
        
        jokeAdapter.clearJokes()
        searchResultsData.clear()
        visibleCount = 0
        
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = jokeApiService.searchJokes(term)
                withContext(Dispatchers.Main) {
                    if (response.isSuccessful) {
                        val searchResponse = response.body()
                        if (searchResponse != null && searchResponse.jokes.isNotEmpty()) {
                            searchResultsData.addAll(searchResponse.jokes)
                            renderSearchBatch()
                        } else {
                            jokeAdapter.addJoke(Joke("No jokes found.", null))
                        }
                    } else {
                        jokeAdapter.addJoke(Joke("Error: ${response.code()}", null))
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    jokeAdapter.addJoke(Joke("Failed to fetch search results.", null))
                }
            }
        }
    }
    
    private fun renderSearchBatch() {
        val end = minOf(visibleCount + RESULTS_PER_BATCH, searchResultsData.size)
        for (i in visibleCount until end) {
            jokeAdapter.addJoke(searchResultsData[i])
        }
        visibleCount = end
        showMoreBtn.visibility = if (visibleCount < searchResultsData.size) View.VISIBLE else View.GONE
    }
    
    private fun displayJoke(joke: Joke) {
        jokeDisplay.text = joke.joke_text
        
        // Handle audio playback
        if (joke.audio_file_path != null) {
            playAudio(joke.audio_file_path)
        } else {
            stopAudio()
        }
    }
    
    private fun playAudio(audioPath: String) {
        stopAudio()
        try {
            mediaPlayer = MediaPlayer()
            mediaPlayer?.setDataSource(audioPath)
            mediaPlayer?.prepare()
            mediaPlayer?.start()
        } catch (e: Exception) {
            Toast.makeText(this, "Error playing audio", Toast.LENGTH_SHORT).show()
        }
    }
    
    private fun stopAudio() {
        mediaPlayer?.apply {
            if (isPlaying) {
                stop()
            }
            release()
        }
        mediaPlayer = null
    }
    
    private fun showFavorites() {
        val favorites = FavoritesManager.getFavorites(this)
        if (favorites.isEmpty()) {
            Toast.makeText(this, "No favorites yet", Toast.LENGTH_SHORT).show()
        } else {
            // Show favorites in a dialog or new activity
            val dialog = FavoritesDialog(this, favorites)
            dialog.show()
        }
    }
    
    private fun updateFavoritesUI() {
        // Update UI when favorites change
    }
    
    override fun onDestroy() {
        super.onDestroy()
        stopAudio()
    }
} 