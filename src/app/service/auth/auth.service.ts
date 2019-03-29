import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import {AppUser} from '../../models/app-user';
import 'rxjs-compat/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    const authProvider: GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(authProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        }
        return Observable.of(null);
      });
  }
}
