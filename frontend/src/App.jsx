import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Connecting to API...");
  
  useEffect(() => {
    console.log("✅ ENV VITE_API_URL:", import.meta.env.VITE_API_URL); // Debug log
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
      <p style={{ fontSize: "14px", color: "gray" }}>
        ENV: {apiUrl || "ENV not loaded"}
      </p>
    </div>
  );
}

export default App;
