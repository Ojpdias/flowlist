'use client';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold mb-4">🎶 Flowlist</h1>
      <p className="text-lg text-zinc-300 mb-6 max-w-md">
        Crie playlists personalizadas com base no seu estilo e perfil Spotify.
      </p>
      <a href="/api/login">
        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all">
          🎧 Conectar com Spotify
        </button>
      </a>
    </main>
  );
}
