// src/App.js
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

function App() {
  const webcamRef = useRef(null);
  const [label, setLabel] = useState('No gesture detected');

  const captureAndDetect = useCallback(async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot({ width: 640, height: 480 });
    if (!imageSrc) return;

    // Convert base64 to Blob
    const res = await fetch(imageSrc);
    const blob = await res.blob();
    const formData = new FormData();
    formData.append('file', blob, 'frame.jpg');

    try {
      const resp = await fetch(' https://e471-136-158-123-1.ngrok-free.app/detect', {
        method: 'POST',
        body: formData,
      });
      const json = await resp.json();
      // Assume your backend returns { label: 'Hello', boxes: [...] }
      setLabel(json.label);
      // You can also draw boxes on a canvas if you return coords
    } catch (err) {
      console.error('Detection error', err);
    }
  }, [webcamRef]);

  // Capture & send a frame every 500ms
  React.useEffect(() => {
    const id = setInterval(captureAndDetect, 1);
    return () => clearInterval(id);
  }, [captureAndDetect]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>SignSpeak Demo</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        videoConstraints={{ facingMode: 'user' }}
      />
      <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>{label}</p>
    </div>
  );
}

export default App;
