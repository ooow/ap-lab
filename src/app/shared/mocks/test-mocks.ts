import { Lang } from 'src/app/shared/models/lang';
import { AppState } from 'src/app/shared/models/app-state';
import { ProductsResp } from 'src/app/products/models/products-resp';
import { Product } from 'src/app/products/models/product';

const mockProductsData = [
  {
    name: 'product1',
    description: 'description1',
    picture: 'picture1',
    counts: [{ location: 'product1-location', quantityAvailable: '666' }]
  },
  {
    name: 'product2',
    description: 'description2',
    picture: 'picture2',
    counts: [{ location: 'product2-location', quantityAvailable: '999' }]
  }
];

export const initialState: AppState = {
  product: {
    topProducts: [...mockProductsData],
    products: [...mockProductsData],
    search: '',
    pageIndex: 1,
    totalNumber: 3
  },
  lang: Lang.ru
};

export const mockProductResponse: ProductsResp = {
  products: mockProductsData,
  totalNumber: 2
};
