import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Model properties for ngModel
  email: string = '';
  password: string = '';
  
  emailTouched: boolean = false;
  passwordTouched: boolean = false;

  constructor(private authService: AuthService) {}

  /**
   * @description
   * * Marca un campo como tocado cuando el usuario hace blur sobre el campo.
   * * Esto asegura que se muestren los errores de validaci�n si existen.
   * @param control {NgModel} - Control del modelo para el campo de entrada
   * @param field {string} - Nombre del campo ('email' o 'password') para determinar cu�l marca como tocado
   */
  onBlur(control: NgModel, field: string) {
    if (field === 'email') {
      this.emailTouched = true;
    } else if (field === 'password') {
      this.passwordTouched = true;
    }
    control.control.markAsTouched();
  }

  /**
   * @description
   * * Metodo que permite loguearse mediante un usuario previamente registrado en la App
   * @param emailControl {NgModel} - Control del modelo para el campo de correo electr�nico
   * @param passwordControl {NgModel} - Control del modelo para el campo de contrase�a
   */
  logIn(emailControl: NgModel, passwordControl: NgModel) {
    
    emailControl.control.markAsTouched();
    passwordControl.control.markAsTouched();
    emailControl.control.value == "" ? this.emailTouched = true : this.emailTouched = false;

    if (emailControl.invalid || passwordControl.invalid) {
      return;
    }

    // Si los campos son v�lidos, llama al servicio de autenticaci�n
    this.authService.logInWithEmailAndPassword(this.email, this.password)
      .then(response => {
        console.log('Inicio de sesi�n exitoso', response);
      })
      .catch(error => {
        console.error('Error de inicio de sesi�n', error);
      });
  }

  /**
   * @description
   * * M�todo que permite iniciar sesi�n con Google OAuth 2.0
   */
  logInWithGoogle() {
    this.authService.logInWithGoogleProvider();
  }
}
