package com.jokegen.app

import android.app.Dialog
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class FavoritesDialog(context: Context, private val favorites: List<Joke>) : Dialog(context) {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.dialog_favorites)
        
        val title = findViewById<TextView>(R.id.dialogTitle)
        val recyclerView = findViewById<RecyclerView>(R.id.favoritesRecyclerView)
        val closeBtn = findViewById<Button>(R.id.closeDialogBtn)
        
        title.text = "Favorites (${favorites.size})"
        
        val adapter = JokeAdapter(favorites.toMutableList()) { joke ->
            // Handle joke click - could trigger audio or display in main view
        }
        
        recyclerView.layoutManager = LinearLayoutManager(context)
        recyclerView.adapter = adapter
        
        closeBtn.setOnClickListener {
            dismiss()
        }
    }
} 