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
      this.sharedService.nomeRistorante = this.ristorantiList.Ristorante
      this.ngxService.stop();
    })
  }

  

  selezionaRistorante(e){
    this.sharedService.id = e;
  }

}
