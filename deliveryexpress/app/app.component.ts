import { Component, OnInit } from '@angular/core';
import { AuthService } from './AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DeliveryExpress';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.hasAuthentication.subscribe((loggedInUserId: any) => {
      if (loggedInUserId) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    })
  }


}
