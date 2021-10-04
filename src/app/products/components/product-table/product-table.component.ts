import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/shared/models/product';

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

  constructor(private snackBar: MatSnackBar) {}

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

  openSnackBar(name: string): void {
    const message = `${name} picture link copied to clipboard`;
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right'
    });
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = (value: Product, filter: string) =>
      value.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
