import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from 'src/services/sharedService';

@Component({
  selector: 'app-dettaglio-menu',
  templateUrl: './dettaglio-menu.component.html',
  styleUrls: ['./dettaglio-menu.component.scss']
})
export class DettaglioMenuComponent implements OnInit {

  menuList : any;

  labelRistorante : any;

  message : string;

  constructor(public sharedService : SharedService, public ngxService: NgxUiLoaderService, private _snackBar: MatSnackBar) { }

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

  messaggioTooltip(){
    if (this.sharedService.isLogged){
      return this.message = "Aggiungi questo prodotto al carrello";
    } else if (!this.sharedService.isLogged){
      return this.message = "Devi prima eseguire il login per aggiungere prodotti";
    }
  }

  addProdotto(prodotto, prezzo){
    this.openSnackBar("Hai aggiunto al carrello: "+ prodotto, "Prezzo: € " + prezzo);
  }

  getServerMenu(){
    this.ngxService.start();
    this.sharedService.getMenu().subscribe(menu=>{
      console.log(menu, 'MENU');
      this.menuList = menu;
      this.labelRistorante = this.menuList.Ristorante;
      console.log(this.menuList, 'MENU LIST');
      this.ngxService.stop();
    })
  }


}
