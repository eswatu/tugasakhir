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
  
  constructor(private authenticationService: AuthenticationService,
    private userService: UserService) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  get isAdmin() {
      return this.user && this.user.role === "Admin";
  }

  logout() {
      this.authenticationService.logout();
  }
  ngOnInit() {
    this.loading = true;
    this.userService.get(this.user.id).pipe(first()).subscribe(user => {
        this.loading = false;
    });
}
}
