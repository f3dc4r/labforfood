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

  RegExMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  RegExPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; //DA CHIEDERE

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

  loginUsername : string;
  loginPassword : string;

  loginCheck : boolean;

  usrLogin : any;

  errorUserMessage : boolean = false;

  errorMessage : string;


  public openModal(login: TemplateRef<any>){
    this.modalRef = this.modalService.show(login);
  }

  public openModalRegistrazione(registrazione: TemplateRef<any>){
    this.modalNewRef = this.modalService.show(registrazione);
  }

  public closeModal(){
    this.modalService.hide();
  }


  goAreaRiservata(){
		this.route.navigate(['/area-riservata']); // navigate to other page
	}

  goRistoranti(){
    this.route.navigate(['/ristoranti']);
  }


  sessionStorageSetItem(){
    if (this.sharedService.isLogged){
      this.sharedService.statusSession = "true";
      sessionStorage.setItem('LoggedIn', this.sharedService.statusSession);
    } else {
      this.sharedService.statusSession = "false";
      sessionStorage.setItem('LoggedIn', this.sharedService.statusSession);
    }
    
  }

  
  testEmail(){
    if (this.regEmail == null || this.regEmail == undefined || this.regEmail == ""){
      return true;
    }
    return this.RegExMail.test(this.regEmail);
  }

// DA CHIEDERE

   testPassword(e){
    if (e == null || e == undefined || e == ""){
      return true;
    }else {
      return this.RegExPassword.test(e);
    }
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
    if(this.loginUsername == "" || this.loginUsername == null || this.loginUsername == undefined ||
    this.loginPassword == "" || this.loginPassword == null || this.loginPassword == undefined){
      this.loginCheck = true;
      return true;
    }
    else {
      this.loginCheck = false;
    }
  }

  postLoginUser(){
    this.sharedService.postLogin({
      "username": this.loginUsername,
      "password": this.loginPassword, 
        }).subscribe(data =>{
        console.log(data, 'Dati Login');
        this.usrLogin = data;
        if(this.usrLogin.loggedIn){
          this.ngxService.start();
          this.sharedService.usrIdLogged = this.usrLogin.IdUtente;
          this.sharedService.isLogged = this.usrLogin.loggedIn;
          this.errorUserMessage = false;
          this.sessionStorageSetItem();
          this.modalService.hide();
          this.goAreaRiservata();
          this.loginUsername = "";
          this.loginPassword = "";
          this.ngxService.stop();
        }else{
          this.errorMessage = this.usrLogin.message;
          this.sharedService.isLogged = this.usrLogin.loggedIn;
          this.errorUserMessage = true;
          this.sessionStorageSetItem();
          this.loginUsername = "";
          this.loginPassword = "";
          this.ngxService.stop();
          setTimeout(()=>{ this.errorUserMessage = false;}, 2000);
        }
  })
  }

  logout(){
    this.sharedService.isLogged = false;
    this.sessionStorageSetItem();
    this.goRistoranti();
  }


}
