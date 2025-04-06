
import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Connecting...');

  const apiUrl = 'https://databreachx-api.onrender.com';
  console.log('DEBUG: API URL is', apiUrl);

  useEffect(() => {
    fetch(`${apiUrl}/`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message || '✅ API response received'))
      .catch((err) => {
        console.error('API call failed:', err.message);
        setMessage('❌ API call failed');
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
