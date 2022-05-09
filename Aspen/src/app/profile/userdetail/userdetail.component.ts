import { Component, OnInit } from '@angular/core';
import { user } from '@env/model/user';
import { UserService } from '@env/services/user-service.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  userId;
  userInfo: user;
  constructor(private userService: UserService) { }

  ngOnInit(){
    this.loadData();
  }
  loadData(){
    this.userService.get<user>(1).subscribe(res => {
      this.userInfo = res;
      console.log(res);
    }, error => console.error(error));
  }
}
