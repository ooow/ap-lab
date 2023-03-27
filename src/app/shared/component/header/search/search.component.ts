import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export enum SearchTypes {
  INPUT = 'Input',
  SELECTOR = 'Selector'
}

@Component({
  selector   : 'tk-search',
  templateUrl: './search.component.html',
  styleUrls  : ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy, OnChanges {
  @Input() label: string = 'Search';
  @Input() options: string[] = [];
  @Input() search = '';
  @Input() searchType: SearchTypes;
  @Output() valueChange = new EventEmitter<string>();

  readonly SearchTypes = SearchTypes;
  readonly searchControl = new FormControl();
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.valueChange.emit(value));
  }

  ngOnChanges(): void {
    this.searchControl.setValue(this.search);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
