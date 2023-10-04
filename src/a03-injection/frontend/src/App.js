import React, { useState } from 'react'
import 'owasp-shared/style.css'
import { loggedInToken as BEARER_TOKEN } from 'owasp-shared/test-utils'

//urls
const GET_CUSTOMER_URL = 'http://localhost:3000/customer?name=alice'
const SQL_INJECTION = `http://localhost:3000/customer?name=' OR '1'='1`

const headers = {
  Authorization: `Bearer ${BEARER_TOKEN}`,
  Accept: '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
  Connection: 'keep-alive',
  'Content-Type': 'application/json'
}

function Section({ title, defaultURL, method, defaultBody }) {
  const [url, setURL] = useState(defaultURL)
  const [status, setStatus] = useState(null)
  const [data, setData] = useState()
  const handleURLChange = event => {
    setURL(event.target.value)
  }
  const handleSubmit = async () => {
    const options = { headers }

    try {
      const response = await fetch(url, options)

      const data = await response.json()
      response.ok
        ? setStatus(`success, ${response.status}`)
        : setStatus(`failed, ${response.status}`)
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h2>{title}</h2>
      <div className="main-section">
        <div className="request-details">
          <h3>url</h3>
          <input
            className="url-input"
            value={defaultURL}
            onChange={handleURLChange}
          ></input>
          <button className="url-input-button" onClick={handleSubmit}>
            send
          </button>
        </div>

        <div className="response-section">
          <h2 className="status">Response: {status}</h2>
          <code>{JSON.stringify(data)}</code>
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <div className="App">
      <h1>AO3: Common vulnerabilities</h1>

      <Section defaultURL={GET_CUSTOMER_URL} title="Get customer by name" />
      <Section defaultURL={SQL_INJECTION} title="SQL Injection" />
    </div>
  )
}