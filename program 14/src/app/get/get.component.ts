import { Component } from '@angular/core';
import { DjangoRestAPIService } from '../django-rest-api.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrl: './get.component.css'
})
export class GetComponent {
  response!:any;
  constructor(private djService:DjangoRestAPIService){}

  getProducts() {
  this.djService.getProds().subscribe({
    next:data=>{
      console.log(data);
      this.response = Object.values(data);
      console.log(this.response);

    },
    error:error=>console.log(error)
    });
}
}
