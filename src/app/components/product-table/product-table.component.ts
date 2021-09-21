// prettier-ignore
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../models/product';

@Component({
  selector: 'tk-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit, AfterViewInit {
  @Input() totalNumber: number;
  @Input() pageIndex: number;
  @Input() loading: boolean;
  @Output() pageChange = new EventEmitter<number>();
  @ViewChild(MatSort) sort: MatSort;
  readonly displayedColumns = ['name', 'picture', 'description'];
  dataSource: MatTableDataSource<Product>;
  private searchValue: string;

  @Input() set products(value: Array<Product>) {
    this.dataSource = new MatTableDataSource(value);
    if (this.search) {
      this.dataSource.filter = this.search;
    }
  }

  get search(): string {
    return this.searchValue;
  }

  @Input() set search(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
    this.searchValue = value;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  isEllipsisActive(e: HTMLElement): boolean {
    return e ? e.offsetHeight < e.scrollHeight : false;
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = (value: Product, filter: string) =>
      value.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }
}
