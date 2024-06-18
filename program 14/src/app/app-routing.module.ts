import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GetComponent } from './get/get.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path:'getproducts',
    component:GetComponent,
    title:'get'
  },
  {
    path:'addproducts',
    component:AddComponent,
    title:'add'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
