import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  signUpFormSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', []],
      identification: [
        '',
        [Validators.required, Validators.pattern(/^\d{8,}$/)],
      ],
      phone: ['', [Validators.pattern(/^(3[0-9]{9})$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * @description
   * * Método para registrar un nuevo usuario con los datos proporcionados.
   */
  signUp() {
    this.signUpFormSubmitted = true;
    if (this.signUpForm.invalid) {
      return;
    }

    const { name, lastName, identification, phone, email, password } =
      this.signUpForm.value;

    const userData: User = {
      name,
      lastName,
      identification,
      phone,
      email,
    };

    this.authService
      .signUpWithEmailAndPassword(email, password, userData)
      .then((response) => {
        console.log('Registro exitoso', response);
      })
      .catch((error) => {
        console.error('Error al registrar', error);
      });
  }

  /**
   * @description
   * * Métodos para acceder a los controles del formulario
   */
  get nameControl() {
    return this.signUpForm.get('name');
  }

  get lastNameControl() {
    return this.signUpForm.get('lastName');
  }

  get identificationControl() {
    return this.signUpForm.get('identification');
  }

  get phoneControl() {
    return this.signUpForm.get('phone');
  }

  get emailControl() {
    return this.signUpForm.get('email');
  }

  get passwordControl() {
    return this.signUpForm.get('password');
  }
}
