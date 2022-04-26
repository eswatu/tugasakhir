import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Component, OnInit } from '@angular/core';
import { PermenService } from '@env/services/permen.service';
import { butirFull, treeNode } from '@env/model/permen';
import { FormControl } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'cp-butir-tree',
  templateUrl: './butir-tree.component.html',
  styleUrls: ['./butir-tree.component.css']
})


export class ButirTreeComponent implements OnInit {

  private _transformer = (node: treeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.id
    };
  };

  @Output() selectedButir = new EventEmitter<butirFull>();

  treeControl = new FlatTreeControl<FlateNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );
  
  dataSource = new MatTreeFlatDataSource(
    this.treeControl, this.treeFlattener);
  
  hasChild = (_: number, 
    node: FlateNode) => node.expandable;
    defaultLevel = 1;
  
  constructor(private permernServ: PermenService) { }
    
  availButir;
  ngOnInit(): void {
    this.loadData();
  }
  loadData(forlvl: number = this.defaultLevel) { 
    this.permernServ.getByLevel(forlvl).subscribe(
      res => {
        this.availButir = res;
        //split subunsur
        let split = this.groupItemBy(res, 'SubUnsur.namaSubUnsur');
        //split aktivitas
        for (let item in split) {
          if (split.hasOwnProperty(item)) {
            //reformat aktivitas
            let splot = this.groupItemBy(split[item], 'Aktivita.namaAkt');
            //.map((item) => ({name: item[0], children: item[1]}));
            for (let dtil in splot) {
              if (splot.hasOwnProperty(dtil)) {
                splot[dtil] = splot[dtil].map((dt) => ({name: dt.namaButir, children: null, id: dt.id}));
              }
            }
            split[item] = Object.entries(splot).map((item) => ({name: item[0], children: item[1]}));;
          }
          
        }
        //reformat subunsur
        this.dataSource.data = Object.entries(split).map((item) => ({name: item[0], children: item[1]}) as treeNode);
        //split.forEach((children) => this.groupItemBy(children['children'], 'Aktivita.namaAkt').map((entry) => ({name: entry[0], children: entry[1]})));
        console.log(this.dataSource.data);
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
setButir(id:number) {
  if (id) {
      let butirOut = this.availButir.find(item => item.id == id);
      if (butirOut) {
            this.selectedButir.emit(butirOut as butirFull);
      }
  }
}

}

interface FlateNode {
  expandable: boolean;
  name: string;
  level: number;
  id: number;
}