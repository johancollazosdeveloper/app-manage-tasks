import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/shared/interfaces/person.model';
import { Skill } from 'src/app/shared/interfaces/skill.model';

@Component({
  selector: 'app-tlg-persona-formulario',
  templateUrl: './tlg-persona-formulario.component.html',
  styleUrls: ['./tlg-persona-formulario.component.css'],
})
export class TlgPersonaFormularioComponent {
  @Output() personCompleted = new EventEmitter<Person>();
  skills: Skill[] = [];
  personForm: FormGroup;
  public existingPeople: Person[] = [];
  public showDuplicateError: boolean = false;
  public showError: boolean = false;

  constructor(private fb: FormBuilder) {
    this.personForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
    });
  }

  /**
   * @description
   * * Agrega una habilidad a la lista de habilidades asociadas a la persona.
   * * Actualiza la propiedad showError a false, indicando que no hay errores.
   * @param skill {Skill} - La habilidad que se va a agregar a la persona.
   */
  addSkill(skill: Skill) {
    this.showError = false;
    this.skills.push(skill);
  }

  /**
   * @description
   * * Elimina una habilidad de la lista de habilidades asociadas a la persona.
   * * Se utiliza el índice de la habilidad para realizar la eliminación.
   * @param index {number} - El índice de la habilidad a eliminar de la lista.
   */
  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }

  /**
   * @description
   * * Maneja el evento de envío del formulario de persona.
   * * Valida que el formulario y la lista de habilidades sean correctos antes de emitir
   * * la nueva persona.
   * * Verifica si la persona ya existe en la lista de personas existentes para evitar duplicados.
   * * Resetea el formulario y la lista de habilidades después de la emisión.
   */
  onSubmit() {
    if (this.personForm.valid) {
      if (this.skills.length === 0) {
        this.showError = true;
        return;
      }

      const person: Person = { ...this.personForm.value, skills: this.skills };

      if (this.existingPeople.some((p) => p.fullName === person.fullName)) {
        this.showDuplicateError = true;
        this.showError = false;
        return;
      }

      this.showDuplicateError = false;
      this.existingPeople.push(person);
      this.personCompleted.emit(person);

      this.personForm.reset();
      this.skills = [];
      this.showError = false;
    }
  }
}
