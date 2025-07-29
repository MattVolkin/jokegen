package com.jokegen.app

import android.content.Context
import android.media.MediaPlayer
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class JokeAdapter(
    private val jokes: MutableList<Joke>,
    private val onJokeClick: (Joke) -> Unit
) : RecyclerView.Adapter<JokeAdapter.JokeViewHolder>() {
    
    class JokeViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val jokeText: TextView = itemView.findViewById(R.id.joke_text)
        val audioBtn: Button = itemView.findViewById(R.id.audioBtn)
        val heartIcon: TextView = itemView.findViewById(R.id.heartIcon)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): JokeViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_joke, parent, false)
        return JokeViewHolder(view)
    }

    override fun onBindViewHolder(holder: JokeViewHolder, position: Int) {
        val joke = jokes[position]
        val context = holder.itemView.context
        
        holder.jokeText.text = joke.joke_text
        
        // Set up click listener for the joke text
        holder.jokeText.setOnClickListener {
            onJokeClick(joke)
        }
        
        // Handle audio button
        if (joke.audio_file_path != null) {
            holder.audioBtn.visibility = View.VISIBLE
            holder.audioBtn.setOnClickListener {
                playAudio(context, joke.audio_file_path)
            }
        } else {
            holder.audioBtn.visibility = View.GONE
        }
        
        // Handle favorite button
        val isFavorited = FavoritesManager.isFavorite(context, joke)
        holder.heartIcon.setTextColor(
            if (isFavorited) context.getColor(R.color.heart_red) 
            else context.getColor(R.color.black)
        )
        
        holder.heartIcon.setOnClickListener {
            if (isFavorited) {
                FavoritesManager.removeFavorite(context, joke)
            } else {
                FavoritesManager.addFavorite(context, joke)
            }
            notifyItemChanged(position) // Refresh the heart icon
        }
    }

    override fun getItemCount() = jokes.size
    
    fun addJoke(joke: Joke) {
        jokes.add(joke)
        notifyItemInserted(jokes.size - 1)
    }
    
    fun clearJokes() {
        val size = jokes.size
        jokes.clear()
        notifyItemRangeRemoved(0, size)
    }
    
    private fun playAudio(context: Context, audioPath: String) {
        try {
            val mediaPlayer = MediaPlayer()
            mediaPlayer.setDataSource(audioPath)
            mediaPlayer.prepare()
            mediaPlayer.start()
        } catch (e: Exception) {
            // Handle audio playback error
        }
    }
} 