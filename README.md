Did you ever wonder when planning a party, when will the songs in the playlist play? Wonder no more! Now you can plan for your playlist songs to play when you intend them to, by giving this script, the start time of your party! Steps to get running:

1. Clone the repo and cd to the directory 
2. ```npm install ```
3. ```touch spotify-token-info.env ```
4. Edit spotify-token-info.env, with any editor of your choice, as follows:

```
CLIENT_ID=[YOUR_CLIENT_ID]
CLIENT_SECRET=[YOUR_CLIENT_SECRET]
PARTY_DATE=2019-02-23T23:30
PLAYLIST_URI=[The URI you get when you click on Share Playlist > Spotify URI]
```

4. ```node index.js ```
