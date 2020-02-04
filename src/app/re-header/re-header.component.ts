import { Component, OnInit } from '@angular/core';
import { ReApiService } from '../re-api.service';

@Component({
  selector: 'app-re-header',
  templateUrl: './re-header.component.html',
  styleUrls: ['./re-header.component.scss']
})
export class ReHeaderComponent implements OnInit {

  constructor(private reApiService: ReApiService) { }
  reTypes = ['forsale', 'forRent', 'roommates', 'commercial'];
  onClickREtype(type: string) {
    console.log(type);
    this.reApiService.reType=type;
    this.reApiService.getRE(type)
  }
  ngOnInit() {
  }

}
