import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'tk-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.scss']
})
export class ProductCardsComponent implements OnInit {

  @Input() totalNumber: number;
  @Input() pageIndex: number;
  @Input() loading: boolean;
  @Input() products: Array<Product>;
  @Output() pageChange = new EventEmitter<number>();
  @Output() productDetails = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

}
