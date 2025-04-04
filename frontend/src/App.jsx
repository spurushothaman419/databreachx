import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Connecting to API...');
  const apiUrl = import.meta.env.VITE_API_URL;

  // Debug
  console.log('ENV VITE_API_URL:', apiUrl);

  useEffect(() => {
    fetch(`${apiUrl}/`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => {
        console.error('API fetch failed:', err.message);
        setMessage('API error: ' + err.message);
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <h2>{apiUrl}</h2>
    </div>
  );
}

export default App;
