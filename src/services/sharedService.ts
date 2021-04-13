import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const urlRistoranti = 'http://l4com.labforweb.it/backend/web/index.php?r=ristoranti/list';

const urlRegistrazione = 'http://l4com.labforweb.it/backend/web/test/ws/users/addUser.php';

// TODO url LOGIN

@Injectable({
    providedIn: 'root'
})

export class SharedService{

    id : number;

    constructor(private http : HttpClient){}

    getRistoranti():Observable<any>{
        return this.http.get(urlRistoranti);
    }

    getMenu():Observable<any>{
        return this.http.get("http://l4com.labforweb.it/backend/web/index.php?r=ristoranti/ristoranti-prodotti&IdRistorante=" + this.id);
    }

    postRegistrazione(oggetto):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>(urlRegistrazione, oggetto, {headers});
    }
    

    // TODO POST LOGIN
    
    
    // getDati():Observable<any>{
    //     return this.http.get(urlMockJson);
    // }

    // getTable():Observable<any>{
    //     return this.http.get(urlTable);
    // }

    // stringa1 : string = 'Contenitore 1';
    // stringa2 : string = 'Contenitore 2';
    // stringa3 : string = 'Contenitore 3';

    // concatena(evento : string){
        
    //     return evento + this.stringa1 + this.stringa2 + this.stringa3;
    // }

    // getPeople():Observable<any>{
    //     return this.http.get(urlMockServer + '/people');
    // }

    // postPeople(oggetto):Observable<any>{
    //     const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //     return this.http.post<any>(urlMockServer + '/people', oggetto, {headers});
    // }

    // putPeople(oggetto):Observable<any>{
    //     const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //     return this.http.put<any>(urlMockServer + '/people/' + this.userId2, oggetto, {headers});
    // }

    // deletePeople():Observable<any>{
    //     return this.http.delete<any>(urlMockServer + '/people/' + this.userId);
    // }
}