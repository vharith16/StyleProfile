import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Moodboard from '../../components/Moodboard';

export default function PublicClosetPage() {
  const router = useRouter();
  const { id } = router.query;
  const [closet, setCloset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function load() {
      setLoading(true);
      try {
        // For demo: GET all and filter by a public tag or id in your store
        const res = await fetch('/api/closet');
        const data = await res.json();
        // Suppose items have `publicId` or `ownerId` — adapt to your store
        const items = data.items.filter(it => it.publicId === id || it.ownerId === id);
        setCloset({ id, items });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="p-6">Loading public closet...</div>;
  if (!closet) return <div className="p-6">No public closet found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Public Closet — {closet.id}</h2>
      <Moodboard items={closet.items} />
    </div>
  );
}
