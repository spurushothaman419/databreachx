// src/components/EntityDetector.jsx
import React, { useState } from "react";
import axios from "axios";

const EntityDetector = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/analyze`,
        { text: input }
      );
      setResult(response.data);
    } catch (err) {
      setError("Error analyzing input");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🔍 DataBreachX - Entity Detector</h1>
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows={4}
        placeholder="Enter text with email, Aadhaar, etc..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {result && (
        <div className="mt-4">
          <h2 className="font-semibold">Results:</h2>
          <pre className="bg-gray-100 p-2 mt-2 text-sm overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default EntityDetector;
