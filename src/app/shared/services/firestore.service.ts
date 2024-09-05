import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Character } from '../interfaces/character';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private collectionUsers = 'users';
  private collectionUserHeroes = 'userHeroes';
  user$: Observable<firebase.User | null>;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  /**
   * @description
   * * Obtiene un documento de usuario por UID desde la colección de usuarios en Firestore.
   * * Mapea el resultado para incluir el UID en los datos del usuario.
   * * Lanza un error si el documento no se encuentra.
   * * Maneja errores utilizando el método `handleError`.
   * @param uid {string} - El UID del usuario cuyo documento se va a obtener.
   * @returns {Observable<User>} - Un observable que emite el usuario con el UID.
   */
  getDatauserByUid(uid: string): Observable<User> {
    return this.firestore.collection<User>(this.collectionUsers).doc(uid).valueChanges().pipe(
      map((dataUser) => {
        if (!dataUser) {
          throw new Error('Document not found');
        }
        return { id: uid, ...dataUser } as User;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * @description
   * * Guarda una lista de personajes seleccionados en Firestore en la colección 'userHeroes'.
   * * Muestra un mensaje de éxito al guardar correctamente.
   * * Maneja errores y muestra un mensaje de error si ocurre un problema.
   * @param uid {string} - El UID del usuario cuyo registro se va a actualizar.
   * @param preferences {Character[]} - La lista de personajes seleccionados a guardar.
   * @returns {Observable<void>} - Un observable que completa sin emitir valores, o emite un error si ocurre.
   */
  saveListUserHeroes(uid: string, preferences: Character[]): Observable<void> {
    return from(this.firestore.collection(this.collectionUserHeroes).doc(uid).set({ selectedCharacters: preferences })).pipe(
      tap(() => {
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
      }),
      catchError(error => {
        this.handleError(error);
         // Devuelve un observable vacío en caso de error
        return of();
      })
    );
  }

  /**
   * @description
   * * Obtiene los personajes seleccionados del usuario desde Firestore.
   * * Extrae los personajes seleccionados del documento, retornando una lista vacía si no hay datos.
   * * Maneja errores utilizando el método `handleError`.
   * @param uid {string} - El UID del usuario cuyo documento se va a consultar.
   * @returns {Observable<Character[]>} - Un observable que emite la lista de personajes seleccionados.
   */
  getSelectedCharacters(uid: string): Observable<Character[]> {
    return this.firestore.collection(this.collectionUserHeroes).doc(uid).valueChanges().pipe(
      map((doc: any) => doc?.selectedCharacters || []),
      catchError(this.handleError)
    );
  }

  /**
   * @description
   * * Maneja los errores de solicitudes HTTP.
   * * Muestra un mensaje de error utilizando SweetAlert2 según el tipo de error.
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
      text: errorMessage,
      confirmButtonColor: '#fa5252',
      confirmButtonText: 'Aceptar',
    });

    return throwError(() => new Error(errorMessage));
  }
}
