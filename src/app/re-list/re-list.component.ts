import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReApiService } from '../re-api.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-re-list',
  templateUrl: './re-list.component.html',
  styleUrls: ['./re-list.component.scss']
})
export class ReListComponent implements OnInit, OnDestroy {
  reList: [];
  subscription = new Subject();
  // reType = 'forsale';
  constructor(private reApiService: ReApiService) { }

  ngOnInit() {
    this.reApiService.getRE()
    this.reApiService.reListSubject.pipe(takeUntil(this.subscription)).subscribe(list => {
      this.reList = list
    })
  }
  ngOnDestroy() {
    this.subscription.next();
    this.subscription.complete();
  }

}
