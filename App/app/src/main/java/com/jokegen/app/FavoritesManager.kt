package com.jokegen.app

import android.content.Context

object FavoritesManager {
    private const val PREFS_NAME = "favorites"
    private const val KEY = "favorites_list"

    fun getFavorites(context: Context): List<Joke> {
        // TODO: Retrieve favorites from SharedPreferences
        return emptyList()
    }

    fun addFavorite(context: Context, joke: Joke) {
        // TODO: Add a joke to favorites and save
    }

    fun removeFavorite(context: Context, joke: Joke) {
        // TODO: Remove a joke from favorites and save
    }

    fun isFavorite(context: Context, joke: Joke): Boolean {
        // TODO: Check if a joke is in favorites
        return false
    }
} 