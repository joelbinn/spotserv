/// < reference path="./spotify.d.ts" />
/// < reference path="./lodash/lodash.d.ts" />
/// < reference path="./prompt/prompt.d.ts" />
/// < reference path="./node/node.d.ts" />
/// < reference path="./rx/rx.d.ts" />
import rx = require('rx');
import _ = require('lodash');
import prompt = require('prompt')
import spotifyConfig = require('spotserv/node-spotify/spotify');


export function start() {
    var spotify = spotifyConfig({appkeyFile: './spotify_appkey.key'});

    var properties = [
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

    console.log("spotify: ", spotify.version);

    spotify.on({
        ready: ()=> {
            console.log('Spotify is ready');
            console.log("# of playlists: ',spotify.playlistContainer.numPlaylists");
            console.log('playlist 0: ', spotify.playlistContainer.getPlaylist(0));
            var track = spotify.playlistContainer.getPlaylist(1).getTrack(1);
            console.log('track 0: ', track);
            console.log('album: ', track.album);
            console.log('image: data:image/jpeg;base64,' + track.album.getCoverBase64());
            spotify.player.play(track);
        },
        logout: ()=> {
            console.log('...Elvis has left the building!');
            setTimeout(()=> {
                process.exit();
            }, 1000);
        }
    });

    process.on('SIGINT', () => {
            console.log('Logging out from Spotify...');
            spotify.logout();
            setTimeout(()=> {
                console.log('Exit!');
                process.exit();
            }, 10000);
        }
    );


    prompt.start();

    prompt.get(properties, (err, result) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log('Command-line input received:');
        console.log('  Username: ' + result.username);
        spotify.login(result.username, result.password, false, false);
    });
};