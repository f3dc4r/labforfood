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

  constructor(public sharedService : SharedService, public ngxService: NgxUiLoaderService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getServerMenu();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  addProdotto(id, prodotto){
    this.openSnackBar(id, prodotto);
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
