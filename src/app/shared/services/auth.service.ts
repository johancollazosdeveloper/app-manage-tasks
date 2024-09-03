import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider, UserCredential } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {

    // save user in localStorage (log-in) and setting up null when log-out
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    })

  }

  // log-in with email and password
  logInWithEmailAndPassword(email: string, password: string): Promise<void> {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.firebaseAuthenticationService.authState.subscribe((user) => {
          user && this.ngZone.run(() => this.router.navigate(['dashboard']))
        })
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  // log-in with google
  logInWithGoogleProvider(): Promise<void> {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then((user) => {
        user && this.ngZone.run(() => this.router.navigate(['dashboard']))
      })
      .catch((error: Error) => {
        alert(error.message);
      })
  }

  // sign-up with email and password
  signUpWithEmailAndPassword(email: string, password: string): Promise<void> {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user && this.ngZone.run(() => this.router.navigate(['dashboard']))
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  // return true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // logOut
  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

}
