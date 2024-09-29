import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from 'src/app/shared/interfaces/skill.model';

@Component({
  selector: 'app-tlg-habilidad-formulario',
  templateUrl: './tlg-habilidad-formulario.component.html',
  styleUrls: ['./tlg-habilidad-formulario.component.css'],
})
export class TlgHabilidadFormularioComponent {
  @Output() skillAdded = new EventEmitter<Skill>();
  skillForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.skillForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  /**
   * @description
   * * Maneja el evento de envío del formulario de habilidad.
   * * Verifica si el formulario de habilidad es válido antes de emitir
   * * la nueva habilidad.
   * * Resetea el formulario después de la emisión.
   */
  onSubmit() {
    if (this.skillForm.valid) {
      const skill: Skill = this.skillForm.value;
      this.skillAdded.emit(skill);
      this.skillForm.reset();
    }
  }
}
