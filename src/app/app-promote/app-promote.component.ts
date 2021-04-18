import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/sharedService';

@Component({
  selector: 'app-app-promote',
  templateUrl: './app-promote.component.html',
  styleUrls: ['./app-promote.component.scss']
})
export class AppPromoteComponent implements OnInit {

  constructor(public sharedService : SharedService) { }

  ngOnInit(): void {
    this.sharedService.sessionStorageGetItem();
  }

}
