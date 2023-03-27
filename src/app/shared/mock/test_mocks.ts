import {AppState} from 'src/app/shared/model/app_state';
import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import {ProductsResp} from 'src/app/shared/model/products_resp';

export const mockProductsData = [
  {
    name       : 'product1',
    description: 'description1',
    picture    : 'picture1',
    counts     : [
      {location: 'product1-location', quantityAvailable: 666, price: 999},
    ],
  }, {
    name       : 'product2',
    description: 'description2',
    picture    : 'picture2',
    counts     : [
      {location: 'product2-location', quantityAvailable: 999, price: 666},
    ],
  },
];

export const initialState: AppState = {
  product         : {
    products   : [...mockProductsData],
    isLoading  : false,
    error      : null,
    search     : '',
    pageIndex  : 1,
    totalNumber: 3,
  }, topProducts  : {
    topProducts: [...mockProductsData], isLoading: false, error: null,
  }, storedProduct: {
    isLoading: false, message: null, error: null,
  }, lang         : Language.ru,
};

export const mockProductResponse: ProductsResp = {
  products: mockProductsData, totalNumber: 2,
};
