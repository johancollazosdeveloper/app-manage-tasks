import { Component } from '@angular/core';
import { Task } from 'src/app/shared/interfaces/tasks.model';

@Component({
  selector: 'app-tlg',
  templateUrl: './tlg.component.html',
  styleUrls: ['./tlg.component.css'],
})
export class TlgComponent {
  task!: Task;

  // Método para recibir la tarea completa desde tlgt
  onTaskReceived(task: Task) {
    this.task = task;
  }

  // Método para guardar la tarea en la base de datos
  saveTask() {
    console.log('Guardando tarea:', this.task);
    // Aquí se haría la llamada a Firebase o servicio para guardar la tarea
    // this.taskService.saveTask(this.task).then(...);
  }
}
