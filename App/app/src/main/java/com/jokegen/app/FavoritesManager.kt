package com.jokegen.app

import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

object FavoritesManager {
    private const val PREFS_NAME = "favorites"
    private const val KEY = "favorites_list"
    private val gson = Gson()

    fun getFavorites(context: Context): List<Joke> {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        val json = prefs.getString(KEY, "[]")
        val type = object : TypeToken<List<Joke>>() {}.type
        return try {
            gson.fromJson(json, type) ?: emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }

    fun addFavorite(context: Context, joke: Joke) {
        val favorites = getFavorites(context).toMutableList()
        if (!favorites.any { it.joke_text == joke.joke_text }) {
            favorites.add(joke)
            saveFavorites(context, favorites)
        }
    }

    fun removeFavorite(context: Context, joke: Joke) {
        val favorites = getFavorites(context).toMutableList()
        favorites.removeAll { it.joke_text == joke.joke_text }
        saveFavorites(context, favorites)
    }

    fun isFavorite(context: Context, joke: Joke): Boolean {
        val favorites = getFavorites(context)
        return favorites.any { it.joke_text == joke.joke_text }
    }

    private fun saveFavorites(context: Context, favorites: List<Joke>) {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        val json = gson.toJson(favorites)
        prefs.edit().putString(KEY, json).apply()
    }
} 