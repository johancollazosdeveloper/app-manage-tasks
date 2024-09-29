import { Component } from '@angular/core';
import { Task } from 'src/app/shared/interfaces/tasks.model';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-tlg',
  templateUrl: './tlg.component.html',
  styleUrls: ['./tlg.component.css'],
})
export class TlgComponent {
  tasks: Task[] = [];
  constructor(private taskService: FirestoreService) {}

  /**
   * @description
   * * Agrega una nueva tarea a la lista de tareas.
   * * Almacena la tarea en Firestore utilizando el servicio correspondiente.
   * * Registra un mensaje en la consola si la tarea se guarda correctamente,
   * * o un mensaje de error si ocurre un problema.
   * @param task {Task} - La tarea que se va a agregar a la lista.
   */
  addTask(task: Task) {
    this.tasks.push(task);
    this.taskService.saveListTasks(task).subscribe({
      next: () => {
        console.log('Tarea guardada en Firebase:', task);
      },
      error: (error) => {
        console.error('Error guardando la tarea en Firebase:', error);
      },
    });
  }
}
