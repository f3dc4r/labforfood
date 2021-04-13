import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { SharedService } from 'src/services/sharedService';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public sharedService : SharedService, public ngxService: NgxUiLoaderService) { }


  title = 'labforfood';  

  regEmail : string;
  regPassword : string;
  regConfirmPassword : string;
  regUsername : string;
  privacyCheck : boolean;
  regNominativo : string;

  usrRegistrazione : any;
  

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

}
