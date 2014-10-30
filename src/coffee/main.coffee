module.exports = ()->
  _ = require('lodash')
  prompt = require('prompt')
  hello = require('spotserv/test/hello')

  properties = [
    {
      name: 'username',
      validator: /^[a-zA-Z\s\-]+$/,
      warning: 'Username must be only letters, spaces, or dashes'
    },
    {
      name: 'password',
      hidden: true
    }
  ];

  hello.greet 'Banan'

  spotify = require('./node-spotify/spotify')({appkeyFile: './spotify_appkey.key'});

  console.log("spotify: ", spotify.version)

  spotify.on({
    ready: ()->
      console.log 'Spotify is ready'
      console.log "# of playlists: #{spotify.playlistContainer.numPlaylists}"
      console.log 'playlist 0: ', spotify.playlistContainer.getPlaylist(0)
      track = spotify.playlistContainer.getPlaylist(1).getTrack(1)
      console.log 'track 0: ', track
      console.log 'album: ', track.album
      console.log 'image: data:image/jpeg;base64,'+track.album.getCoverBase64()
      spotify.player.play(track)

    logout: ()->
      console.log '...Elvis has left the building!'
      process.exit()
  });

  process.on('SIGINT', () ->
    console.log 'Logging out from Spotify...'
    spotify.logout()
  );

  prompt.start();

  prompt.get(properties, (err, result) ->
    return onErr(err) if err
    console.log('Command-line input received:');
    console.log('  Username: ' + result.username);
    console.log('  Password: ' + result.password);
    spotify.login(result.username, result.password, false, false);
  );

