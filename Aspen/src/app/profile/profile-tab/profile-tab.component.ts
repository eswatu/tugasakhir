import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@env/services';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.css']
})
export class ProfileTabComponent implements OnInit {
  isAdmin;
  user;
  profiletab: MenuItem[];
  activeItem: MenuItem;
  currentmenu;
  constructor(private authSrvc: AuthenticationService) {
    this.authSrvc.user.subscribe(x => {
      this.user = x;
      if (this.user) {
        this.isAdmin = (x.role === "Admin") ? true : false;
      }
    }, error => console.error(error));
  }
  angkretabitem = {
    "Profil": "userdetail",
    "Daftar Pengguna": "userlist"
  }
  ngOnInit(): void {
    this.profiletab = [
      { label: "Profil", icon: "" },
      {label: "Daftar Pengguna", icon:""}
    ];
    this.activeItem = this.profiletab[0];
  }
  activateMenu() {
    this.currentmenu = this.angkretabitem[this.activeItem.label];
  }
}
