import { Injectable } from "@angular/core";

@Injectable()
export class ConfigProviders {

    static API_URL: string = "http://api.ftecnologia.com.br/public/api/v1";
    static SOCKET_URL: string = "http://foco-node.herokuapp.com";

}