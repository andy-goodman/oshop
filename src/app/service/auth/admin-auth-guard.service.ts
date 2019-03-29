import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {UserService} from '../user.service';
import 'rxjs-compat/add/operator/switchMap';
import {Observable} from 'rxjs';
import {AppUser} from '../../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
      .map((appUser: AppUser) => appUser.isAdmin);
  }
}
