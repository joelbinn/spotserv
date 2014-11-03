/// < reference path="./spotify.d.ts" />
/// < reference path="./lodash/lodash.d.ts" />
/// < reference path="./prompt/prompt.d.ts" />
/// < reference path="./node/node.d.ts" />
/// < reference path="./rx/rx.d.ts" />
import rx = require('rx');
import _ = require('lodash');
import prompt = require('prompt');
import spotify = require('spotserv/node-spotify/spotify');
import webserver = require('./webserver/Server');

export function start() {
    var spot:spotifyapi.Spotify = spotify({appkeyFile: './spotify_appkey.key'});
    console.log("spotify: ", spot.version);
    var webServer:webserver.Server = new webserver.Server(spot);

    process.on('SIGINT', () => {
            console.log('Logging out from Spotify...');
            spot.logout();
            setTimeout(()=> {
                console.log('Exit!');
                process.exit();
            }, 10000);
        }
    );


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
    prompt.start();
    prompt.get(properties, (err, result) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log('Command-line input received:');
        console.log('  Username: ' + result.username);
        spot.login(result.username, result.password, false, false);
        webServer.start();
    });
}