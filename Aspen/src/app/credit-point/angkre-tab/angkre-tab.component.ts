import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@env/services';

@Component({
  selector: 'app-angkre-tab',
  templateUrl: './angkre-tab.component.html',
  styleUrls: ['./angkre-tab.component.css']
})
export class AngkreTabComponent implements OnInit {
  uid;
  constructor(private authSrvc: AuthenticationService) {
    this.authSrvc.user.subscribe(x => this.uid = x.id);
  }

  ngOnInit(): void {
  }

}
