// src/pages/publicClosets.js
import React, { useState, useEffect } from "react";

const PublicClosets = () => {
  const [closets, setClosets] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`/api/public-closets?filter=${filter}`)
      .then((res) => res.json())
      .then((data) => setClosets(data))
      .catch((err) => console.error("Error fetching closets:", err));
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Public Closets
      </h1>

      {/* Filter Input */}
      <input
        type="text"
        placeholder="Filter by category..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full max-w-sm p-2 border border-gray-300 rounded-lg mb-6"
      />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {closets.map((closet) => (
          <div
            key={closet.id}
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
          >
            <img
              src={closet.image}
              alt={closet.name}
              className="rounded-xl w-full h-48 object-cover"
            />
            <h2 className="text-xl font-medium mt-3 text-gray-700">
              {closet.name}
            </h2>
            <p className="text-gray-500">{closet.category}</p>
            <p className="text-gray-600 mt-2">{closet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicClosets;
