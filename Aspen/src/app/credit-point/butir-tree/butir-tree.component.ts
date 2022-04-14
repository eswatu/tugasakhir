import { CdkTreeNode } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { butirLess, subUnsur, aktivitas, treeNode } from '@env/model/permen';
import { PermenService } from '@env/services/permen.service';

@Component({
  selector: 'app-butir-tree',
  templateUrl: './butir-tree.component.html',
  styleUrls: ['./butir-tree.component.css']
})
export class ButirTreeComponent implements OnInit {

  defaultLevel = 1;
  butirs;
  dfSubUnsur;
  dfAktivita;
  dataTree: treeNode[] ;

  constructor(private permernServ: PermenService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(forlvl: number = this.defaultLevel) { 
    this.permernServ.getByLevel(forlvl).subscribe(
      res => {
        let split = this.groupItemBy(res, 'SubUnsur.namaSubUnsur');
        split.forEach(function (key, value) {
          let node: treeNode = {
            name: this.key,
            children : this.value
          };
          this.dataTree.push(node);
        });
        console.log(this.dataTree);
    }, err => console.error(err));
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


  

}
