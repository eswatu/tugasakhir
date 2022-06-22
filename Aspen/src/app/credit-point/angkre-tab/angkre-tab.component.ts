import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@env/services';

@Component({
  selector: 'angkre-tab',
  templateUrl: './angkre-tab.component.html',
  styleUrls: ['./angkre-tab.component.css']
})
export class AngkreTabComponent implements OnInit {
  isAdmin;
  constructor(private authSrvc: AuthenticationService) {
    this.authSrvc.user.subscribe(x => this.isAdmin = (x.role === "Admin") ? true : false);
  }

  ngOnInit(): void {
  }

}
