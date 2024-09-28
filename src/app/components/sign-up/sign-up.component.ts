import { Component } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private authService: AuthService) {}

  /**
   * @description
   * * Registra un nuevo usuario con los datos proporcionados.
   * * Llama al servicio de autenticaci�n para crear una cuenta con correo electr�nico y contrase�a.
   * * Tambi�n se pasan los datos del usuario para su almacenamiento adicional.
   * @param name {string} - Nombre del usuario
   * @param lastName {string} - Apellido del usuario
   * @param identification {number} - Identificaci�n del usuario
   * @param phone {number} - Tel�fono del usuario
   * @param email {string} - Correo electr�nico del usuario
   * @param password {string} - Contrase�a del usuario
   */
  signUp(name: string, lastName: string, identification: number, phone: number, email: string, password: string) {
    const userData: User = {
      name,
      lastName,
      identification,
      phone,
      email
    };
    this.authService.signUpWithEmailAndPassword(email, password, userData);
  }
}
