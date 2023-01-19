import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '@env/services';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'angkre-tab',
  templateUrl: './angkre-tab.component.html',
  styleUrls: ['./angkre-tab.component.css']
})
export class AngkreTabComponent implements OnInit {
  @ViewChild('menuitem') menu: MenuItem[];
  isAdmin;
  isPenilai;
  user;
  activeItem: MenuItem;
  angkremenu: MenuItem[];
  constructor(private authSrvc: AuthenticationService) {
    this.authSrvc.user.subscribe(x => this.user = x);
    if (this.user) {
      this.isAdmin = this.user.role === 'Admin';
      this.isPenilai = this.user.role === 'Penilai';
    }
  }

  ngOnInit(): void {
    this.angkremenu = [
      {label: 'Pekerjaan', icon: "pi pi-file"},
      {label: "Surat Tugas", icon: "pi pi-paperclip"},
      {label: "Penilaian", icon: "pi pi-ticket"},
      {label: "Pengajuan", icon: "pi pi-tags"},
      {label: "Kontrak Kinerja", icon: "pi pi-tablet"},
    ];
    this.activeItem = this.angkremenu[0];
  }
  changeMenu() {
    this.activeItem = this.angkremenu['activeItem']
  }
}
