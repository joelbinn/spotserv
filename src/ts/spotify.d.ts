declare module spotifyapi {
    interface Spotify {
        on(configuration:{ready?:()=>void;logout?:()=>void}):void;
        login(username:string, password:string, remember:boolean, userRemembered:boolean);
        logout():void;

        rememberedUser:string;
        playlistContainer: {
            numPlaylists:number;
            getPlaylist(index:number):Playlist
            getPlaylist():Playlist[];
            owner: User;
        };
        collaborative:boolean;
        sessionUser:User;
        version:string;
        player:Player;
        // Fudge to map to spotify.Search and be able to create instance of class Search below
        Search(searchText:string, offset?:number, limit?:number):void;
    }

    interface Player {
        play(Track):void;
        stop():void;
        resume():void;
        pause():void;
        seek(second:number):void;
        currentSecond:number;
        on(configuration:{endOfTrack:()=>void}):void;
    }

    interface Playlist {
        name:string;
        collaborative:boolean;
        link: string;
        numTracks: number;
        getTracks():Track[];
        getTrack(index:number): Track
    }

    interface Track {
        name:string;
        link:string;
        starred:boolean;
        popularity:number;
        duration:number;
        album:Album;
        artists: Artist[];
    }

    interface Album {
        name:string;
        link:string;
        getCoverBase64():string;
    }

    interface Artist {
        name:string;
        link:string;
    }

    interface User {
        displayName:string;
        canonicalName:string;
    }

    export class Search {
        execute(callback:(err, searchResult)=>void):void;
    }

    interface SpotifyStatic {
        (configuration:any): spotifyapi.Spotify;
    }
}

declare module "spotserv/node-spotify/spotify" {

    var spot:spotifyapi.SpotifyStatic;

    export = spot;
}
