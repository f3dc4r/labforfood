import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'node:cluster';
import { SharedService } from 'src/services/sharedService';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  @ViewChild('places') places: GooglePlaceDirective;
  
  constructor(public sharedService : SharedService) { }

  ngOnInit(): void {
  }

  handleAddressChange(address: Address) {
    this.sharedService.indirizzo = address;
    console.log(this.sharedService.indirizzo);
}
}