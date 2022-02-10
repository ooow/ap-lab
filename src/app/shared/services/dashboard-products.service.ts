import { Injectable } from '@angular/core';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class DashboardProductsService {
  constructor() {}

  sumQunatityAvailableByLocation(products:Product[]){
    const productsCounts = products.map((product) => [...product.counts]);
    const concatedCounts = [].concat.apply([], productsCounts);

    const reducedByLoction = Array.from(
      concatedCounts.reduce(
        (m, { location, quantityAvailable }) =>
          m.set(location, (m.get(location) || 0) + quantityAvailable),
        new Map()
      ),
      ([location, quantityAvailable]) => ({ location, quantityAvailable })
    );

    return reducedByLoction;
  }

  concatCounts(products:Product[]){
    const productsCounts = products.map((product) => [...product.counts]);
    const concatedCounts = [].concat.apply([], productsCounts);
    return concatedCounts;
  }

  removeDuplicatedProductsByLocationAndPrice(products:Product[]){
    const productsCounts = products.map((product) => [...product.counts]);
    const concatedCounts = [].concat.apply([], productsCounts);

    const countsNoDuplicates = concatedCounts.filter((value, index) => {
      const locationAndPrice = { location: value.location, price: value.price };
      const locationAndPriceStringify = JSON.stringify(locationAndPrice);
      return (
        index ===
        concatedCounts.findIndex((obj) => {
          return (
            JSON.stringify({ location: obj.location, price: obj.price }) ===
            locationAndPriceStringify
          );
        })
      );
    });

    return countsNoDuplicates;
  }

}

