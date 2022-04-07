import { Component, OnInit } from '@angular/core';
import { butir, subUnsur } from '@env/model/permen';
import { PermenService } from '@env/services/permen.service';

@Component({
  selector: 'app-butir-tree',
  templateUrl: './butir-tree.component.html',
  styleUrls: ['./butir-tree.component.css']
})
export class ButirTreeComponent implements OnInit {

  defaultLevel = 1;
  butirs: {butir: any};

  constructor(private permernServ: PermenService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(forlvl: number = this.defaultLevel) { 
    this.permernServ.getByLevel(forlvl).subscribe(
      res => {
        this.butirs = res as [butir];
        let result = this.collectSubUnsurName(JSON.parse(res));
        console.log(result);
    });
  }
  groupSubItemBy(array, property) {
    var group = {};
    for (var i = 0; i < array.length; i++) {
      if (!group[array[i][property]]) {
        group[array[i][property]] = [];
      }
      group[array[i][property]].push(array[i]);
    }
    return group;
  }

  collectSubUnsurName(arr:[butir]) {
    let result = [];
    for (let i =0; i < 5; i++){
      let subs = arr[i].subUnsur;
      console.log(subs);
    }
    return result;
  }
  

}
