import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Person } from 'src/app/shared/interfaces/person.model';
import { Task } from 'src/app/shared/interfaces/tasks.model';

@Component({
  selector: 'app-tlg-tarea-formulario',
  templateUrl: './tlg-tarea-formulario.component.html',
  styleUrls: ['./tlg-tarea-formulario.component.css'],
})
export class TlgTareaFormularioComponent {
  taskForm: FormGroup;
  newTask: Task = {
    title: '',
    status: false,
    people: [],
    deadLine: '',
  };

  @Output() taskCompleted = new EventEmitter<Task>();
  isPersonCompleted: boolean = false;
  public minDate: string = '';
  public showError: boolean = false;
  public isLoading: boolean = false;
  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(5)]],
      deadLine: ['', [Validators.required, this.futureDateValidator]],
    });
  }

  /**
   * @description
   * * Obtiene el control de formulario para la fecha de entrega (deadLine).
   * * Permite acceder a las propiedades y métodos del control para validaciones
   * * y manipulación del formulario.
   * @returns {AbstractControl | null} - El control de formulario correspondiente
   * * a la fecha de entrega o null si no existe.
   */
  get deadLineControl(): AbstractControl | null {
    return this.taskForm.get('deadLine');
  }

  /**
   * @description
   * * Valida que la fecha seleccionada sea futura en comparación con la fecha actual.
   * * Si la fecha seleccionada es hoy o en el pasado, devuelve un objeto de error
   * * indicando que la fecha no es válida.
   * @param control {AbstractControl} - El control de formulario que contiene la fecha a validar.
   * @returns {{ [key: string]: any } | null} - Un objeto de error si la fecha es inválida,
   * * o null si la fecha es válida.
   */
  futureDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate <= today) {
      return { invalidDate: true };
    }
    return null;
  }

  /**
   * @description
   * * Agrega una persona a la lista de personas asociadas a la nueva tarea.
   * * Actualiza la propiedad showError a false, indicando que no hay errores.
   * @param person {Person} - La persona que se va a agregar a la tarea.
   */
  addPersonToTask(person: Person) {
    this.newTask.people.push(person);
    this.showError = false;
  }

  /**
   * @description
   * * Elimina una persona de la lista de personas asociadas a la nueva tarea.
   * * Se utiliza el índice de la persona para realizar la eliminación.
   * @param index {number} - El índice de la persona a eliminar de la lista.
   */
  removePerson(index: number) {
    this.newTask.people.splice(index, 1);
  }

  /**
   * @description
   * * Maneja el evento de envío del formulario de tarea.
   * * Valida que el formulario y la lista de personas sean correctos antes de emitir
   * * la nueva tarea.
   * * Resetea el formulario y la lista de personas después de la emisión.
   */
  onSubmit() {
    this.isLoading = true;
    if (this.taskForm.valid) {
      if (this.newTask.people.length === 0) {
        this.showError = true;
        return;
      }

      const task: Task = {
        ...this.newTask,
        title: this.taskForm.get('taskName')?.value,
        status: false,
        deadLine: this.taskForm.get('deadLine')?.value,
      };
      this.taskCompleted.emit(task);
      this.taskForm.reset();
      this.newTask.people = [];
      this.isLoading = false;
    }
  }
}
