import React, { useState } from 'react';

const Feed = () => {
  const [filter, setFilter] = useState('Show All');

  const publicClosets = [
    { id: 1, name: "User1", persona: "Trendsetter", images: ["https://via.placeholder.com/150"], points: 150 },
    { id: 2, name: "User2", persona: "Classic", images: ["https://via.placeholder.com/150"], points: 120 },
  ];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

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
                src={closet.images[0]}
                alt="Outfit"
                className="closet-img"
              />
              <p className="closet-name">{closet.name} ({closet.persona})</p>
              <p className="closet-points">Points: {closet.points}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
