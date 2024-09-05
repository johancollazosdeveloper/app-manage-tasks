import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from '../../shared/interfaces/character';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';
import { FirestoreService } from '../../shared/services/firestore.service';
import { MarvelService } from '../../shared/services/marvel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  characters: Character [] = [];
  private subscription: Subscription | null = null;
  documentData: User = {};
  private uid = JSON.parse(localStorage.getItem('uid')!);

  constructor(private marvelService: MarvelService, 
              private authService: AuthService,
              private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.loadCharacters();
    this.getUserData();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCharacters() {
    this.subscription = this.marvelService.getCharacters().subscribe({
      next: (characters: Character[]) => {
        this.characters = characters;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching Marvel characters', error);
      }
    });
  }

  getUserData() {
    this.firestoreService.getDocumentByUid(this.uid).subscribe({
        next: (data: User) => {
          this.documentData = data;
          console.log(this.documentData);
          
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching Marvel characters', error.message);
        }
      });
  }

  logOut() {
    this.authService.logOut();
  }

    // Función para alternar la selección de un personaje
  toggleSelectCharacter(character: Character): void {
    character.isSelected = !character.isSelected;
  }

  // Comprobar si hay algún personaje seleccionado
  isAnyCharacterSelected(): boolean {
    return this.characters.some(character => character.isSelected);
  }
  
  // Función para guardar preferencias
  savePreferences(): void {
    const selectedCharacters = this.characters.filter(character => character.isSelected);
    if (selectedCharacters.length > 0) {
      // Crea el objeto que deseas almacenar en Firestore
      const preferences = selectedCharacters.map(character => ({
        id: character.id,
        name: character.name,
        description: character.description,
        thumbnail: character.thumbnail,
        comics: character.comics,
        isSelected: character.isSelected
      }));

      // Guarda en Firestore en la colección 'userHeroes'
      this.firestoreService.saveListUserHeroes(this.uid, preferences).then(() => {
        console.log('Preferencias guardadas con éxito.');
      }).catch(error => {
        console.error('Error al guardar preferencias:', error.message);
      });
    } else {
      console.log('No hay personajes seleccionados para guardar.');
    }
  }

}

