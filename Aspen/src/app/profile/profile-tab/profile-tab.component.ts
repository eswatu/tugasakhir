import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@env/services';

@Component({
  selector: 'profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.css']
})
export class ProfileTabComponent implements OnInit {
  isAdmin;
  user;
  constructor(private authSrvc: AuthenticationService) {
    this.authSrvc.user.subscribe(x => {
      this.user = x;
      if (this.user) {
        this.isAdmin = (x.role === "Admin") ? true : false;
      }
    }, error => console.error(error));
  }

  ngOnInit(): void {
  }
}
