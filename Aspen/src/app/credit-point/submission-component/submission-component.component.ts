import { Component, Input, OnInit } from '@angular/core';
import { submission } from '@env/model/submission';
import { SubmissionService } from '@env/services/submission.service';

@Component({
  selector: 'submission-component',
  templateUrl: './submission-component.component.html',
  styleUrls: ['./submission-component.component.css']
})
export class SubmissionComponentComponent implements OnInit {
  
  @Input() submission: submission;

  constructor() { }

  ngOnInit(){
  }


}
