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

    process.on('SIGINT', () => {
            if (spot.sessionUser !== undefined) {
                console.log('Logging out ' + spot.sessionUser.displayName + ' from Spotify...');
                spot.on({
                    logout: ()=> {
                        console.log('...logged out. Exit!');
                        process.exit();
                    }
                });
                console.log('Logging out...');
                spot.logout();
            } else {
                console.log('Exit!');
                process.exit();
            }
        }
    );

    var webServer:webserver.Server = new webserver.Server(spot);
    webServer.start();
}