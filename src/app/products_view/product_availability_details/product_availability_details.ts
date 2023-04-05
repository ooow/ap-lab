import { Component, Input, OnInit } from '@angular/core';
import { ProductQuantityInfo } from '../../shared/model/product_quantity_info';

@Component({
  selector: 'tk-product-availability-details',
  templateUrl: './product_availability_details.ng.html',
  styleUrls: ['./product_availability_details.scss'],
})
export class ProductAvailabilityDetails implements OnInit {
  @Input() productQuantityInfo: ProductQuantityInfo[] = [];

  selectedProductQuantityInfo: ProductQuantityInfo;

  ngOnInit() {
    this.selectedProductQuantityInfo = this.productQuantityInfo[0];
  }

  onCountryChange(productInfo: ProductQuantityInfo) {
    this.selectedProductQuantityInfo = productInfo;
  }
}
