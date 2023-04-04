import { Component, Input, OnInit } from '@angular/core';
import { ProductQuantityInfo } from '../../shared/model/product-quantity-info';

@Component({
  selector: 'tk-product-availability-details',
  templateUrl: './product_availability_details.ng.html',
  styleUrls: ['./product_availability_details.scss'],
})
export class ProductAvailabilityDetails implements OnInit {
  @Input() productQuantityInfo: ProductQuantityInfo[] = [];

  selectedCountry: ProductQuantityInfo;

  constructor() {}

  ngOnInit() {
    this.selectedCountry = this.productQuantityInfo[0];
  }

  onCountryChange(countryName: ProductQuantityInfo) {
    this.selectedCountry = countryName;
  }
}
