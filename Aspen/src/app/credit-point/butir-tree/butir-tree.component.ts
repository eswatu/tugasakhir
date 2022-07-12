import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Component, Inject, OnInit} from '@angular/core';
import { PermenService } from '@env/services/permen.service';
import { treeNode } from '@env/model/permen';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreditPointFormComponent } from '../credit-point-form/credit-point-form.component';
import { act } from '@env/model/acts';
import { AuthenticationService } from '@env/services';

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

  selectedNode = new SelectionModel<FlateNode>(true);
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
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, 
    node: FlateNode) => node.expandable;
    defaultLevel;
    defaultJenis;
    //nomor id act
    act: act;

  constructor(
    private authService: AuthenticationService,
    private permernServ: PermenService,
    private dialogRef: MatDialogRef<ButirTreeComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data) {
      this.authService.user.subscribe(u => {
        this.defaultLevel = parseInt(u.level);
      }, error => console.error(error));

    if (data.act) {
      this.act = data.act;
    }
    if (parseInt(data.jenis) == 1) {
    this.defaultJenis = 1;
    } else {
      this.defaultJenis = 0;
    }
  }
  //simpan data semua butir yang ada
  availButir;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(forlvl: number = this.defaultLevel, jenis: number = this.defaultJenis) {
    //load level 
    this.permernServ.getByLevel(forlvl, jenis).subscribe(
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
                splot[dtil] = splot[dtil].map((dt) => ({name: dt.namaButir +' '+ dt.tkButir, children: null, id: dt.id}));
              }
            }
            split[item] = Object.entries(splot).map((item) => ({name: item[0], children: item[1]}));;
          }
        }
        //reformat subunsur
        this.dataSource.data = Object.entries(split).map((item) => ({name: item[0], children: item[1]}) as treeNode);
        //split.forEach((children) => this.groupItemBy(children['children'], 'Aktivita.namaAkt').map((entry) => ({name: entry[0], children: entry[1]})));
        //console.log(this.dataSource.data);
    }, err => console.error(err));
  }
  //grouping tree
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

//toggle untuk tree
toggleSelect(node: FlateNode){
  this.selectedNode.toggle(node);
}
//fungsi ketika klik node terakhir
setButir(id:number) {
  if (id) {
      let butirOut = this.availButir.find(item => item.id == id);
      console.log("butirout adalah: ");
      console.log(butirOut);

      if (butirOut) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.restoreFocus; true;
          dialogConfig.minWidth = 400;
          dialogConfig.minHeight = 400;

          if (!this.act) {
            this.act = <act>{};
          }
          this.act.Butir = butirOut;
          this.act.butirId = butirOut.id;
          this.act.actMain = (butirOut.Aktivita.kodeAkt === 'G') ? false : true;
          dialogConfig.data = { act: this.act };

          console.log("isi dari act form keluar: ");
          console.log(this.act);
          const dialogRef2 = this.dialog.open(CreditPointFormComponent, dialogConfig);
          this.dialogRef.close();
      }
  }
}

//eof
}

interface FlateNode {
  expandable: boolean;
  name: string;
  level: number;
  id: number;
}

//buka tree ini, kirim data butir ke next dialog