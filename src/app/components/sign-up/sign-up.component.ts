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
   * * Llama al servicio de autenticación para crear una cuenta con correo electrónico y contraseña.
   * * También se pasan los datos del usuario para su almacenamiento adicional.
   * @param name {string} - Nombre del usuario
   * @param lastName {string} - Apellido del usuario
   * @param identification {number} - Identificación del usuario
   * @param phone {number} - Teléfono del usuario
   * @param email {string} - Correo electrónico del usuario
   * @param password {string} - Contraseña del usuario
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
