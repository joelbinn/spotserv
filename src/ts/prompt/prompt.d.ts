declare module "prompt" {
    function start():void;
    function get(properties:any,callback:(err:any, result:any)=>any)
}