import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '@env/services';

@Component({
  selector: 'angkre-tab',
  templateUrl: './angkre-tab.component.html',
  styleUrls: ['./angkre-tab.component.css']
})
export class AngkreTabComponent implements OnInit {
  background: ThemePalette = 'accent';
  isAdmin;
  user;
  constructor(private authSrvc: AuthenticationService) {
    this.authSrvc.user.subscribe(x => this.user = x);
    if (this.user) {
        this.isAdmin = this.user.role === 'Admin';
    }
  }

  ngOnInit(): void {
  }

}
