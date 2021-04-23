import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/sharedService';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-ristoranti',
  templateUrl: './ristoranti.component.html',
  styleUrls: ['./ristoranti.component.scss']
})
export class RistorantiComponent implements OnInit {

  ristorantiList : any;


  constructor(public sharedService : SharedService, public ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.sharedService.sessionStorageGetItem();
    this.getServerRistoranti();
  }

  getServerRistoranti(){
    this.ngxService.start();
    this.sharedService.getRistoranti().subscribe(data=>{
      console.log(data, 'SERVER RESPONSE');
      this.ristorantiList = data;
      /*this.sharedService.nomeRistorante = this.ristorantiList.Ristorante;
      this.sharedService.idRistorante = this.ristorantiList.IdRistorante;
      this.sharedService.costiConsegna = this.ristorantiList.costiConsegna;
      console.log(this.sharedService.costiConsegna, "COSTI CONSEGNA");*/
      this.ngxService.stop();
    })
  }
/*
  IdRistorante: number
P_utente: number
IdProdotto: number
Prezzo: number (float)
Prodotto: string
Unita: number
totale: number (float)
*/


  selezionaRistorante(e){
    this.sharedService.id = e;
  }

}
