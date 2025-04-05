import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Connecting to API...');
  const apiUrl = import.meta.env.VITE_API_URL;

  console.log('✅ ENV VITE_API_URL:', apiUrl); // 👈 SHOULD SHOW VALUE IN CONSOLE

  useEffect(() => {
    fetch(`${apiUrl}/`)  // Make sure your API returns { message: "..." }
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
    </div>
  );
}

export default App;
