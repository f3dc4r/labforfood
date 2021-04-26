import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from 'src/services/sharedService';

@Component({
  selector: 'app-area-riservata',
  templateUrl: './area-riservata.component.html',
  styleUrls: ['./area-riservata.component.scss']
})
export class AreaRiservataComponent implements OnInit {
  

  constructor(public sharedService : SharedService, public ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.sharedService.sessionStorageGetItem();
    this.getServerAreaRiservata();
  }

  getServerAreaRiservata(){
    this.ngxService.start();
    this.sharedService.getAreaRiservata().subscribe(data=>{
      console.log(data, 'AREA RISERVATA RESPONSE');
      this.sharedService.areaRiservata = data;
      //this.sharedService.userName = this.sharedService.areaRiservata.nominativo;
      this.ngxService.stop();
    })
  }

}
