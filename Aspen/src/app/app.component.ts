import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from './model';
import { AuthenticationService, UserService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  loading = false;
  title = 'Aspen';

  user: User;
  
  constructor(private authenticationService: AuthenticationService) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  get isAdmin() {
      return this.user && this.user.role === "Admin";
  }
  get isAuthorized() {
    return this.user;
  }

  logout() {
      this.authenticationService.logout();
  }
  ngOnInit() {
    this.loading = true;
    console.log(this.user);
}
}
