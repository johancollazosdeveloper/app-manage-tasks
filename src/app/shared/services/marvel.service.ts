import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Character, MarvelResponse } from '../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private uri = `${environment.apiUrl}?ts=${environment.ts}&apikey=${environment.apiKey}&hash=${environment.hash}`
  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<MarvelResponse>(this.uri).pipe(
      map((response: MarvelResponse) => response.data.results),
      catchError(this.handleError)
    );
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
