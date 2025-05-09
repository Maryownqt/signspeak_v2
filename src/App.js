// src/App.js
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import './App.css';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [gesture, setGesture] = useState('');

  // Draw a box on the canvas
  const drawBox = ([l, t, r, b]) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, 640, 480);
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 2;
    ctx.strokeRect(l, t, r - l, b - t);
  };

  const detect = useCallback(async () => {
    if (!webcamRef.current) return;
    const imgSrc = webcamRef.current.getScreenshot({ width: 640, height: 480 });
    const blob = await (await fetch(imgSrc)).blob();
    const form = new FormData();
    form.append('file', blob, 'frame.jpg');

    try {
      const res = await fetch('/detect', { method: 'POST', body: form });
      const { gesture, bbox } = await res.json();
      setGesture(gesture);
      if (bbox) drawBox(bbox);
    } catch (e) {
      console.error('Detect error', e);
    }
  }, []);

  useEffect(() => {
    const id = setInterval(detect, 100);
    return () => clearInterval(id);
  }, [detect]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>SignSpeak Live</h1>
      <div style={{ position: 'relative', width: 640, height: 480 }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
          videoConstraints={{ facingMode: 'user' }}
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
      <p style={{ marginTop: '1rem', fontSize: '1.25rem' }}>
        Detected Gesture: <strong>{gesture}</strong>
      </p>
    </div>
  );
}

export default App;
