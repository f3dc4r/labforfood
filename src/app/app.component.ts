import { Component, TemplateRef } from '@angular/core';
import { SharedService } from 'src/services/sharedService';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public modalRef:BsModalRef;
  public modalNewRef:BsModalRef;

  constructor(public sharedService : SharedService, public ngxService: NgxUiLoaderService, private route:Router, private modalService : BsModalService) { }


  title = 'labforfood';  

  // Registrazione
  
  regEmail : string;
  regPassword : string;
  regConfirmPassword : string;
  regUsername : string;
  privacyCheck : boolean;
  regNominativo : string;

  usrRegistrazione : any;
  
  
  // Login

  loginEmail : string;
  loginPassword : string;

  loginCheck : boolean;

  usrLogin : any;


  public openModal(login: TemplateRef<any>){
    this.modalRef = this.modalService.show(login);
  }

  public openModalRegistrazione(registrazione: TemplateRef<any>){
    this.modalNewRef = this.modalService.show(registrazione);
  }

  public closeModal(){
    this.modalService.hide();
  }


  go(){
		this.route.navigate(['/ristoranti']); // navigate to other page
	}

  testRegistrati() : boolean{
    if(this.regEmail == "" || this.regEmail == null || this.regEmail == undefined ||
    this.regUsername == "" || this.regUsername == null || this.regUsername == undefined ||
    this.regPassword == "" || this.regPassword == null || this.regPassword == undefined ||
    this.regConfirmPassword == "" || this.regConfirmPassword == null || this.regConfirmPassword == undefined ||
    !this.privacyCheck || this.regPassword !== this.regConfirmPassword ||
    this.regNominativo == "" || this.regNominativo == null || this.regNominativo == undefined){
      return true;
    }
    else {
      return false;
    }
  }

  postRegistrazioneUser(){
    this.sharedService.postRegistrazione({
      "email": this.regEmail,
      "nominativo": this.regNominativo, 
      "password": this.regPassword,
      "username": this.regUsername}).subscribe(data =>{
        this.ngxService.start();
        console.log(data, 'Dati registrazione');
        this.usrRegistrazione = data;
        if(this.usrRegistrazione.aggiunto){
          alert(this.usrRegistrazione.message);
          this.regEmail = "";
          this.regNominativo = "";
          this.regPassword = "";
          this.regUsername = "";
          this.privacyCheck = false;
          this.regConfirmPassword = "";
          this.ngxService.stop();
        }else{
          alert(this.usrRegistrazione.message);
          this.ngxService.stop();
        }
  })
  }


  testLogin() : boolean{
    if(this.loginEmail == "" || this.loginEmail == null || this.loginEmail == undefined ||
    this.loginPassword == "" || this.loginPassword == null || this.loginPassword == undefined){
      this.loginCheck = true;
      return true;
    }
    else {
      this.loginCheck = false;
      return false;
    }
  }

  postLoginUser(){
    this.sharedService.postLogin({
      "email": this.loginEmail,
      "password": this.loginPassword, 
        }).subscribe(data =>{
        this.ngxService.start();
        console.log(data, 'Dati Login');
        this.usrLogin = data;
        if(this.usrLogin.loggedIn){
          alert(this.usrLogin.message);
          this.sharedService.usrIdLogged = this.usrLogin.IdUtente;
          this.ngxService.stop();
        }else{
          alert(this.usrLogin.message);
          this.ngxService.stop();
          this.modalService.hide();
          this.go();
        }
  })
  }


}
