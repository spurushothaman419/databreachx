import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Connecting to API...");

  const apiUrl = import.meta.env.VITE_API_URL;

  // ✅ Debug log to confirm env variable
  console.log("✅ ENV VITE_API_URL:", apiUrl);

  useEffect(() => {
    fetch(`${apiUrl}/`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error("❌ API fetch failed:", err.message);
        setMessage("API error: " + err.message);
      });
  }, []);

  return (
    <div className="p-6 text-xl font-bold">
      <h1>{message}</h1>
      <h2 className="text-sm text-red-600">
        🔍 {apiUrl || "ENV not loaded"}
      </h2>
    </div>
  );
}

export default App;
