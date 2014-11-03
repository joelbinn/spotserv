declare var spot: spotify.SpotifyStatic;

declare module spotify {
    interface SpotifyStatic {
        (configuration:any): Spotify;
    }
    interface Spotify {
        on(configuration:{ready:()=>void;logout:()=>void}):void;
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
        sessionUser:any;
        version:string;
        player:any;
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
}
declare module "spotserv/node-spotify/spotify" {
    export = spot;
}