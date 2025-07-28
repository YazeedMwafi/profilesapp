import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [visits, setVisits] = useState(null)
  const [error, setError] = useState(null)

  // 👇 Call your API on first load
  useEffect(() => {
    fetch("https://yagmrkw1z8.execute-api.us-east-1.amazonaws.com/prod/visits", {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        setVisits(data.visits)
      })
      .catch(err => {
        console.error("API error:", err)
        setError("Failed to fetch visit count")
      })
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <p>
          👁️ Visitor Count:{" "}
          {error ? (
            <span style={{ color: "red" }}>{error}</span>
          ) : visits === null ? (
            "Loading..."
          ) : (
            visits
          )}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
