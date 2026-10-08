import { useState, useEffect } from 'react'
import type { Movie } from '../types'

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let isMounted = true
    fetch('/api/movies')
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed')
        return res.json()
      })
      .then((data) => {
        if (isMounted) {
          setMovies(data.results || [])
          setLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(true)
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {!loading && error && <p>Failed to load movies.</p>}

      {!loading && !error && (
        <div>
          {filteredMovies.map((movie) => (
            <article key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}