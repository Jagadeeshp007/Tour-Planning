import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TourService {

  private baseUrl = 'http://localhost:8080/tourPlanning/api/tour'
  constructor(private http: HttpClient) { }

  getTourDetailList(): any {
    return this.http.get(`${this.baseUrl}/list`)
  }

  doLogin(credentials: object): Observable<object> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  doReg(loginDetail: object): Observable<object> {
    return this.http.post(`${this.baseUrl}/reg`, loginDetail);
  }

  addTour(tourDetail: object): Observable<object> {
    return this.http.post(`${this.baseUrl}/add`, tourDetail);
  }

  getTourDetail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }

  deleteTour(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  updateTour(id: number, tourDetail: object): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, tourDetail, { responseType: 'text' });
  }

}
