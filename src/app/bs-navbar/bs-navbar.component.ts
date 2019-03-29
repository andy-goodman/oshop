import { Component } from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {AppUser} from '../models/app-user';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  appUser: AppUser;

  constructor(public authService: AuthService) {
    // afAuth.authState.subscribe(user$ => this.user$ = user$);
    // this.user$ = afAuth.authState;
    authService.appUser$.subscribe( appUser => this.appUser = appUser);
  }

  logout() {
    this.authService.logout();
  }
}
