import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) {}

  readonly baseURL = 'https://ramakanth.azurewebsites.net/api/employeedetails'

  postEmployeeDetail(value) {
    return this.http.post(this.baseURL,value);

     
  }

  onReceive(){
    return this.http.get(this.baseURL);
  }



  deletePaymentDetail(id) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}