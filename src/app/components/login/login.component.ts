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
   * @param emailControl {NgModel}
   * @param passwordControl {NgModel}
   */
  logIn(emailControl: NgModel, passwordControl: NgModel) {
    
    // Marca los campos como tocados para mostrar errores si hay alguno
    emailControl.control.markAsTouched();
    passwordControl.control.markAsTouched();
    emailControl.control.value == "" ? this.emailTouched = true : this.emailTouched = false;

    // Verifica si los campos son válidos
    if (emailControl.invalid || passwordControl.invalid) {
      return;
    }

    // Si los campos son válidos, llama al servicio de autenticación
    this.authService.logInWithEmailAndPassword(this.email, this.password)
      .then(response => {
        // Maneja la respuesta del login exitoso
        console.log('Inicio de sesión exitoso', response);
      })
      .catch(error => {
        // Maneja errores del login
        console.error('Error de inicio de sesión', error);
      });
  }

  logInWithGoogle() {
    this.authService.logInWithGoogleProvider();
  }
}
