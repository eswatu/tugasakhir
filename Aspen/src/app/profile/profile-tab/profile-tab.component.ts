import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@env/services';

@Component({
  selector: 'profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.css']
})
export class ProfileTabComponent implements OnInit {
  isAdmin;
  constructor(private authSrvc: AuthenticationService) {
    this.authSrvc.user.subscribe(x => this.isAdmin = (x.role === "Admin") ? true : false);
  }

  ngOnInit(): void {
  }
}
