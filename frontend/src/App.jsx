import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Connecting to API...');

useEffect(() => {
  const baseUrl = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL;

  fetch(baseUrl + '/')
    .then(res => res.json())
    .then(data => setMessage(data.message))
    .catch(err => setMessage('API error: ' + err.message));

  console.log('API URL:', baseUrl);
}, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
