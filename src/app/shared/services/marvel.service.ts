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

  /**
   * @description
   * * Obtiene la lista de personajes de Marvel desde una API.
   * * Realiza una solicitud HTTP GET a la URI especificada y mapea la respuesta para extraer la lista de personajes.
   * * Maneja errores de la solicitud utilizando el método `handleError`.
   * @returns {Observable<Character[]>} - Un observable que emite la lista de personajes obtenida de la API.
   */
  getCharacters(): Observable<Character[]> {
    return this.http.get<MarvelResponse>(this.uri).pipe(
      map((response: MarvelResponse) => response.data.results),
      catchError(this.handleError)
    );
  }

  /**
   * @description
   * * Maneja los errores de las solicitudes HTTP.
   * * Muestra un mensaje de error utilizando SweetAlert2 según el tipo de error (cliente o servidor).
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
