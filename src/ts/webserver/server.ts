/// < reference path="../spotify.d.ts" />
/// < reference path="../lodash/lodash.d.ts" />
/// < reference path="../node/node.d.ts" />
/// < reference path="../rx/rx.d.ts" />
/// < reference path="../express/express.d.ts" />
import express = require('express');
import spotify = require('spotserv/node-spotify/spotify');

export class Server {
    webapp:express.Application = express();
    spot:spotifyapi.Spotify;
    port:number = 4712;

    constructor(spot:spotifyapi.Spotify) {
        this.spot = spot;
        spot.on({
            ready: ()=> {
                console.log('Spotify is ready');
            },
            logout: ()=> {
                console.log('...Elvis has left the building!');
                setTimeout(()=> {
                    process.exit();
                }, 1000);
            }
        });

        this.configure();
    }


    start():void {
        this.webapp.listen(this.port, ()=>'Web server is ready an listens on ' + this.port);
    }

    private configure():void {
        this.webapp.route('/spot/playlists/:id').get((req, res, next)=> {
            console.log('req params is ', JSON.stringify(req.params));
            console.log("# of playlists: ',spotify.playlistContainer.numPlaylists");
            var pl0 = this.spot.playlistContainer.getPlaylist(parseInt(req.params.id));

            var pl0ResponseObject = {
                name: pl0.name
            };
            console.log('Playlist 0: ', pl0ResponseObject);
            res.status(200).json(pl0ResponseObject);
        });

        this.webapp.route('/spot/playlists').get((req, res, next)=> {
            console.log('# of playlists: ', this.spot.playlistContainer.numPlaylists);
            res.status(200).json(this.spot.playlistContainer.numPlaylists);
        });

        this.webapp.post('/spot/player/play/:plId/:trackId', (req, res)=> {
            var track = this.spot.playlistContainer
                .getPlaylist(parseInt(req.params.plId))
                .getTrack(parseInt(req.params.trackId));
            console.log('track : ', track);
            console.log('album: ', track.album);
            console.log('image: data:image/jpeg;base64,', track.album.getCoverBase64());
            this.spot.player.on({endOfTrack: ()=>console.log('END OD TRACK: ', track)});
            this.spot.player.play(track);
        });

        this.webapp.post('/spot/player/resume', (req, res)=> {
            this.spot.player.resume();
        });
        this.webapp.post('/spot/player/pause', (req, res)=> {
            this.spot.player.pause();
        });
        this.webapp.post('/spot/player/seek', (req, res)=> {
            this.spot.player.seek(parseInt(req.query.seconds));
        });
        this.webapp.get('/spot/search', (req, res)=> {
            var search:spotifyapi.Search =  new this.spot.Search(req.query.searchText, parseInt(req.query.offset), parseInt(req.query.limit));
            search.execute( (err, searchResult) => {
                console.log('searchResult: ', searchResult);
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(searchResult);
                }
            });
        });

    }
}
