import { Component, EventEmitter, Output } from '@angular/core';
import { Person } from 'src/app/shared/interfaces/person.model';
import { Task } from 'src/app/shared/interfaces/tasks.model';

@Component({
  selector: 'app-tlgt',
  templateUrl: './tlgt.component.html',
  styleUrls: ['./tlgt.component.css'],
})
export class TlgtComponent {
  @Output() taskCompleted = new EventEmitter<Task>();
  task: Task = {
    title: '',
    description: '',
    completed: false,
    people: [],
    createdAt: new Date(),
  };

  // Recibir personas completas desde tlgp y añadir a la tarea
  addPersonToTask(person: Person) {
    this.task.people?.push(person);
  }

  // Emitir la tarea completa hacia tlg
  completeTask() {
    this.taskCompleted.emit(this.task); // Emitimos el Task completo
  }
}
