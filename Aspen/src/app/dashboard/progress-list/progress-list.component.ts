import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService} from '@env/services';
import { ContractService } from '@env/services/contract.service';

@Component({
  selector: 'app-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.css']
})
export class ProgressListComponent implements OnInit {
  user;
  isAdmin;
  mainData;
  currentYear;
  currentData;
  contractNameList;
  constructor(private ctrService: ContractService,
    private authService: AuthenticationService) {
    this.authService.user.subscribe(usr => this.user = usr);
    if (this.user) {
      this.isAdmin = this.user.role === 'Admin';
    }
  }
  
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(){
    this.ctrService.getYearList().subscribe(result => {
      this.mainData = result.reduce((group, userId) => {
        const {contractYear} = userId;
        group[contractYear] = group[contractYear] ?? [];
        group[contractYear].push(userId);
        return group;
      },{});
      this.currentYear = new Date().getFullYear();
      this.currentData = this.mainData[this.currentYear];
      console.log('isi dari currentData', this.currentData);
      console.log('isi dari mainData', this.mainData);
    }, error => console.error(error));
    
  }

  onChangeSelect(ev){
    this.currentYear = ev.value;
    this.currentData = this.mainData[this.currentYear];
  }
}
