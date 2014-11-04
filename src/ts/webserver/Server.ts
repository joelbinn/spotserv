/// < reference path="../spotify.d.ts" />
/// < reference path="../lodash/lodash.d.ts" />
/// < reference path="../node/node.d.ts" />
/// < reference path="../rx/rx.d.ts" />
/// < reference path="../express/express.d.ts" />
/// < reference path="../yamljs/yamljs.d.ts" />
import express = require('express');
import spotify = require('spotserv/node-spotify/spotify');
import YAML = require('yamljs');
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
            }
        });

        YAML.load('./config.yaml', (config)=> {
            this.configure(config);
        });
    }


    start():void {
        this.webapp.listen(this.port, ()=>console.log('Spot web server is ready, try GET http://localhost:' + this.port+'/spot/search'));
    }

    private configure(config:{userName:string;password:string}):void {
        this.webapp.route('/spot/login').post((req, res, next)=> {
            console.log('/spot/login');
            var remember = req.query.remember || false;
            var userRemembered = req.query.userRemembered || false;
            this.spot.login(config.userName, config.password, remember, userRemembered);
            res.status(200).end();
        });

        this.webapp.route('/spot/logout').post((req, res, next)=> {
            console.log('/spot/logout');
            this.spot.logout();
            res.status(200).end();
        });

        this.webapp.route('/spot/playlists/:id').get((req, res, next)=> {
            console.log('/spot/playlists with params is ', JSON.stringify(req.params));
            var playlist = this.spot.playlistContainer.getPlaylist(parseInt(req.params.id));

            var pl0ResponseObject = {
                name: playlist.name
            };
            console.log('Playlist: ', pl0ResponseObject);
            res.status(200).json(pl0ResponseObject);
        });

        this.webapp.route('/spot/playlists').get((req, res, next)=> {
            console.log('/spot/playlists # of playlists: ', this.spot.playlistContainer.numPlaylists);
            res.status(200).json(this.spot.playlistContainer.numPlaylists);
        });

        this.webapp.post('/spot/player/play/:plId/:trackId', (req, res)=> {
            console.log('/spot/player/play with params: ', JSON.stringify(req.params));
            var plIndex = req.params.plId ? parseInt(req.params.plId):0;
            var trackIndex = req.params.trackId ? parseInt(req.params.trackId) : 0;
            var track = this.spot.playlistContainer
                .getPlaylist(plIndex)
                .getTrack(trackIndex);
            console.log('track : ', track);
            console.log('album: ', track.album);
            this.spot.player.on({endOfTrack: ()=>console.log('END OF TRACK: ', track)});
            setTimeout(()=> {
                this.spot.player.play(track);
            }, 1);
            res.status(200).json({artists: track.artists, name: track.name, album: track.album.name});
        });

        this.webapp.post('/spot/player/pause', (req, res)=> {
            console.log('/spot/player/pause');
            this.spot.player.pause();
            res.status(200).end();
        });

        this.webapp.post('/spot/player/resume', (req, res)=> {
            console.log('/spot/player/resume');
            this.spot.player.resume();
            res.status(200).end();
        });

        this.webapp.post('/spot/player/stop', (req, res)=> {
            console.log('/spot/player/stop');
            this.spot.player.stop();
            res.status(200).end();
        });

        this.webapp.post('/spot/player/seek', (req, res)=> {
            console.log('/spot/player/seek with query params: ', JSON.stringify(req.query));
            this.spot.player.seek(parseInt(req.query.seconds));
            res.status(200).end();
        });

        this.webapp.get('/spot/search', (req, res)=> {
            console.log('/spot/search with query params: ', JSON.stringify(req.query));
            var searchText:string = req.query.searchText || 'Layla';
            var offset:number = req.query.offset ? parseInt(req.query.offset) : 0;
            var limit:number = req.query.limit ? parseInt(req.query.limit) : 10;
            var search:spotifyapi.Search = new this.spot.Search(searchText, offset, limit);
            search.execute((err, searchResult) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(searchResult);
                }
            });
        });
    }
}
