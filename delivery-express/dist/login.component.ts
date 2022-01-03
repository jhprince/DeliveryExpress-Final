import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginform!: FormGroup
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  login() {
    this.http.post<any>(`${environment.apiUrl}/users/login`, this.loginform.value)
      .subscribe(res => {
        alert("Login Success");
        this.loginform.reset();
        this.router.navigate(['dashboard'])
        localStorage.setItem('loggedInUserId', res.id);
        this.authService.setHasAuthentication = res.id;
        this.router.navigate(['dashboard']);
      }, (error) => {
        alert(error.message);
      })

  }

}
