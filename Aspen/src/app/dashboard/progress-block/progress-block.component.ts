import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'progress-block',
  templateUrl: './progress-block.component.html',
  styleUrls: ['./progress-block.component.css']
})
export class ProgressBlockComponent implements OnInit {
  @Input() year;
  target = 5;
  pencapaian = 4.8;

  constructor() { }

  ngOnInit(): void {
  }

}
