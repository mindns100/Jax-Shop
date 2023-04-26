import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "@angular/fire/auth";
import {from, switchMap} from "rxjs";
import {map} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  redirectUrl: string;

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  ngOnInit() {

  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  getCurrentUserValue() {
    return this.auth.currentUser!;
  }

  getCurrentUser(){
    return this.currentUser$.pipe(map(user => user ? user : null));
  }

  login(username: string, password: string){
    return from(signInWithEmailAndPassword(this.auth,username,password));
  }
  signUp(name: string, email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth,email,password)
    ).pipe(switchMap(({ user }) => updateProfile(user, {displayName: name}))

    )
  }



  logout() {
    return from(this.auth.signOut());
  }
}
