import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from 'src/services/sharedService';

@Component({
  selector: 'app-ordini-utente',
  templateUrl: './ordini-utente.component.html',
  styleUrls: ['./ordini-utente.component.scss']
})
export class OrdiniUtenteComponent implements OnInit {

  usrOrdini : any;

  constructor(public sharedService : SharedService, public ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getServerOrdiniUtente();
  }

  getServerOrdiniUtente(){
    this.ngxService.start();
    this.sharedService.getOrdiniUtente().subscribe(data=>{
      console.log(data, 'UTENTI ORDINI RESPONSE');
      this.usrOrdini = data;
      this.ngxService.stop();
    })
  }

  dettaglioOrdine(e){
    this.sharedService.idOrdine = e;
  }

}
