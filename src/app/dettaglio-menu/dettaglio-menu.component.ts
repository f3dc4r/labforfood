import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from 'src/services/sharedService';

@Component({
  selector: 'app-dettaglio-menu',
  templateUrl: './dettaglio-menu.component.html',
  styleUrls: ['./dettaglio-menu.component.scss']
})
export class DettaglioMenuComponent implements OnInit {

  public modalRef: BsModalRef;
  public modalNewRef: BsModalRef;

  addProductMessage: boolean = false;

  menuList: any;

  labelRistorante: any;

  message: string;

  // Prodotti

  indiceArr: any;

  quantita: number = 0;

  IdRistorante: number;
  P_utente: number;
  IdProdotto: number;
  Prezzo: number;
  Prodotto: string;
  Unita: number;
  totale: number;

  nomeRistorante: string;

  alreadyInserted: boolean = false;

  arrProdotti: Array<any> = [];

  carrelloprodotti: Array<any> = [];

  badgeCarrello : number;


  constructor(public sharedService: SharedService, public ngxService: NgxUiLoaderService, private _snackBar: MatSnackBar, private modalService: BsModalService, private route: Router) { }

  ngOnInit(): void {
    this.getServerMenu();
    this.messaggioTooltip();
  }

  openSnackBar(prodotto: string, prezzo: string) {
    this._snackBar.open(prodotto, prezzo, {
      duration: 2000, horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  public openModal(addproduct: TemplateRef<any>) {
    this.modalRef = this.modalService.show(addproduct);
  }

  public closeModal() {
    this.modalService.hide();
  }

  goListaMenu() {
    this.route.navigate(['/dettaglio-menu']); // navigate to other page
  }

  messaggioTooltip() {
    if (this.sharedService.isLogged) {
      return this.message = "Aggiungi questo prodotto al carrello";
    } else if (!this.sharedService.isLogged) {
      return this.message = "Devi prima eseguire il login per aggiungere prodotti";
    }
  }

  addQty(){
    if(this.quantita < 99){
      this.quantita++;
    }else{
      return 0;
    }
  }

  delQty(){
    if(this.quantita > 0){
      return this.quantita--;
    }else if(this.quantita === 0){
        return 0;
      }

  }

  isEmptyQuantity(){
    if (this.quantita === 0){
      return true;
    }else{
      return false;
    }
  }

  addProdotto(product, price, IdRestaurant, Restaurant, IdProduct, ) {
    this.P_utente = this.sharedService.areaRiservata.IdUtente;
    console.log(this.P_utente);
    this.nomeRistorante = Restaurant;
    this.IdRistorante = IdRestaurant;
    this.IdProdotto = IdProduct;
    this.Prezzo = parseFloat(price);
    this.Prodotto = product;
    this.Unita = this.quantita;
    this.totale = (this.Prezzo * this.Unita);

    console.log(this.arrProdotti.length, "lunghezza array arrProdotti" );


    if (this.arrProdotti.length == 0) {
      this.arrProdotti.push({ IdRistorante: this.IdRistorante, P_utente: this.P_utente, IdProdotto: this.IdProdotto, Prezzo: this.Prezzo, Prodotto: this.Prodotto, Unita: this.Unita, totale: this.totale });
      console.log(this.arrProdotti, "arr Prodotto nuovo prodotto");
      this.addProductMessage = true;
      setTimeout(() => { this.addProductMessage = false; }, 2000);
      setTimeout(() => { this.modalService.hide(); }, 1000);
      this.quantita = 0;
      this.badgeCarrello = this.arrProdotti.length;

    } else {

      this.indiceArr = this.arrProdotti.findIndex(((obj: any) => obj.IdProdotto === this.IdProdotto));
      console.log(this.indiceArr, "valore indiceArr");
      
      if (this.indiceArr !== -1 || this.indiceArr === undefined || this.indiceArr === null) {
        this.arrProdotti[this.indiceArr].Unita = this.arrProdotti[this.indiceArr].Unita + this.Unita;
        console.log(this.arrProdotti, "arr Prodotto modifica unità");
        this.addProductMessage = true;
        setTimeout(() => { this.addProductMessage = false; }, 2000);
        setTimeout(() => { this.modalService.hide(); }, 1000);
        this.quantita = 0;
        this.badgeCarrello = this.arrProdotti.length;

      } else {
        this.arrProdotti.push({ IdRistorante: this.IdRistorante, P_utente: this.P_utente, IdProdotto: this.IdProdotto, Prezzo: this.Prezzo, Prodotto: this.Prodotto, Unita: this.Unita, totale: this.totale });
        console.log(this.arrProdotti, "arrProdotti nuovo prodotto else");
        this.addProductMessage = true;
        setTimeout(() => { this.addProductMessage = false; }, 2000);
        setTimeout(() => { this.modalService.hide(); }, 1000);
        this.quantita = 0;
        this.badgeCarrello = this.arrProdotti.length;

      }
    }
  }

  checkCarrello(){
    if (this.arrProdotti.length == 0){
      return true;
    } else {
      return false;
    }
  }


  getServerMenu() {
    this.ngxService.start();
    this.sharedService.getMenu().subscribe(menu => {
      console.log(menu, 'MENU');
      this.menuList = menu;
      this.labelRistorante = this.menuList[0].Ristorante;
      console.log(this.menuList, 'MENU LIST');
      this.ngxService.stop();
    })
  }


}


// TODO
/*

Visualizzare il carrello
Passare i valori al componente carrello
Calcolare il totale
Applicare gli sconti
Ricalcolare il totale
Schermata indirizzo
Schermata riassunto ordine
Pagamento --> Inserimento Ordine --> Fare post


Se vado al carrello posso tornare al detaglio ordine, ma non posso tornare alla lista ristoranti
Se clicco su ristorante Apro modal che mi dice se voglio svuotare il carrello e ordinare da un altro ristorante oppure tornare al mio dettaglio ordine 

Cambiare le immagini di sfondo (una in particolare)

*/