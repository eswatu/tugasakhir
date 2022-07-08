import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '@env/services';
import { ContractService } from '@env/services/contract.service';

@Component({
  selector: 'app-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.css']
})
export class ProgressListComponent implements OnInit {
  user;
  yearlist = [String];
  currentYear;
  constructor(private ctrService: ContractService, private authService: AuthenticationService) {
    this.authService.user.subscribe(usr => this.user = usr);
  }

  ngOnInit(): void {
  this.loadData();
  }
  
  loadData(){
    this.currentYear = new Date().getFullYear();
    this.ctrService.getYearList().subscribe(result => {
      this.yearlist = result.map(a => a.contractYear);
      console.log(this.yearlist);
    }, error => console.error(error));

  }
  onChangeSelect(ev){
    console.log('iam called');
    this.currentYear = ev.value;
  }
}
