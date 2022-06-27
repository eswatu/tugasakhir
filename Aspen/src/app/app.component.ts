import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
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
  
  constructor(private authenticationService: AuthenticationService, public dialog:MatDialog) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  get isAdmin() {
      return this.user && this.user.role === "Admin";
  }
  get isAuthorized() {
    return this.user;
  }
  openhelp(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus; true;
    dialogConfig.minWidth = 400;
    dialogConfig.minHeight = 400;

    const dialogRef = this.dialog.open(HelpDialogComponent, dialogConfig); 
  }

  logout() {
      this.authenticationService.logout();
  }
  ngOnInit() {
    this.loading = true;
    console.log(this.user);
  }
}
