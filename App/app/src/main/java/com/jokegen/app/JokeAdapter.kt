package com.jokegen.app

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class JokeAdapter(private val jokes: List<Joke>) : RecyclerView.Adapter<JokeAdapter.JokeViewHolder>() {
    class JokeViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val jokeText: TextView = itemView.findViewById(R.id.joke_text)
        // TODO: Add references for audio and favorite button
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): JokeViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_joke, parent, false)
        return JokeViewHolder(view)
    }

    override fun onBindViewHolder(holder: JokeViewHolder, position: Int) {
        val joke = jokes[position]
        holder.jokeText.text = joke.joke_text
        // TODO: Set up audio playback and favorite logic
    }

    override fun getItemCount() = jokes.size
} 