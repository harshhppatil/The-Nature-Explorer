import { Link } from 'react-router-dom'

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '48px', color: '#2d6a4f' }}>Explore Nature 🌍</h1>
      <p style={{ fontSize: '18px', margin: '20px 0', color: '#555' }}>
        Discover the most beautiful natural places — parks, lakes, mountains, rivers and wildlife.
      </p>
      <Link to="/explore">
        <button style={{
          backgroundColor: '#2d6a4f',
          color: 'white',
          padding: '12px 30px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Start Exploring
        </button>
      </Link>
    </div>
  )
}

export default Home
