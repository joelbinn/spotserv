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
        playlistContainer:any;
        sessionUser:any;
        version:string;
        player:any;
    }
}
declare module "spotserv/node-spotify/spotify" {
    export = spot;
}