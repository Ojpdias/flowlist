import { NextRequest } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
  'playlist-modify-public',
  'playlist-modify-private',
  'user-top-read'
];

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID!,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI!
});

export async function GET(request: NextRequest) {
  const url = spotifyApi.createAuthorizeURL(scopes, 'flowlist_state');
  return Response.redirect(url);
}
