import React from 'react';
import './App.css';

function App() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Live SignSpeak Stream</h1>
      <iframe
        src="/video_feed"
        width="640"
        height="480"
        style={{ border: '2px solid #333' }}
        title="Live SignSpeak"
      />
    </div>
  );
}

  );
}

export default App;
