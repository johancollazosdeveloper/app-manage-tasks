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
