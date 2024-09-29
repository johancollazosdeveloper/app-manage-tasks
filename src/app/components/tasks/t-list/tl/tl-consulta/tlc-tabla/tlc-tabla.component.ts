import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/tasks.model';
import { FirestoreService } from '../../../../../../shared/services/firestore.service';

@Component({
  selector: 'app-tlc-tabla',
  templateUrl: './tlc-tabla.component.html',
  styleUrls: ['./tlc-tabla.component.css'],
})
export class TlcTablaComponent implements OnInit, OnChanges, OnDestroy {
  @Input() filter: string = 'all';
  public isLoading: boolean = false;
  user: firebase.User | null = null;
  private subscription: Subscription | null = null;
  public noTasksMessage: string | null = null;
  tasks: Task[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.loadTasks();
  }

  ngOnChanges() {
    if (this.filter) {
      this.loadTasksByStatus();
    }
  }

  /**
   * @description
   * * Limpia las suscripciones activas al destruir el componente.
   * * Asegura que no haya fugas de memoria al cancelar la suscripción.
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * @description
   * * Carga todas las tareas desde Firestore.
   * * Actualiza el estado de carga y gestiona el mensaje si no hay tareas.
   */
  loadTasks() {
    this.subscription = this.firestoreService
      .getTasks()
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
        this.noTasksMessage = null;
        this.isLoading = false;
      });
  }

  /**
   * @description
   * * Carga tareas filtradas por estado (completadas o pendientes).
   * * Establece un mensaje si no se encuentran tareas.
   * * Si no hay un filtro aplicable, carga todas las tareas.
   */
  loadTasksByStatus() {
    let status: boolean | null = null;

    if (this.filter === 'completed') {
      status = true;
    } else if (this.filter === 'pending') {
      status = false;
    }

    if (status !== null) {
      this.isLoading = true;
      this.subscription = this.firestoreService
        .getTasksByStatus(status)
        .subscribe((tasks: Task[]) => {
          this.tasks = tasks;
          this.isLoading = false;
          this.noTasksMessage =
            tasks.length === 0
              ? this.filter === 'completed'
                ? 'No hay tareas completadas.'
                : 'No hay tareas pendientes.'
              : null;
        });
    } else {
      this.loadTasks();
    }
  }

  /**
   * @description
   * * Actualiza el estado de una tarea específica.
   * * Recibe la tarea y el nuevo estado, luego actualiza Firestore.
   * * Vuelve a cargar las tareas y muestra un mensaje en la consola.
   * @param task {Task} - La tarea a actualizar.
   * @param status {boolean} - El nuevo estado de la tarea (completada o pendiente).
   */
  updateTaskStatus(task: Task, status: boolean) {
    task.status = status;
    this.isLoading = true;
    this.subscription = this.firestoreService
      .updateTaskStatus(task.id!, status)
      .subscribe(() => {
        this.loadTasks();
        console.log(
          `Tarea ${task.title} marcada como ${
            status ? 'completada' : 'pendiente'
          }.`,
        );
      });
  }
}
