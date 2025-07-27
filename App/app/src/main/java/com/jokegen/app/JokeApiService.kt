package com.jokegen.app

import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

// Data class for a joke
data class Joke(
    val joke_text: String,
    val audio_file_path: String?
)

data class JokeSearchResponse(val jokes: List<Joke>)

interface JokeApiService {
    @GET("/random")
    suspend fun getRandomJoke(): Response<Joke>

    @GET("/search")
    suspend fun searchJokes(@Query("term") term: String): Response<JokeSearchResponse>
} 