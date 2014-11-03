/// < reference path="../spotify.d.ts" />
/// < reference path="../lodash/lodash.d.ts" />
/// < reference path="../node/node.d.ts" />
/// < reference path="../rx/rx.d.ts" />
export class Server {
    spotify:spotify.Spotify;

    constructor(spotify:spotify.Spotify) {
        this.spotify = spotify;
    }

    start():void {
        console.log('Start server!');
    }
}
