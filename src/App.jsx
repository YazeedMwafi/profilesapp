import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [visits, setVisits] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("https://dr678hel4k.execute-api.eu-central-1.amazonaws.com/prod/visits", {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => setVisits(data.visits))
      .catch(err => {
        console.error("API error:", err)
        setError("Failed to fetch visit count")
      })
  }, [])

  return (
    <div className="container text-center py-5">
      <h1 className="mb-4">📊 Profile Visitors Dashboard</h1>

      <div className="card p-4 mx-auto mb-4 shadow-sm" style={{ maxWidth: "400px" }}>
        <h4 className="mb-3">Welcome Back!</h4>
        <p className="text-muted">This dashboard shows how many times your profile has been visited.</p>

        <p className="fw-bold">
          Visits:{" "}
          {error ? (
            <span className="text-danger">{error}</span>
          ) : visits === null ? (
            "Loading..."
          ) : (
            visits
          )}
        </p>
      </div>

      <div className="card p-4 mx-auto shadow-sm" style={{ maxWidth: "400px" }}>
        <h5 className="mb-3">Local Counter</h5>
        <p className="mb-2">Just a local counter for fun:</p>
        <button className="btn btn-success" onClick={() => setCount(count + 1)}>
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
