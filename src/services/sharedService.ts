import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const urlRistoranti = 'http://l4com.labforweb.it/backend/web/index.php?r=ristoranti/list';

const urlRegistrazione = 'http://l4com.labforweb.it/backend/web/test/ws/users/addUser.php';

const urlLogin = 'http://l4com.labforweb.it/backend/web/test/ws/users/checkUser.php';

const urlOrdine = 'http://l4com.labforweb.it/backend/web/test/ws/users/insertOrdine.php?r=ordini/insertid_usr=';

@Injectable({
    providedIn: 'root'
})

export class SharedService{

    id : number = null;

    idOrdine : number;

    // Ristorante

    idRistorante : number;
    nomeRistorante : string;
    costiConsegna : number;
    ordineMinimo : number;
    tempiConsegna : number;
    Logo: string;
    Tipologia: string;  

    // User

    usrIdLogged : number;

    isLogged : boolean = false;

    isOrder : boolean = false;

    // Session 

    statusSession : string;


     // Area Riservata

    areaRiservata : any;

    userName : string;

    // Carrello

    serviceCarrello : any;

    constructor(private http : HttpClient){}

    sessionStorageGetItem(){
        this.statusSession = sessionStorage.getItem('LoggedIn');
        if (this.statusSession == "true"){
          this.isLogged = true;
        } else if (this.statusSession == "false" || this.statusSession == null || this.statusSession == undefined) {
          this.isLogged = false;
        }
        
      }

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

    postLogin(oggetto):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>(urlLogin, oggetto, {headers});
    }

    getAreaRiservata():Observable<any>{
            return this.http.get("http://l4com.labforweb.it/backend/web/index.php?r=utenti/profile&id_usr=" + this.usrIdLogged);
    }
    
    getOrdiniUtente():Observable<any>{
        return this.http.get('http://l4com.labforweb.it/backend/web/index.php?r=utenti/ordini&id_usr=' + this.usrIdLogged); //INSERIRE this.usrIdLogged oppure 7
    }

    getDettaglioOrdine():Observable<any>{
        return this.http.get('http://l4com.labforweb.it/backend/web/index.php?r=utenti/ordine&IdOrdine=' + this.idOrdine);
    }
    
    postOrdine(oggetto):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>(urlOrdine + this.usrIdLogged, oggetto, {headers});
    }
    
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