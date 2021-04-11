import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'labforfood';  

  regEmail : string;
  regPassword : string;
  regConfirmPassword : string;
  privacyCheck : boolean;
  regNominativo : string;
  

  testRegistrati() : boolean{
    if(this.regEmail == "" || this.regEmail == null || this.regEmail == undefined || this.regPassword == "" || this.regPassword == null || this.regPassword == undefined ||
    this.regConfirmPassword == "" || this.regConfirmPassword == null || this.regConfirmPassword == undefined || !this.privacyCheck || this.regPassword !== this.regConfirmPassword
    || this.regNominativo == "" || this.regNominativo == null || this.regNominativo == undefined){
      return true;
    }
    else {
      return false;
    }
  }

}
