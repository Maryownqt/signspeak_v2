import React from 'react';
import './App.css';

function App() {
  const streamUrl = '/video_feed';  // will be proxied via Netlify/_redirects

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem'
      }}
    >
      <h1>Live SignSpeak Stream</h1>
      <iframe
        src={streamUrl}
        width="640"
        height="480"
        style={{ border: '2px solid #333', marginTop: '1rem' }}
        title="Live SignSpeak Stream"
      />
    </div>
  );
}

export default App;
