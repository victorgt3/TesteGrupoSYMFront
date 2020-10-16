export class ConfigService {
    static urlBase: string = 'https://localhost:44361/';

    public static getUrlApi(endpoint: string){
        return  this.urlBase + endpoint;
    }
}