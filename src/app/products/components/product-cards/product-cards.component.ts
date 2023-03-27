import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'tk-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.scss']
})
export class ProductCardsComponent {

  @Input() totalNumber: number;
  @Input() pageIndex: number;
  @Input() loading: boolean;
  @Input() products: Product[];
  @Output() pageChange = new EventEmitter<number>();
  @Output() productDetails = new EventEmitter<Product>();

}
