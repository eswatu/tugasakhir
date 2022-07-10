import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActService } from '@env/services';
import { ContractService } from '@env/services/contract.service';

@Component({
  selector: 'progress-block',
  templateUrl: './progress-block.component.html',
  styleUrls: ['./progress-block.component.css']
})
export class ProgressBlockComponent implements OnInit, OnChanges {
  @Input() year;
  @Input() userId;
  
  user;
  kontrak;
  pencapaian = 0;

  utama = 0;
  utamaunrealise = 0;
  utamarealise =0;

  penunjang = 0;
  penunjangunrealise = 0;
  penunjangrealise = 0;

  persentase = 0;
  warna = '#A93226';
  constructor(private actService: ActService, private ctrService: ContractService) {
  }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnChanges(changes: SimpleChanges): void {
      this.ngOnInit();
  }
  loadData(){
    //load kontrak kinerja
    this.ctrService.contractByYear(this.year).subscribe(res => {
      this.kontrak = res;
    });
    //loadprogress
    this.actService.getProgress(this.year, this.userId).subscribe(res => {
      this.user = res.user;
      this.pencapaian = res.mainRealized + res.sideRealized;
      this.utama = res.maintotal;
      this.penunjang = res.sidetotal;
      this.utamaunrealise = res.mainUnrealized;
      this.utamarealise = res.mainRealized;
      this.penunjangunrealise = res.sideUnrealized;
      this.penunjangrealise = res.sideRealized;
      this.persentase = this.pencapaian / this.kontrak.contractValue * 100;
      
      if (this.persentase < 30) {
        this.warna = '#A93226';
      } else if (this.persentase >= 30 && this.persentase < 70) {
        this.warna = '#DFDF0B';
      } else if (this.persentase >= 70) {
        this.warna = '#35DF0B';
      }

    }, error => console.error(error));
  }

}

