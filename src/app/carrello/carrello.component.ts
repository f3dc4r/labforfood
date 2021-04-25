import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from 'src/services/sharedService';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})
export class CarrelloComponent implements OnInit {

  idProdotto : number;

  carrelloList : any;

  subTotale : number;

  indiceArr : any;

  ordineMinimo : number;

  costiConsegna : number = 0;

  public modalRef:BsModalRef;
  public modalNewRef:BsModalRef;

  constructor(public sharedService : SharedService, public ngxService: NgxUiLoaderService, private route:Router, private modalService : BsModalService) { }

  ngOnInit(): void {
    this.getCarrello();
    this.calcoloSubTotaleOrdine();
  }

  getCarrello(){
    this.carrelloList = this.sharedService.serviceCarrello;
    this.ordineMinimo = this.sharedService.ordineMinimo;
  }

  chkOrdine(){
    if (this.carrelloList){
      this.sharedService.isOrder = true;
    } else {
      this.sharedService.isOrder = false;
    }
    
  }

  public openModal(modificaordine: TemplateRef<any>){
    this.modalRef = this.modalService.show(modificaordine);
  }

  public closeModal(){
    this.modalService.hide();
  }

  goRistoranti(){
		this.route.navigate(['/ristoranti']); // navigate to ristoranti
	}

  modificaOrdine(){
    this.sharedService.serviceCarrello = [];
    this.carrelloList = [];
    this.sharedService.isOrder = false;
    this.closeModal();
    this.goRistoranti();
  }

  calcoloSubTotaleOrdine(){
    console.log(this.carrelloList);
    this.subTotale = this.carrelloList.reduce(function (total:number, currentValue) {
      return total + (currentValue.totale);
  }, 0);
  if(this.subTotale >= this.ordineMinimo){
    this.costiConsegna = 0;
    this.subTotale = this.subTotale + this.costiConsegna;
  } else if(this.subTotale < this.ordineMinimo) {
    this.costiConsegna = this.sharedService.costiConsegna;
    this.subTotale = this.subTotale + this.costiConsegna;
  }
  
  console.log(this.subTotale);
  console.log(typeof(this.subTotale));
  }

  addQty(idprodotto){
    this.idProdotto = idprodotto;
    this.indiceArr = this.carrelloList.findIndex(((obj: any) => obj.IdProdotto === this.idProdotto));
    console.log(this.indiceArr, "valore indiceArr");
    if (this.indiceArr !== -1 || this.indiceArr === undefined || this.indiceArr === null) {
      if(this.carrelloList[this.indiceArr].Unita < 99){
        this.carrelloList[this.indiceArr].Unita++;
        this.carrelloList[this.indiceArr].totale = this.carrelloList[this.indiceArr].Unita * this.carrelloList[this.indiceArr].Prezzo;
        this.calcoloSubTotaleOrdine();
        this.chkOrdine();
      }else{
        return 0;
      }
    }else{
      return 0;
    }
  }

  delQty(idprodotto){
    this.idProdotto = idprodotto;
    this.indiceArr = this.carrelloList.findIndex(((obj: any) => obj.IdProdotto === this.idProdotto));
    console.log(this.indiceArr, "valore indiceArr");
    if (this.indiceArr !== -1 || this.indiceArr === undefined || this.indiceArr === null) {
    if (this.carrelloList[this.indiceArr].Unita > 0){
      this.carrelloList[this.indiceArr].Unita--;
      if (this.carrelloList[this.indiceArr].Unita === 0){
        this.deleteProdotto(idprodotto);
        this.calcoloSubTotaleOrdine();
        this.chkOrdine();
      }else{
        this.carrelloList[this.indiceArr].totale = parseFloat(this.carrelloList[this.indiceArr].Unita) * parseFloat(this.carrelloList[this.indiceArr].Prezzo)
        this.carrelloList[this.indiceArr].totale = parseFloat(this.carrelloList[this.indiceArr].totale);
        this.calcoloSubTotaleOrdine();
        this.chkOrdine();
      }
    }else if(this.carrelloList[this.indiceArr].Unita === 0){
        this.deleteProdotto(idprodotto);
        this.chkOrdine();
      }
    }else {
      return 0;
    }

  }

  deleteProdotto(idprodotto){
    this.idProdotto = idprodotto;
    this.indiceArr = this.carrelloList.findIndex(((obj: any) => obj.IdProdotto === this.idProdotto));
    console.log(this.indiceArr, "valore indiceArr");
    this.carrelloList.splice(this.indiceArr, 1);
    this.getCarrello();
    this.calcoloSubTotaleOrdine();
  }


}
