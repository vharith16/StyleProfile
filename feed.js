import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Feed = () => {
  const [filter, setFilter] = useState('Show All');
  const [publicClosets, setPublicClosets] = useState([
    { id: 1, name: "User1", persona: "Trendsetter", images: ["https://via.placeholder.com/150"], points: 150 },
    { id: 2, name: "User2", persona: "Classic", images: ["https://via.placeholder.com/150"], points: 120 },
  ]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleRating = (closetId, rating) => {
    setPublicClosets(publicClosets.map(closet =>
      closet.id === closetId ? { ...closet, points: closet.points + 5 * rating } : closet
    ));
    if (rating === 5) {
      alert(`Added to moodboard from ${publicClosets.find(c => c.id === closetId).name}'s closet!`);
    }
  };

  useEffect(() => {
    const ctx = document.getElementById('feedChart')?.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Trendsetter', 'Classic'],
        datasets: [{
          label: 'Average Points',
          data: [140, 120],
          backgroundColor: '#FFFFFF',
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            ticks: { color: '#fff' },
            grid: { color: '#333' }
          },
          y: {
            ticks: { color: '#fff' },
            grid: { color: '#333' }
          }
        }
      }
    });
  }, []);

  const filteredClosets = publicClosets.filter(closet =>
    filter === 'Show All' || closet.persona === filter
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="bg-gray-900 p-6 rounded-lg mb-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Fit or Not Feed</h2>

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={handleFilterChange}
          className="mb-6 p-2 border border-gray-600 rounded bg-black text-white w-full max-w-xs text-lg"
        >
          <option>Show All</option>
          <option>Trendsetter</option>
          <option>Classic</option>
        </select>

        {/* Grid of Closets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClosets.map((closet) => (
            <div key={closet.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <img
                src={closet.images[0]}
                alt="Outfit"
                className="w-full h-48 object-cover rounded-md mb-4 border border-gray-700"
              />
              <p className="text-lg font-semibold">{closet.name} ({closet.persona})</p>
              <p className="text-sm text-gray-300">Points: {closet.points}</p>
              <div className="flex justify-between mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="text-yellow-400 text-xl hover:scale-110 transition-transform"
                    onClick={() => handleRating(closet.id, star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Feed Stats</h3>
          <canvas id="feedChart" className="w-full h-32 bg-black rounded-md"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Feed;
