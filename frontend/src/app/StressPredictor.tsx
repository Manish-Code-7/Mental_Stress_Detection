"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setPrediction(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
      z
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Mental Stress Detection
        </h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
          className="w-full border rounded-lg p-3 mb-4"
          rows={4}
        />

        <button
          onClick={handlePredict}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Check Stress"}
        </button>

        {prediction && (
          <div className="mt-4 p-3 rounded-lg text-center font-semibold bg-gray-50">
            Prediction:{" "}
            <span
              className={
                prediction === "Stress" ? "text-red-600" : "text-green-600"
              }
            >
              {prediction}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
