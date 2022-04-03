import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { butir } from '@env/model/permen';
import { PermenService } from "@env/services/permen.service";

@Component({
  selector: 'app-credit-point-table',
  templateUrl: './credit-point-table.component.html',
  styleUrls: ['./credit-point-table.component.css']
})
export class CreditPointTableComponent implements OnInit {
  public displayedColumns: string[] = ['id'];
  public butirs: MatTableDataSource<butir>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private permenService: PermenService) { 
    }

  ngOnInit(): void {
  }
  loadData() { 
    this.permenService.get
  }

}
