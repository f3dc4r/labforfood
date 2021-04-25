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

  testosconto : string;

  msgSconto : string;

  testsconto = false;

  testscontoErr = false;

  scontoCliccato : boolean = false;

  datiInviati : any;

  checkInvio : boolean = false;

  constructor(public sharedService : SharedService, public ngxService: NgxUiLoaderService, private route:Router, private modalService : BsModalService) { }

  ngOnInit(): void {
    this.getCarrello();
    this.calcoloSubTotaleOrdine();
  }

  getCarrello(){
    this.carrelloList = this.sharedService.serviceCarrello;
    this.ordineMinimo = this.sharedService.ordineMinimo;
    console.log(this.carrelloList, "Cosa c'è dentro carrelloList");
    if (this.carrelloList.length == 0){
      this.checkInvio = false;
    }else{
      this.checkInvio = true;
    }
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
    this.sharedService.costiConsegna = 0;
    this.sharedService.idRistorante = 0;
    this.sharedService.ordineMinimo = 0;
    this.sharedService.isOrder = false;
    this.checkInvio = false;
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
    this.checkInvio = true;
  } else if(this.subTotale < this.ordineMinimo) {
    this.costiConsegna = this.sharedService.costiConsegna;
    this.subTotale = this.subTotale + this.costiConsegna;
    this.checkInvio = true;
  }
  
  console.log(this.subTotale);
  console.log(typeof(this.subTotale));
  }

  calcolasubTotaleScontato(){
    if(this.subTotale >= this.ordineMinimo){
      this.costiConsegna = 0;
      this.subTotale = this.subTotale + this.costiConsegna;
      this.checkInvio = true;
    } else if(this.subTotale < this.ordineMinimo) {
      this.calcoloSubTotaleOrdine();
    }
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
        this.scontoCliccato = false;
        this.testsconto = false;
        this.testsconto = false;
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
        this.scontoCliccato = false;
        this.testsconto = false;
        this.testsconto = false;
      }else{
        this.carrelloList[this.indiceArr].totale = this.carrelloList[this.indiceArr].Unita * this.carrelloList[this.indiceArr].Prezzo;
        this.carrelloList[this.indiceArr].totale = this.carrelloList[this.indiceArr].totale;
        this.calcoloSubTotaleOrdine();
        this.chkOrdine();
        this.scontoCliccato = false;
        this.testsconto = false;
        this.testsconto = false;
      }
    }else if(this.carrelloList[this.indiceArr].Unita === 0){
        this.deleteProdotto(idprodotto);
        this.chkOrdine();
        this.scontoCliccato = false;
        this.testsconto = false;
        this.testsconto = false;
      }
    }else {
      return 0;
    }

  }

  deleteProdotto(idprodotto){
    console.log(this.carrelloList.length, "lunghezza carrelloList");
      this.idProdotto = idprodotto;
    this.indiceArr = this.carrelloList.findIndex(((obj: any) => obj.IdProdotto === this.idProdotto));
    console.log(this.indiceArr, "valore indiceArr");
    this.carrelloList.splice(this.indiceArr, 1);
    this.getCarrello();
    this.calcoloSubTotaleOrdine();
    this.scontoCliccato = false;
    this.testsconto = false;
    this.testsconto = false;
    if(this.carrelloList.length == 0){
      this.ordineMinimo = 0;
      this.costiConsegna = 0;
      this.subTotale = 0;
      this.checkInvio = false;
    }
  
  }

  calcolaSconto(testosconto){
    this.calcolasubTotaleScontato();
    if (!this.scontoCliccato && this.subTotale >= this.ordineMinimo){

      if (testosconto === "SCONTO10"){
        this.subTotale = parseFloat((this.subTotale * 0.9).toFixed(2));
        parseFloat(this.subTotale.toFixed(2));
        this.testsconto = true;
        this.testscontoErr = false;
        this.msgSconto = "Applicato sconto del 10%";
        this.calcolasubTotaleScontato();
        this.scontoCliccato = true;
      } else if (testosconto === "SCONTO20"){
        this.subTotale = parseFloat((this.subTotale * 0.8).toFixed(2));
        parseFloat(this.subTotale.toFixed(2));
        this.testsconto = true;
        this.testscontoErr = false;
        this.msgSconto = "Applicato sconto del 20%";
        this.calcolasubTotaleScontato();
        this.scontoCliccato = true;
      } else {
        this.testsconto = false;
        this.testscontoErr = true;
        this.msgSconto = "Codice sconto non valido"
        this.scontoCliccato = false;
      }
      console.log(this.subTotale, "DOPO SCONTO");

    }else{

      return 0;

    }
    
  }

  postInvioOrdine(){
    console.log(this.carrelloList, "CARRELLO LIST POST");
    this.sharedService.postOrdine(this.carrelloList).subscribe(data =>{
        this.ngxService.start();
        console.log(data, 'Dati nella post');
        this.datiInviati = data;
        if(this.datiInviati.orderAdded){
          alert(this.datiInviati.message);
          this.carrelloList = [];
          this.ngxService.stop();
        }else{
          alert(this.datiInviati.message);
          this.ngxService.stop();
        }
  })
  }

}
