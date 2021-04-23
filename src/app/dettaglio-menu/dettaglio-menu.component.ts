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

  public modalRef:BsModalRef;
  public modalNewRef:BsModalRef;

  addProductMessage : boolean = false;

  menuList : any;

  labelRistorante : any;

  message : string;

  // Prodotti

  quantita : number = 0;

  IdRistorante : number;
  P_utente: number;
  IdProdotto : number;
  Prezzo : number;
  Prodotto : string;
  Unita : number;
  totale: number;

  nomeRistorante : string;

  alreadyInserted : boolean = false;

  arrProdotti : Array<any> = [];

  carrelloprodotti : Array<any> = [];


  constructor(public sharedService : SharedService, public ngxService: NgxUiLoaderService, private _snackBar: MatSnackBar, private modalService : BsModalService, private route:Router) { }

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

  public openModal(addproduct: TemplateRef<any>){
    this.modalRef = this.modalService.show(addproduct);
  }

  public closeModal(){
    this.modalService.hide();
  }

  goListaMenu(){
		this.route.navigate(['/dettaglio-menu']); // navigate to other page
	}

  messaggioTooltip(){
    if (this.sharedService.isLogged){
      return this.message = "Aggiungi questo prodotto al carrello";
    } else if (!this.sharedService.isLogged){
      return this.message = "Devi prima eseguire il login per aggiungere prodotti";
    }
  }

  addProdotto( product, price, IdRestaurant, Restaurant, IdProduct){
    
    this.P_utente = this.sharedService.areaRiservata.IdUtente;
    this.nomeRistorante = Restaurant;
    this.IdRistorante = IdRestaurant;
    this.IdProdotto = IdProduct;
    this.Prezzo = price;
    this.Prodotto = product;
    this.Unita = this.quantita;
    this.arrProdotti.push([{IdRistorante: this.IdRistorante, P_utente : this.P_utente, IdProdotto : this.IdProdotto, Prezzo : this.Prezzo, Prodotto : this.Prodotto, Unita : this.Unita, totale : this.Prezzo * this.Unita}]);
    console.log(this.arrProdotti);
    this.addProductMessage = true;
    this.quantita = 0;
    
    setTimeout(()=>{ this.addProductMessage = false;}, 2000);

    setTimeout(()=>{ this.modalService.hide();}, 1000);
    
   /* if (this.arrProdotti.length == 0|| this.arrProdotti == null || this.arrProdotti == undefined || !this.alreadyInserted){
      this.Unita = 1;
      this.arrProdotti.push([{IdRistorante: this.IdRistorante, P_utente : this.P_utente, IdProdotto : this.IdProdotto, Prezzo : this.Prezzo, Prodotto : this.Prodotto, Unita : this.Unita, totale : this.Prezzo * this.Unita}]);
      this.carrelloprodotti.push(this.arrProdotti);
      console.log(this.arrProdotti, "DENTRO IF");
      this.alreadyInserted = true;
    }
    else if (this.isInserted(this.IdProdotto, this.arrProdotti)){
      this.carrelloprodotti = this.arrProdotti.find((o, i) =>{
        if (o.IdProdotto === IdProduct) {
          this.Unita = o.Unita + 1;
          this.arrProdotti[i] = {IdRistorante: this.IdRistorante, P_utente : this.P_utente, IdProdotto : this.IdProdotto, Prezzo : this.Prezzo, Prodotto : this.Prodotto, Unita : this.Unita, totale : this.Prezzo * this.Unita};
          //return true;
        }
      });
    }
    else {
      this.Unita = 1;
      this.arrProdotti.push([{IdRistorante: this.IdRistorante, P_utente : this.P_utente, IdProdotto : this.IdProdotto, Prezzo : this.Prezzo, Prodotto : this.Prodotto, Unita : this.Unita, totale : this.Prezzo * this.Unita}]);
      this.carrelloprodotti.push(this.arrProdotti);
    }
    console.log(this.arrProdotti.length);
    console.log(this.carrelloprodotti)*/
  }

  /*isInserted(namekey, myArray){
    for (var i=0; i<myArray.length; i++)
    {
      if (myArray[i].IdRistorante === namekey){
        return this.alreadyInserted = true;
      }
    }
  }*/

//   function search(nameKey, myArray){
//     for (var i=0; i < myArray.length; i++) {
//         if (myArray[i].name === nameKey) {
//             return myArray[i];
//         }
//     }
// }

// var array = [
//     { name:"string 1", value:"this", other: "that" },
//     { name:"string 2", value:"this", other: "that" }
// ];

// var resultObject = search("string 1", array);






//   let arr = [
//     { name:"string 1", value:"this", other: "that" },
//     { name:"string 2", value:"this", other: "that" }
// ];

// let obj = arr.find((o, i) => {
//     if (o.name === 'string 1') {
//         arr[i] = { name: 'new string', value: 'this', other: 'that' };
//         return true; // stop searching
//     }
// });


  getServerMenu(){
    this.ngxService.start();
    this.sharedService.getMenu().subscribe(menu=>{
      console.log(menu, 'MENU');
      this.menuList = menu;
      this.labelRistorante = this.menuList[0].Ristorante;
      console.log(this.menuList, 'MENU LIST');
      this.ngxService.stop();
    })
  }


}
