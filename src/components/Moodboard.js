import React from 'react';

/**
 * Simple moodboard grid for saved outfits / public closets
 */
export default function Moodboard({ items = [] }) {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Moodboard</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it) => (
          <div key={it.id} className="border rounded overflow-hidden">
            <img src={it.image || '/placeholder.png'} alt={it.name} className="w-full h-40 object-cover" />
            <div className="p-2">
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-slate-600">{it.category} • {it.color}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
