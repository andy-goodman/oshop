import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth/auth.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  constructor(public authService: AuthService) {
    // afAuth.authState.subscribe(user$ => this.user$ = user$);
    // this.user$ = afAuth.authState;
  }

  logout() {
    this.authService.logout();
  }
}
