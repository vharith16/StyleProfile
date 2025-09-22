// src/publicClosets.js
import React, { useEffect, useState } from "react";

/**
 * PublicClosets component
 * - Fetches /api/public-closets
 * - Shows a searchable, filterable grid of closet cards
 * - Each card shows name, owner, tags, and a progress bar (fill = fullness / target)
 */

function ProgressBar({ value = 0, max = 100 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="h-3 rounded-full transition-all duration-300"
        style={{ width: `${pct}%`, backgroundColor: "#7c3aed" }}
        aria-valuenow={pct}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
}

function ClosetCard({ closet }) {
  const { id, name, owner, fullness, capacity, tags = [], image } = closet;
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          {image ? (
            <img src={image} alt={`${name}`} className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400 text-sm">No image</div>
          )}
        </div>
        <div className="flex-1">
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-sm text-gray-500">Owner: {owner}</div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-xs text-gray-500">Fill</div>
        <ProgressBar value={fullness} max={capacity || 100} />
        <div className="text-xs text-gray-500">{fullness} / {capacity || 100}</div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.slice(0, 5).map((t, i) => (
          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{t}</span>
        ))}
      </div>

      <div className="mt-auto flex gap-2">
        <button className="flex-1 px-3 py-2 rounded-md border text-sm hover:bg-gray-50">View</button>
        <button className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:brightness-95">Join</button>
      </div>
    </div>
  );
}

export default function PublicClosets() {
  const [closets, setClosets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [q, setQ] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const LIMIT = 12;

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    const params = new URLSearchParams();
    if (q) params.append("q", q);
    params.append("limit", String(1000)); // fetch all for client-side demo; the backend supports pagination if desired

    fetch(`/api/public-closets?${params.toString()}`, {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => {
        setClosets(data || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("fetch error", err);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [q]);

  useEffect(() => {
    let items = closets;
    if (tagFilter) {
      items = items.filter((c) => (c.tags || []).map(t => t.toLowerCase()).includes(tagFilter.toLowerCase()));
    }
    // if q already used by server, this is extra safety
    if (q) {
      const lower = q.toLowerCase();
      items = items.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.owner.toLowerCase().includes(lower) ||
          (c.tags || []).some((t) => t.toLowerCase().includes(lower))
      );
    }
    setFiltered(items);
    setPage(1);
  }, [closets, tagFilter, q]);

  const tags = Array.from(new Set((closets || []).flatMap((c) => c.tags || []))).slice(0, 20);

  // Pagination
  const pageCount = Math.max(1, Math.ceil(filtered.length / LIMIT));
  const pageItems = filtered.slice((page - 1) * LIMIT, page * LIMIT);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-2xl font-semibold">Public Closets</h2>
        <div className="flex gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search closets or owners..."
            className="px-3 py-2 border rounded-lg w-64"
          />
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All tags</option>
            {tags.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-500">No closets found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageItems.map((c) => (
              <ClosetCard key={c.id} closet={c} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, filtered.length)} of {filtered.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <div className="text-sm">Page {page} / {pageCount}</div>
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                disabled={page === pageCount}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

