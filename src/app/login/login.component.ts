import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private afAuth: AngularFireAuth) {
  }

  login() {
    const authProvider: GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
    console.log('authProvider', authProvider);
    this.afAuth.auth.signInWithRedirect(authProvider);
  }
}
