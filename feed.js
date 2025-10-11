import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Feed = () => {
  const [filter, setFilter] = useState('Show All');
  const [publicClosets, setPublicClosets] = useState([
    { id: 1, name: "User1", persona: "Trendsetter", image: "https://via.placeholder.com/150", points: 150 },
    { id: 2, name: "User2", persona: "Classic", image: "https://via.placeholder.com/150", points: 120 },
  ]);

  // Fetch from backend if available
  useEffect(() => {
    fetch('http://localhost:5000/closets')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPublicClosets(data);
        }
      })
      .catch(() => console.log("Using fallback demo closets"));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleRating = (closetId, rating) => {
    setPublicClosets(prevClosets =>
      prevClosets.map(closet =>
        closet.id === closetId
          ? { ...closet, points: closet.points + 5 * rating }
          : closet
      )
    );

    if (rating === 5) {
      const closet = publicClosets.find(c => c.id === closetId);
      if (closet) {
        alert(`⭐ Added to moodboard from ${closet.name}'s closet!`);
      }
    }
  };

  // Chart for average persona points
  useEffect(() => {
    const ctx = document.getElementById('feedChart');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Trendsetter', 'Classic'],
        datasets: [{
          label: 'Average Points',
          data: [
            publicClosets.filter(c => c.persona === 'Trendsetter').reduce((a, b) => a + b.points, 0) /
              (publicClosets.filter(c => c.persona === 'Trendsetter').length || 1),
            publicClosets.filter(c => c.persona === 'Classic').reduce((a, b) => a + b.points, 0) /
              (publicClosets.filter(c => c.persona === 'Classic').length || 1),
          ],
          backgroundColor: ['#00BFFF', '#FF69B4'],
        }],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    return () => chart.destroy();
  }, [publicClosets]);

  const filteredClosets = publicClosets.filter(
    closet => filter === 'Show All' || closet.persona === filter
  );

  return (
    <div className="p-6">
      <div className="tile p-6 rounded-lg mb-6 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4">👗 Fit or Not Feed</h2>

        <select
          value={filter}
          onChange={handleFilterChange}
          className="mb-4 p-2 border border-gray-600 rounded bg-gray-800 w-full max-w-xs text-lg"
        >
          <option>Show All</option>
          <option>Trendsetter</option>
          <option>Classic</option>
        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClosets.map((closet) => (
            <div key={closet.id} className="p-4 rounded-lg bg-gray-800 shadow-lg hover:shadow-xl transition">
              <img
                src={closet.image || (closet.images && closet.images[0])}
                alt="Outfit"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-lg font-semibold">
                {closet.name} ({closet.persona})
              </p>
              <p className="text-sm text-gray-400">Points: {closet.points}</p>

              <div className="flex justify-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => handleRating(closet.id, star)}
                    className="text-yellow-400 text-xl"
                  >
                    ★
                  </button>
                ))}
              </div>

              <div className="w-full bg-gray-700 h-2 rounded mt-3">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${Math.min(closet.points, 200) / 2}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Feed Stats</h3>
          <canvas id="feedChart" className="w-full h-40"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Feed;
