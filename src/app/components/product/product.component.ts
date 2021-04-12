import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'tk-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product: Product;
}
