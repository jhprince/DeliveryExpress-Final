import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  
  constructor(
      private router: Router,
      private authService: AuthService) { }

  ngOnInit(): void {
    localStorage.removeItem('loggedInUserId');
    this.authService.setHasAuthentication = null;
    this.router.navigate(['login']);
  }
}
