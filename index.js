/*

This app requires a file called "spotify-token-info.env" (omitted for protection of my own data), formatted as follows:

CLIENT_ID=[YOUR_CLIENT_ID]
CLIENT_SECRET=[YOUR_CLIENT_SECRET]
PARTY_DATE=2019-02-23T23:30
PLAYLIST_URI=[The URI you get when you click on Share Playlist > Spotify URI]

*/
const
  dotenv = require('dotenv').config({path: __dirname + '/spotify-token-info.env'}),
  CLIENT_ID = process.env.CLIENT_ID,
  CLIENT_SECRET = process.env.CLIENT_SECRET,
  PARTY_DATE = process.env.PARTY_DATE,
  PLAYLIST_URI = process.env.PLAYLIST_URI;

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET
});

spotifyApi
  .clientCredentialsGrant()
  .then(function(data) {
    // Set the access token on the API object so that it's used in all future requests
    spotifyApi.setAccessToken(data.body['access_token']);

    return spotifyApi.getPlaylist(PLAYLIST_URI)
  })
  .then(function(data) {
    var playlistID = data.body.id;
    var totalSongs = data.body.tracks.total;
    var repeatsNeeded = Math.floor(totalSongs/100);
    var offset = 0;
    var allSongs = [];
    spotifyApi.getPlaylistTracks(playlistID, {offset: offset,limit: 100})
    .then(function(data) {
      allSongs = allSongs.concat(data.body.items);
      for (var r = 0; r < repeatsNeeded; r++) {
        offset += 100;
        spotifyApi.getPlaylistTracks(playlistID, {offset: offset,limit: 100})
        .then(function(data) {
          allSongs = allSongs.concat(data.body.items);
          if (allSongs.length == totalSongs) {
            songsArrayReady(allSongs);
          }
        })
        .catch(function(err) {
          console.log('Unfortunately, something has gone wrong.', err.message);
        });
      }
    })
    .catch(function(err) {
      console.log('Unfortunately, something has gone wrong.', err.message);
    });
  })
  .catch(function(err) {
    console.log('Unfortunately, something has gone wrong.', err.message);
  });

  function songsArrayReady(allSongs) {
    var moment = require('moment');
    moment().format();
    var partyDate = moment(PARTY_DATE)
    for (var s = 0; s < allSongs.length; s++) {
      var currentSong = allSongs[s];
      var songTitle = currentSong.track.name;
      var songDuration = currentSong.track.duration_ms;
      var addedDate = moment(partyDate).add(songDuration/1000, 'seconds');
      var timeAtStart = moment(partyDate).hour() + ":" + moment(partyDate).minute();
      var timeWhenComplete = moment(addedDate).hour() + ":" + moment(addedDate).minute();
      var currentRow = s+1;
      var txtToShow = currentRow + ". " + songTitle + ": " + timeAtStart + " -> " + timeWhenComplete;
      console.log(txtToShow);
      partyDate = addedDate;
    }
  }
