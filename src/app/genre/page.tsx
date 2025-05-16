'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const genres = [
  { id: 'rock', label: '🎸 Rock' },
  { id: 'rap', label: '🎤 Rap' },
  { id: 'pop', label: '🎶 Pop' },
  { id: 'funk', label: '🔥 Funk' },
  { id: 'mpb', label: '🇧🇷 MPB' },
  { id: 'lofi', label: '🌙 Lo-fi' },
  { id: 'jazz', label: '🎷 Jazz' },
];

export default function GenrePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleConfirm = () => {
    if (!selected) return;
    router.push(`/api/callback?genre=${selected}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Escolha um estilo 🎵</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelected(genre.id)}
            className={`px-4 py-2 rounded-lg border-2 transition ${
              selected === genre.id
                ? 'border-green-500 bg-green-700 text-white'
                : 'border-zinc-500 text-zinc-300 hover:border-white hover:text-white'
            }`}
          >
            {genre.label}
          </button>
        ))}
      </div>
      <button
        onClick={handleConfirm}
        disabled={!selected}
        className={`px-6 py-3 rounded-xl transition-all ${
          selected
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
        }`}
      >
        Criar minha playlist
      </button>
    </main>
  );
}
