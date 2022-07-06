import { Component, Input, OnInit } from '@angular/core';
import { ActService } from '@env/services';

@Component({
  selector: 'progress-block',
  templateUrl: './progress-block.component.html',
  styleUrls: ['./progress-block.component.css']
})
export class ProgressBlockComponent implements OnInit {
  @Input() year;
  target = 5;
  pencapaian = 4.8;
  utama = 0;
  utamaunrealise = 0;
  penunjang = 0;
  penunjangunrealise = 0;
  constructor(private actService: ActService) {
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.actService.getProgress().subscribe(res => {
      this.pencapaian = res.mainRealized + res.sideRealized;
      this.utama = res.maintotal;
      this.penunjang = res.sidetotal;
      this.utamaunrealise = res.mainUnrealized;
      this.penunjangunrealise = res.sideUnrealized;

    }, error => console.error(error));
  }

}

