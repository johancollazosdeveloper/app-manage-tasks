import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Task } from '../interfaces/tasks.model';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private collectionUsers = 'users';
  private collectionTasks = 'tasks';
  user$: Observable<firebase.User | null>;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {
    this.user$ = this.afAuth.authState;
  }

  /**
   * @description
   * * Obtiene un documento de usuario por UID desde la colecci�n de usuarios en Firestore.
   * * Mapea el resultado para incluir el UID en los datos del usuario.
   * * Lanza un error si el documento no se encuentra.
   * * Maneja errores utilizando el m�todo `handleError`.
   * @param uid {string} - El UID del usuario cuyo documento se va a obtener.
   * @returns {Observable<User>} - Un observable que emite el usuario con el UID.
   */
  getDatauserByUid(uid: string): Observable<User> {
    return this.firestore
      .collection<User>(this.collectionUsers)
      .doc(uid)
      .valueChanges()
      .pipe(
        map((dataUser) => {
          if (!dataUser) {
            throw new Error('Document not found');
          }
          return { id: uid, ...dataUser } as User;
        }),
        catchError(this.handleError),
      );
  }

  /**
   * @description
   * * Guarda una tarea en la colección de tareas en Firestore.
   * * Genera un ID único para la tarea antes de almacenarla.
   * * Muestra una notificación de éxito utilizando SweetAlert2.
   * * En caso de error, maneja el error y lo registra.
   * @param task {Task} - La tarea que se va a guardar en Firestore.
   * @returns {Observable<void>} - Un observable que se completa cuando se guarda la tarea.
   */
  saveListTasks(task: Task): Observable<void> {
    const taskId = this.firestore.createId();

    const taskWithId: Task = {
      ...task,
      id: taskId,
    };

    return from(
      this.firestore
        .collection(this.collectionTasks)
        .doc(taskId)
        .set(taskWithId),
    ).pipe(
      tap(() => {
        Swal.fire({
          imageUrl: '../../../assets/images/success.png',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Success icon',
          title: 'Registro exitoso',
          html: '<span class="sweetalert-text">Tus datos han sido registrados correctamente.</span>',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'Aceptar',
          customClass: {
            popup: 'sweetalert-popup',
            title: 'sweetalert-title',
            confirmButton: 'sweetalert-confirm',
          },
        });
      }),
      catchError((error) => {
        this.handleError(error);
        return of();
      }),
    );
  }

  /**
   * @description
   * * Obtiene todas las tareas de la colección de Firestore.
   * * Convierte el campo deadLine a un objeto Date si no lo es.
   * * En caso de error, maneja el error y lo registra.
   * @returns {Observable<Task[]>} - Un observable que emite un arreglo de tareas.
   */
  getTasks(): Observable<Task[]> {
    return this.firestore
      .collection<Task>(this.collectionTasks)
      .valueChanges()
      .pipe(
        map((tasks) =>
          tasks.map((task) => ({
            ...task,
            deadLine: task.deadLine,
          })),
        ),
        catchError((error) => {
          this.handleError(error);
          return [];
        }),
      );
  }

  /**
   * @description
   * * Obtiene las tareas filtradas por su estado.
   * * Devuelve un observable que emite las tareas con el estado especificado.
   * @param status {boolean} - El estado por el cual filtrar las tareas.
   * @returns {Observable<Task[]>} - Un observable que emite un arreglo de tareas filtradas.
   */
  getTasksByStatus(status: boolean): Observable<Task[]> {
    return this.firestore
      .collection<Task>('tasks', (ref) => ref.where('status', '==', status))
      .valueChanges();
  }

  /**
   * @description
   * * Actualiza el estado de una tarea en Firestore.
   * * Devuelve un observable que se completa cuando se actualiza el estado.
   * @param taskId {string} - El ID de la tarea cuya estado se va a actualizar.
   * @param status {boolean} - El nuevo estado de la tarea.
   * @returns {Observable<void>} - Un observable que se completa cuando se actualiza el estado.
   */
  updateTaskStatus(taskId: string, status: boolean): Observable<void> {
    return from(
      this.firestore.collection('tasks').doc(taskId).update({ status }),
    );
  }

  /**
   * @description
   * * Maneja los errores de solicitudes HTTP.
   * * Muestra un mensaje de error utilizando SweetAlert2 seg�n el tipo de error.
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
      },
    });

    return throwError(() => new Error(errorMessage));
  }
}
