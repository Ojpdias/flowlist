import { NextRequest } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const genreParam = request.nextUrl.searchParams.get('genre') || 'rock';

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID!,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI!
  });

  try {
    const data = await spotifyApi.authorizationCodeGrant(code!);
    spotifyApi.setAccessToken(data.body.access_token);
    spotifyApi.setRefreshToken(data.body.refresh_token);

    const me = await spotifyApi.getMe();
    const top = await spotifyApi.getMyTopArtists({ limit: 10 });

    const userArtists = top.body.items.filter(artist =>
      artist.genres.some(g => g.includes(genreParam))
    );

    const seedIds = userArtists.slice(0, 5).map(a => a.id);

    const recs = await spotifyApi.getRecommendations({
      seed_artists: seedIds,
      seed_genres: [genreParam],
      limit: 15
    });

    const uris = recs.body.tracks.map(t => t.uri);

    const playlist = await spotifyApi.createPlaylist(me.body.id, `Flowlist: ${genreParam.toUpperCase()} 🎵`, {
      description: `Uma playlist personalizada com base no seu perfil e no estilo ${genreParam}.`,
      public: false
    });

    await spotifyApi.addTracksToPlaylist(playlist.body.id, uris);

    return Response.redirect(playlist.body.external_urls.spotify);
  } catch (err) {
    console.error(err);
    return new Response('Erro ao criar playlist.', { status: 500 });
  }
}
