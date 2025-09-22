const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Sample data (replace with DB later if needed)
const publicClosets = [
  { id: 1, name: "Minimalist Wardrobe", description: "Neutral tones and essentials." },
  { id: 2, name: "Streetwear Collection", description: "Trendy and casual fits." },
  { id: 3, name: "Formal Closet", description: "Business and event attire." },
];

// API route
app.get("/api/public-closets", (req, res) => {
  res.json(publicClosets);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
