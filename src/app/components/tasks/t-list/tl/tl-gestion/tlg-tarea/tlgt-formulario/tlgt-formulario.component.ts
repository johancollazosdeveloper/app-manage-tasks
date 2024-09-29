import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from 'src/app/shared/interfaces/tasks.model';

@Component({
  selector: 'app-tlgt-formulario',
  templateUrl: './tlgt-formulario.component.html',
  styleUrls: ['./tlgt-formulario.component.css'],
})
export class TlgtFormularioComponent {
  @Output() submitTask = new EventEmitter<void>();
  task: Task = {
    title: '',
    description: '',
    completed: false,
    createdAt: new Date(),
  };

  save() {
    this.submitTask.emit();
  }
}
