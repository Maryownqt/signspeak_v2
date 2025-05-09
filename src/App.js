import React from 'react';
import './App.css';

function App() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', padding: '2rem'
    }}>
      <h1>Live SignSpeak Stream</h1>
      <div style={{
        width: '640px', height: '480px',
        border: '2px solid #333', marginTop: '1rem'
      }}>
        <img
          src="/video_feed"
          alt="Live backend stream"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
}

export default App;
