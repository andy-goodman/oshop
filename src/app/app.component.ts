import { Component } from '@angular/core';
import {AuthService} from './service/auth/auth.service';
import {Router} from '@angular/router';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.authService.user$.subscribe( user => {
      if (user) {
        this.userService.save(user);

        const returnUrl = localStorage.getItem('returnUrl');
        if (!returnUrl) {
          return;
        }
        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }

}
