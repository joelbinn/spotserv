declare module yaml {
    interface Yaml {
        parse(input:any, exceptionOnInvalidType?:any, objectDecoder?:any):any;
        parseFile(path:any, callback?:any, exceptionOnInvalidType?:any, objectDecoder?:any):any;
        dump(input:any, inline?:any, indent?:any, exceptionOnInvalidType?:any, objectEncoder?:any):any;
        register():any;
        stringify(input:any, inline?:any, indent?:any, exceptionOnInvalidType?:any, objectEncoder?:any):any;
        load(path:any, callback?:any, exceptionOnInvalidType?:any, objectDecoder?:any):any;
    }
}
declare module "yamljs" {
    var yaml : yaml.Yaml;
    export = yaml;
}