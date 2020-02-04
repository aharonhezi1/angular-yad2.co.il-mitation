import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReApiService {
  reListSubject = new BehaviorSubject<[]>(null)
  reParams = '/api/real-estate/'
  reType = 'forsale'
  constructor(private http: HttpClient) { }

  getRE = (type = this.reType) => {
    console.log(environment.apiUrl + this.reParams + type);

    return this.http.get(environment.apiUrl + this.reParams + type).subscribe((list: any) => {
      this.reListSubject.next(list)
    })
  }
  getFilterRE = (details) => {
    let queryParams = '?';
    Object.keys(details).forEach(detail =>
      queryParams += `${detail}=${details[detail]}&`);
    queryParams = queryParams.slice(0, queryParams.length - 1);

    console.log(environment.apiUrl + this.reParams + this.reType + queryParams);

    return this.http.get(environment.apiUrl + this.reParams + this.reType + queryParams).subscribe((list: any) => {
      this.reListSubject.next(list);
    });
  }
}
