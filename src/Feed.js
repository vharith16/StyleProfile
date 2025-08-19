import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Feed = () => {
  const [filter, setFilter] = useState('Show All');
  const [publicClosets, setPublicClosets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/closets')
      .then(res => res.json())
      .then(data => setPublicClosets(data));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleRating = (closetId, rating) => {
    setPublicClosets(publicClosets.map(closet =>
      closet.id === closetId
        ? { ...closet, points: closet.points + 5 * rating }
        : closet
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
          data: [
            publicClosets.filter(c => c.persona === 'Trendsetter').reduce((a, b) => a + b.points, 0) / publicClosets.filter(c => c.persona === 'Trendsetter').length || 0,
            publicClosets.filter(c => c.persona === 'Classic').reduce((a, b) => a + b.points, 0) / publicClosets.filter(c => c.persona === 'Classic').length || 0,
          ],
          backgroundColor: '#FFFFFF',
        }],
      },
    });
  }, [publicClosets]);

  const filteredClosets = publicClosets.filter(closet =>
    filter === 'Show All' || closet.persona === filter
  );

  return (
    <div className="feed-container">
      <div className="feed-tile">
        <h2 className="feed-title">Fit or Not Feed</h2>

        <select
          value={filter}
          onChange={handleFilterChange}
          className="feed-select"
        >
          <option>Show All</option>
          <option>Trendsetter</option>
          <option>Classic</option>
        </select>

        <div className="feed-grid">
          {filteredClosets.map((closet) => (
            <div key={closet.id} className="closet-card">
              <img
                src={closet.image}
                alt="Outfit"
                className="closet-img"
              />
              <p className="closet-name">{closet.name} ({closet.persona})</p>
              <p className="closet-points">Points: {closet.points}</p>
              <div className="flex justify-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => handleRating(closet.id, star)}
                    className="text-yellow-400 text-xl"
                  >★</button>
                ))}
              </div>
              <div className="w-full bg-gray-600 h-2 rounded mt-3">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${Math.min(closet.points, 200) / 2}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Feed Stats</h3>
          <canvas id="feedChart" className="w-full h-32"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Feed;
