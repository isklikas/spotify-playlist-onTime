Plan for your playlist songs to play when you intend them to (with a given start time). Steps to get running:

1. npm install
2. touch spotify-token-info.env
3. Edit spotify-token-info.env, with any editor of your choice, as follows:

CLIENT_ID=[YOUR_CLIENT_ID]
CLIENT_SECRET=[YOUR_CLIENT_SECRET]
PARTY_DATE=2019-02-23T23:30
PLAYLIST_URI=[The URI you get when you click on Share Playlist > Spotify URI]

4. node index.js
