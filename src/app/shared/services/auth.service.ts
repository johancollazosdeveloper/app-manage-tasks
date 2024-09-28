import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
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

    /**
     * @description
     * * Suscribe al estado de autenticaci�n del usuario para actualizar el UID en localStorage.
     * * Si el usuario est� autenticado, se guarda el UID en `localStorage`. Si no, se establece 'null'.
     */
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

  /**
   * @description
   * * Permite el inicio de sesi�n con correo electr�nico y contrase�a.
   * * Llama al servicio de autenticaci�n para iniciar sesi�n y guarda el proveedor en `localStorage`.
   * @param email {string} - El correo electr�nico del usuario.
   * @param password {string} - La contrase�a del usuario.
   * @returns {Promise<string | undefined>} - El UID del usuario si el inicio de sesi�n es exitoso.
   */
  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.observeUserState();
        localStorage.setItem('provider', 'email');
        return userCredential?.user?.uid;
      })
      .catch((error: HttpErrorResponse) => this.handleError(error));
  }

  /**
   * @description
   * * Permite el inicio de sesi�n con el proveedor de Google.
   * * Utiliza el m�todo `signInWithPopup` para autenticar al usuario con Google y guarda el proveedor en `localStorage`.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando el inicio de sesi�n es exitoso.
   */
  logInWithGoogleProvider() {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then(() => { 
        this.observeUserState();
        localStorage.setItem('provider', 'google');
      })
      .catch((error: HttpErrorResponse) => this.handleError(error));
  }

  /**
   * @description
   * * Registra un nuevo usuario con correo electr�nico y contrase�a.
   * * Guarda los datos del usuario en Firestore despu�s de crear la cuenta.
   * @param email {string} - El correo electr�nico del usuario.
   * @param password {string} - La contrase�a del usuario.
   * @param userData {User} - Datos adicionales del usuario a guardar en Firestore.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando el registro es exitoso.
   */
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
          .catch((error: HttpErrorResponse) => this.handleError(error));
      })
      .catch((error: HttpErrorResponse) => this.handleError(error));
  }  

  /**
   * @description
   * * Observa el estado de autenticaci�n del usuario y redirige al dashboard si el usuario est� autenticado.
   */
  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard']))
    })
  }

  /**
   * @description
   * * Verifica si el usuario est� autenticado bas�ndose en el UID almacenado en `localStorage`.
   * @returns {boolean} - `true` si el usuario est� autenticado, de lo contrario `false`.
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('uid')!);
    return user !== null;
  }

  /**
   * @description
   * * Cierra la sesi�n del usuario y redirige a la p�gina de inicio de sesi�n.
   * * Limpia el UID y el proveedor del usuario en `localStorage`.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando el cierre de sesi�n es exitoso.
   */
  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('uid');
      localStorage.removeItem('provider');
      this.router.navigate(['login']);
    })
  }

  /**
   * @description
   * * Maneja los errores de las solicitudes HTTP.
   * * Muestra un mensaje de error utilizando SweetAlert2 seg�n el tipo de error (cliente o servidor).
   * * Devuelve un observable que emite el error manejado.
   * @param error {HttpErrorResponse} - El error de la respuesta HTTP que se va a manejar.
   * @returns {Observable<never>} - Un observable que emite el error manejado.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }

    Swal.fire({
      imageUrl: '../../../assets/images/error.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Error icon',
      title: 'Oops...',
      html: `<span class="sweetalert-text">${errorMessage}</span>`,
      confirmButtonColor: '#fa5252',
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'sweetalert-popup',
        title: 'sweetalert-title',
        confirmButton: 'sweetalert-confirm',
      }
    });

    return throwError(() => new Error(errorMessage));
  }
}
