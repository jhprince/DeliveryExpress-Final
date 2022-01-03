import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    public hasAuthentication = new BehaviorSubject(localStorage.getItem('loggedInUserId'));

    constructor(private router: Router) { }

    set setHasAuthentication(value: any) {
        this.hasAuthentication.next(value); // this will make sure to tell every subscriber about the change.
        localStorage.setItem('loggedInUserId', value);
      }
     
      get getHasAuthentication(): any {
        return localStorage.getItem('loggedInUserId');
      }
      
    public ValidateAuthentication(): void {
        var loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId) {
            this.router.navigate(['login']);
        }
    }
}