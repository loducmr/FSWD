import { Component } from '@angular/core';
import { DjangoRestAPIService } from '../django-rest-api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  myform = new FormGroup({prodcat: new FormControl(), pid: new FormControl(),name: new FormControl(),cost: new FormControl()});
  message!:string;
  response!:any;
  constructor(private djService:DjangoRestAPIService){}

addProduct() {
   this. djService.addProd(this.myform.value).subscribe({
    next:data=>{
    console.log(data);
    this.response=Object.values(data);
    if(this.response)
      {
        this.message="product added successfully."
      }
  },
  error:error=>console.log(error)
  });
}
}
