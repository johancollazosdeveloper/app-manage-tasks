import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginFormSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * @description
   * * Metodo que permite loguearse mediante un usuario previamente registrado en la App
   */
  logIn() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService
      .logInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('Inicio de sesión exitoso', response);
      })
      .catch((error) => {
        console.error('Error de inicio de sesión', error);
      });
  }

  /**
   * @description
   * * Metodo que permite iniciar sesion con Google OAuth 2.0
   */
  logInWithGoogle() {
    this.authService.logInWithGoogleProvider();
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}
