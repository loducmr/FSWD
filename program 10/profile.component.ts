import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user:any;
  constructor(private http: HttpClient) {}
    

    

    ngOnInit(): void {
      this.http.get('https://jsonplaceholder.typicode.com/users/1').subscribe((data: any) => {
        console.log(data);
        this.user = data;
      });
    }

}
