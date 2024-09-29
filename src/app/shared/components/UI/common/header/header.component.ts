import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoading: boolean = false;
  dataUser: User = {};
  private subscription: Subscription | null = null;
  private uid = JSON.parse(localStorage.getItem('uid')!);
  private provider = localStorage.getItem('provider');

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.getUserData();
  }
  /**
   * @description
   * * Obtiene los datos del usuario basado en el proveedor de autenticaci�n.
   * * Si el proveedor es 'email', obtiene los datos del usuario desde Firestore usando el UID.
   * * Si el proveedor es otro (por ejemplo, Google), obtiene el nombre del usuario desde el objeto `user` en Firestore.
   */
  getUserData() {
    this.isLoading = true;
    if (this.provider == 'email') {
      this.subscription = this.firestoreService
        .getDatauserByUid(this.uid)
        .subscribe({
          next: (data: User) => {
            this.dataUser = data;
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error fetching Marvel characters', error.message);
          },
        });
    } else {
      this.subscription = this.firestoreService.user$.subscribe((user) => {
        if (user) {
          this.dataUser.name = user.displayName || '';
          this.dataUser.lastName = '';
        }
      });
    }
  }

  /**
   * @description
   * * Cierra la sesion del usuario actual llamando al servicio de autenticacion.
   */
  logOut() {
    this.authService.logOut();
  }
}
