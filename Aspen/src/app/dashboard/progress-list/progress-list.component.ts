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
  mainData;
  currentYear;
  userIdList;
  contractNameList;
  constructor(private ctrService: ContractService,
    private authService: AuthenticationService) {
    this.authService.user.subscribe(usr => this.user = usr);
    this.currentYear = new Date().getFullYear();
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
      this.userIdList = result.map(a => a.UserId);
      this.contractNameList = result.map(a => a.contractName);
      console.log('isi yearlist',this.mainData);
      console.log('isi userIdList',this.userIdList);
    }, error => console.error(error));
  }

  onChangeSelect(ev){
    this.currentYear = ev.value;
  }
}
