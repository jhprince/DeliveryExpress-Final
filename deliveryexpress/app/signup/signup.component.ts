import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from "@angular/forms"
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http : HttpClient,private router:Router) {

   }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    
    })
  }
  
  signUp(){
    this.http.post<any>(`${environment.apiUrl}/users/`,this.signupForm.value)
    .subscribe(res=>{
      alert("Signup Successfull");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },error=>{
      alert("Something went wrong")
    })

  }

}
