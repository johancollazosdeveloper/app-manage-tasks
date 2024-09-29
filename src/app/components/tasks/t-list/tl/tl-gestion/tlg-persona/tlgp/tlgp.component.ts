import { Component, EventEmitter, Output } from '@angular/core';
import { Person } from 'src/app/shared/interfaces/person.model';
import { Skill } from 'src/app/shared/interfaces/skill.model';

@Component({
  selector: 'app-tlgp',
  templateUrl: './tlgp.component.html',
  styleUrls: ['./tlgp.component.css'],
})
export class TlgpComponent {
  @Output() personAdded = new EventEmitter<Person>();
  newPerson: Person = { fullName: '', age: 0, skills: [] };

  // Recibir habilidades desde tlgh
  addSkillToPerson(skill: Skill) {
    this.newPerson.skills.push(skill);
  }

  // Emitir la persona completa hacia tlgt
  addPerson() {
    this.personAdded.emit(this.newPerson);
    this.newPerson = { fullName: '', age: 0, skills: [] }; // Reiniciar el formulario
  }
}
