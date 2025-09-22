import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // for smooth animations
import "./App.css"; // adjust if you use Tailwind via PostCSS/Tailwind config

const PublicClosets = () => {
  const [closets, setClosets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  // Fetch data from backend
  const fetchClosets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/public-closets");

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const contentLength = +response.headers.get("Content-Length") || 0;

      let receivedLength = 0;
      let chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        if (contentLength > 0) {
          setProgress(Math.round((receivedLength / contentLength) * 100));
        }
      }

      let chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for (let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      const resultString = new TextDecoder("utf-8").decode(chunksAll);
      const data = JSON.parse(resultString);

      setClosets(data);
    } catch (err) {
      console.error("Failed to fetch public closets:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClosets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Public Closets</h1>

      {/* Progress bar while loading */}
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-600 font-semibold">
          Error loading closets: {error}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial=
