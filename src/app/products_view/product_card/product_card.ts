import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Product} from 'src/app/shared/model/product';

@Component({
  selector       : 'tk-product-card',
  templateUrl    : './product_card.ng.html',
  styleUrls      : ['./product_card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  @Input() product: Product;
}
