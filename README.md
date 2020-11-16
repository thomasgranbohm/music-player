# Spotify Music player

Built with Svelte, Sapper and Express!
Uses Spotify's [Web API](https://developer.spotify.com/documentation/web-api/) and [Web Playback API](https://developer.spotify.com/documentation/web-playback-sdk/)

A logged in user gets access to:

-   Saved tracks and albums
-   Playlists
-   Statistics

## Coming soon

-   Web playback
-   Responsive design
-   Sessions instead of JWT

## `.env` file should look like this

```conf
CLIENT_ID=<your Spotify App client ID>
CLIENT_SECRET=<your Spotify App client secret>
BASE_URL=<your Spotify redirect uri>
JWT_SECRET=<your JWT Secret>
PORT=<preferred port>
```
