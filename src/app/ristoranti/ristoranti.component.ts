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
  
  ristoranteSelezionato: any;
  indiceRistorante : any;

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
      this.ngxService.stop();
    })
  }

  selezionaRistorante(e){
    this.sharedService.id = e;
    this.indiceRistorante = this.ristorantiList.findIndex(((obj: any) => obj.IdRistorante === e));
    console.log(this.indiceRistorante, "valore indice Ristorante");
    this.sharedService.costiConsegna = parseFloat(this.ristorantiList[this.indiceRistorante].CostiConsegna);
    this.sharedService.idRistorante = parseInt(this.ristorantiList[this.indiceRistorante].idRistorante);
    this.sharedService.Logo = this.ristorantiList[this.indiceRistorante].Logo;
    this.sharedService.ordineMinimo = parseFloat(this.ristorantiList[this.indiceRistorante].OrdineMinimo);
    this.sharedService.nomeRistorante = this.ristorantiList[this.indiceRistorante].Ristorante;
    this.sharedService.tempiConsegna = this.ristorantiList[this.indiceRistorante].TempiConsegna;
    this.sharedService.Tipologia = this.ristorantiList[this.indiceRistorante].tipologia.Tipologia;
    
    console.log(this.sharedService.costiConsegna, "COSTI CONSEGNA");
    console.log(this.sharedService.ordineMinimo, "ORDINE MINIMO");
  }

}
