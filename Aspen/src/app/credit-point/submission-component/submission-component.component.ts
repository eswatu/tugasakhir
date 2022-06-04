import { Component, Input, OnInit } from '@angular/core';
import { submission } from '@env/model/submission';
import { ActService } from '@env/services/act.service';

@Component({
  selector: 'submission-component',
  templateUrl: './submission-component.component.html',
  styleUrls: ['./submission-component.component.css']
})
export class SubmissionComponentComponent implements OnInit {
  
  @Input() submission: submission;
  allAct;

  constructor(private actService: ActService) { }

  ngOnInit(){
    console.log(this.submission);
    this.loadAll();
  }
  loadAll(){
    this.actService.getData(0,1000,'actDate','desc','SubId','1')
      .subscribe(result => {
        this.allAct = result['data'];
        this.allAct = this.groupItemBy(this.allAct,'AssignmentLetter.ltNumber');
        console.log(this.allAct);

      }, error => console.error(error));
  }

  groupItemBy(array, property) {
    var hash = {},
        props = property.split('.');
    for (var i = 0; i < array.length; i++) {
        var key = props.reduce(function(acc, prop) {
            return acc && acc[prop];
        }, array[i]);
        if (!hash[key]) hash[key] = [];
        hash[key].push(array[i]);
    }
    return hash;
}
getTitle(obj: Object, index: number){
  return Object.keys(obj)[index];
}



}
