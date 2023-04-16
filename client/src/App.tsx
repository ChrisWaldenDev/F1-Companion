import './app.css'
import React from 'react'

function App (): JSX.Element {
  return (
    <div style={{
      color: '#f3f3f3',
      display: 'flex',
      fontSize: '24px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px'
    }}>
      <h1>Welcome to F1 Companion</h1>
      <p>This site is currently under development</p>
      <p>While the data is still available, it is not pretty.</p>
    </div>
  )
}

export default App
