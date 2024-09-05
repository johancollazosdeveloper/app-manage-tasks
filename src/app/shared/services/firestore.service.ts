import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Character } from '../interfaces/character';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private collectionUsers = 'users';
  private collectionUserHeroes = 'userHeroes';
  constructor(private firestore: AngularFirestore) { }

    // Método para obtener un documento por uid
  getDocumentByUid(uid: string): Observable<User> {
    return this.firestore.collection<User>(this.collectionUsers).doc(uid).valueChanges().pipe(
      map((doc) => {
        if (!doc) {
          throw new Error('Document not found');
        }
        return { id: uid, ...doc } as User;
      }),
      catchError(this.handleError)
    );
  }

  saveListUserHeroes(uid: string, preferences: Character[]): Promise<void> {
    return this.firestore.collection(this.collectionUserHeroes).doc(uid).set({ selectedCharacters: preferences }).then(() => {
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
    }).catch((error) => {
      this.handleError(error);
      throw error;
    });
  }

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
