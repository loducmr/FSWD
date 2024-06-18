import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DjangoRestAPIService {

  constructor() { }
  apiUrl = 'http://127.0.0.1:8000';
  httpClient=inject(HttpClient);

  ngOnInit(): void { }

  getProds():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/getproducts/`);
  }
  addProd(productInfo:any):Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/addproduct/`,productInfo);
  }
}
