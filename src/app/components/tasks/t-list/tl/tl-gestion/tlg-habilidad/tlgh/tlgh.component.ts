import { Component, EventEmitter, Output } from '@angular/core';
import { Skill } from 'src/app/shared/interfaces/skill.model';

@Component({
  selector: 'app-tlgh',
  templateUrl: './tlgh.component.html',
  styleUrls: ['./tlgh.component.css'],
})
export class TlghComponent {
  @Output() skillAdded = new EventEmitter<Skill>();
  newSkill: Skill = { name: '' };

  // Emitir la habilidad hacia tlgp
  addSkill() {
    this.skillAdded.emit(this.newSkill);
    this.newSkill = { name: '' }; // Reiniciar el formulario
  }
}
