import { useState } from 'react'
import MovieList from './components/MovieList'
import SearchBar from './components/SearchBar'
import { SAMPLE_MOVIES } from './data/sampleMovies'

export default function App() {
  const [query, setQuery] = useState('')

  const filteredMovies = SAMPLE_MOVIES.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <h1>Movie Browser</h1>
      <SearchBar query={query} onChange={setQuery} />
      <MovieList movies={filteredMovies} />
    </div>
  )
}