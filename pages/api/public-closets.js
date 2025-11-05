// pages/api/public-closets.js
export default function handler(req, res) {
  const { filter } = req.query;

  const data = [
    {
      id: 1,
      name: "Classic Wardrobe",
      category: "Formal",
      image: "https://images.unsplash.com/photo-1601233741160.jpg",
      description: "Elegant formal outfits and suits.",
    },
    {
      id: 2,
      name: "Streetwear Hub",
      category: "Casual",
      image: "https://images.unsplash.com/photo-1586481869651.jpg",
      description: "Trendy and urban street fashion.",
    },
    {
      id: 3,
      name: "Boho Closet",
      category: "Vintage",
      image: "https://images.unsplash.com/photo-1517841905240.jpg",
      description: "Free-spirited and colorful designs.",
    },
  ];

  const filtered = filter
    ? data.filter((c) =>
        c.category.toLowerCase().includes(filter.toLowerCase())
      )
    : data;

  res.status(200).json(filtered);
}
