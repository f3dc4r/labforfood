import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const urlMockJson = 'https://run.mocky.io/v3/e9df3d5d-28bc-4772-a559-963a940870ba';

const urlTable = 'https://run.mocky.io/v3/cf9bf608-a9a5-4a26-9632-b8827a44d5c1';

const urlMockServer = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})

export class SharedService{

    userId : number;
    userId2 : number;

    constructor(private http : HttpClient){}

    getDati():Observable<any>{
        return this.http.get(urlMockJson);
    }

    getTable():Observable<any>{
        return this.http.get(urlTable);
    }

    stringa1 : string = 'Contenitore 1';
    stringa2 : string = 'Contenitore 2';
    stringa3 : string = 'Contenitore 3';

    concatena(evento : string){
        
        return evento + this.stringa1 + this.stringa2 + this.stringa3;
    }

    getPeople():Observable<any>{
        return this.http.get(urlMockServer + '/people');
    }

    postPeople(oggetto):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>(urlMockServer + '/people', oggetto, {headers});
    }

    putPeople(oggetto):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.put<any>(urlMockServer + '/people/' + this.userId2, oggetto, {headers});
    }

    deletePeople():Observable<any>{
        return this.http.delete<any>(urlMockServer + '/people/' + this.userId);
    }
}