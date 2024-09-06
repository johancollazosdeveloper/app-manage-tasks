import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
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
  isLoading: boolean = false;
  dataUser: User = {};
  showSavedCharacters: boolean = false;
  user: firebase.User | null = null;
  private subscription: Subscription | null = null;
  private uid = JSON.parse(localStorage.getItem('uid')!);
  private provider = localStorage.getItem('provider');

  constructor(private marvelService: MarvelService, 
              private authService: AuthService,
              private firestoreService: FirestoreService,
            ) {}

  ngOnInit() {
    this.getUserData();
    this.validateUserHeroes()
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * @description
   * * Carga todos los personajes de Marvel y los almacena en la propiedad `characters`.
   * * También actualiza el estado de carga (`isLoading`) para reflejar si la solicitud está en progreso o completada.
   */
  loadAllCharacters() {
    this.isLoading = true;
    this.subscription = this.marvelService.getCharacters().subscribe({
      next: (characters: Character[]) => {
        this.characters = characters;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching Marvel characters', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * @description
   * * Obtiene los datos del usuario basado en el proveedor de autenticación.
   * * Si el proveedor es 'email', obtiene los datos del usuario desde Firestore usando el UID.
   * * Si el proveedor es otro (por ejemplo, Google), obtiene el nombre del usuario desde el objeto `user` en Firestore.
   */
  getUserData() {
    this.isLoading = true;
    if (this.provider == 'email') {
      this.subscription = this.firestoreService.getDatauserByUid(this.uid).subscribe({
        next: (data: User) => {
          this.dataUser = data;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching Marvel characters', error.message);
        }
      });
    } else {
      this.subscription = this.firestoreService.user$.subscribe(user => {
        if (user) {
          this.dataUser.name = user.displayName || '';
          this.dataUser.lastName = '';
        }
      });
    }
    
  }

  /**
   * @description
   * * Cierra la sesión del usuario actual llamando al servicio de autenticación.
   */
  logOut() {
    this.authService.logOut();
  }

  /**
   * @description
   * * Alterna la selección de un personaje.
   * * Cambia el estado `isSelected` del personaje pasado como argumento.
   * @param character {Character} - El personaje cuya selección se va a alternar.
   */  
  toggleSelectCharacter(character: Character): void {
    character.isSelected = !character.isSelected;
  }

  /**
   * @description
   * * Verifica si hay algún personaje seleccionado.
   * * Revisa si al menos un personaje en la lista de `characters` está marcado como seleccionado.
   * @returns {boolean} - Devuelve `true` si hay al menos un personaje seleccionado, de lo contrario `false`.
   */
  isAnyCharacterSelected(): boolean {
    return this.characters.some(character => character.isSelected);
  }

  /**
   * @description
   * * Guarda las preferencias del usuario, que son los personajes seleccionados.
   * * Filtra los personajes seleccionados y los guarda en Firestore.
   * * Limpia la selección de personajes y vuelve a cargar los personajes seleccionados después de guardar.
   */
  savePreferences(): void {
    const selectedCharacters = this.characters.filter(character => character.isSelected);
    if (selectedCharacters.length > 0) {
      this.subscription = this.firestoreService.saveListUserHeroes(this.uid, selectedCharacters).subscribe({
        next: () => {
          console.log('Preferencias guardadas con éxito.');
          this.characters.forEach(character => character.isSelected = false);
          this.loadSelectedCharacters();
        },
        error: (error) => {
          console.error('Error al guardar preferencias:', error.message);
        }
      });
    } else {
      console.log('No hay personajes seleccionados para guardar.');
    }
  }

  /**
   * @description
   * * Carga los personajes seleccionados del usuario desde Firestore.
   * * Actualiza la lista de personajes con los seleccionados y marca la propiedad `showSavedCharacters` como `true`.
   */
  loadSelectedCharacters(): void {
    this.subscription = this.firestoreService.getSelectedCharacters(this.uid).subscribe({
      next: (selectedCharacters: Character[]) => {
        this.characters = selectedCharacters;
        this.characters.forEach(character => character.isSelected = false);
        this.showSavedCharacters = true;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching selected characters', error.message);
        this.isLoading = false;
      }
    });
  }

  /**
   * @description
   * * Alterna la vista entre los personajes guardados y todos los personajes.
   * * Carga todos los personajes y oculta los personajes guardados.
   */
  toggleView() {
    this.loadAllCharacters();
    this.showSavedCharacters = false;
  }

  /**
   * @description
   * * Verifica si existen personajes guardados para el usuario dado su UID.
   * * Retorna un valor booleano en función de si existen o no personajes guardados.
   * @param uid - El identificador único del usuario para buscar sus personajes guardados.
   * @returns Una promesa que resuelve a `true` si se encuentran personajes guardados, de lo contrario, `false`.
   */
  checkIfCharactersExist(uid: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.subscription = this.firestoreService.getSelectedCharacters(uid).subscribe({
        next: (selectedCharacters: Character[]) => {
          if (selectedCharacters.length > 0) {
            console.log('Characters found');
            resolve(true);
          } else {
            console.log('No characters found');
            resolve(false);
          }
        },
        error: (error) => {
          console.error('Error fetching selected characters', error.message);
          reject(false);
        }
      });
    });
  }

  /**
   * @description
   * * Valida si el usuario tiene personajes guardados y realiza la acción correspondiente.
   * * Si existen personajes guardados, carga los personajes seleccionados.
   * * Si no existen personajes guardados, carga todos los personajes disponibles.
   */
  async validateUserHeroes() {
    try {
      const hasCharacters = await this.checkIfCharactersExist(this.uid);
      if (hasCharacters) {
        this.loadSelectedCharacters();
      } else {
        this.loadAllCharacters();
      }
    } catch (error) {
      console.error('Error checking characters:', error);
    }
  }
}