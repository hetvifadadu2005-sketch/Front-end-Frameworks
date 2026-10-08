import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>About This App</h1>
      <p>Welcome to the Movie Database App.</p>
      <Link to="/">Back to Home</Link>
    </main>
  )
}