import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uid: string = "";
  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        const uid = user?.uid != undefined ? user?.uid : "";
        this.uid = uid;
        localStorage.setItem('uid', JSON.stringify(this.uid));
      } else {
        localStorage.setItem('uid', 'null');
      }
    })

  }

  // log-in with email and password
  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.observeUserState();
        return userCredential?.user?.uid;
      })
      .catch((error) => {
        Swal.fire({
          imageUrl: '../../../assets/images/error.png',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Error icon',
          title: 'Oops...',
          text: error.message,
          confirmButtonColor: '#fa5252',
          confirmButtonText: 'Aceptar',
        });
      })
  }

  // log-in with google
  logInWithGoogleProvider() {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then(() => this.observeUserState())
      .catch((error: Error) => {
        Swal.fire({
          imageUrl: '../../../assets/images/error.png',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Error icon',
          title: 'Oops...',
          text: error.message,
          confirmButtonColor: '#fa5252',
          confirmButtonText: 'Aceptar',
        });
      })
  }

  // sign-up with email and password
  signUpWithEmailAndPassword(email: string, password: string, userData: User) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user || !user.uid) {
          throw new Error('User information is missing after sign up.');
        }
        // Guarda los datos adicionales en Firestore
        return this.firestore.collection('users').doc(user.uid).set(userData)
          .then(() => {
            console.log('User data saved successfully');
            this.observeUserState();
            Swal.fire({
              imageUrl: '../../../assets/images/success.png',
              imageWidth: 200,
              imageHeight: 200,
              imageAlt: 'Success icon',
              title: 'Registro exitoso',
              text: 'Tus datos han sido registrados correctamente.',
              confirmButtonColor: '#28a745',
              confirmButtonText: 'Aceptar',
            });
          })
          .catch((error) => {
            console.error('Error al guardar los datos del usuario en Firestore:', error);
            Swal.fire({
              imageUrl: '../../../assets/images/error.png',
              imageWidth: 200,
              imageHeight: 200,
              imageAlt: 'Error icon',
              title: 'Oops...',
              text: 'Error al guardar los datos: ' + error.message,
              confirmButtonColor: '#fa5252',
              confirmButtonText: 'Aceptar',
            });
          });
      })
      .catch((error) => {
        console.error('Error al crear el usuario:', error);
        Swal.fire({
          imageUrl: '../../../assets/images/error.png',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Error icon',
          title: 'Oops...',
          text: error.message,
          confirmButtonColor: '#fa5252',
          confirmButtonText: 'Aceptar',
        });
      });
  }  

  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard']))
    })
  }

  // return true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('uid')!);
    return user !== null;
  }

  // logOut
  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('uid');
      this.router.navigate(['login']);
    })
  }

}
