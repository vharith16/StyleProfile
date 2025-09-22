// server.js
// Lightweight Express server for dev. Serves /api/public-closets
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, "db.publicClosets.json");

function loadDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Could not read DB file", err);
    return [];
  }
}

app.get("/api/public-closets", (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  let items = loadDB();

  // basic search
  if (q) {
    items = items.filter((c) => {
      return (
        (c.name || "").toLowerCase().includes(q) ||
        (c.owner || "").toLowerCase().includes(q) ||
        (c.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }

  // optional pagination
  const limit = Math.max(1, Math.min(1000, Number(req.query.limit) || 12));
  const page = Math.max(1, Number(req.query.page) || 1);
  const start = (page - 1) * limit;
  const end = start + limit;

  const total = items.length;
  const results = items.slice(start, end);

  res.json({
    total,
    page,
    limit,
    data: results,
    // For client convenience, also return flattened data (older client expects array)
    // But some clients expect plain array; detect `format=array` query param
    ...(req.query.format === "array" ? { data: results } : {}),
    // Also support plain array if requested:
    // For backward compatibility if client expects array response directly:
  });
});

// Backwards-compatible: return plain array when client requests "plain=true"
app.get("/api/public-closets/plain", (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  let items = loadDB();
  if (q) {
    items = items.filter((c) => {
      return (
        (c.name || "").toLowerCase().includes(q) ||
        (c.owner || "").toLowerCase().includes(q) ||
        (c.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }
  res.json(items);
});

app.listen(PORT, () => {
  console.log(`Dev API server running on http://localhost:${PORT}`);
});
