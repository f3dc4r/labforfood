import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from 'src/services/sharedService';

@Component({
  selector: 'app-dettaglio-ordini',
  templateUrl: './dettaglio-ordini.component.html',
  styleUrls: ['./dettaglio-ordini.component.scss']
})
export class DettaglioOrdiniComponent implements OnInit {

  dettaglioList : any;
  

  constructor(public sharedService : SharedService, public ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getServerDettaglioOrdine();
  }

  getServerDettaglioOrdine(){
    this.ngxService.start();
    this.sharedService.getDettaglioOrdine().subscribe(data=>{
      console.log(data, 'MENU');
      this.dettaglioList = data;
      this.ngxService.stop();
    })
  }

}
