import { ProductState } from 'src/app/products/models/product-state';
import { Lang } from 'src/app/shared/models/lang';

const mockProductsData = [
  { name: 'product1', description: 'description1', picture: 'picture1' },
  { name: 'product2', description: 'description2', picture: 'picture2' }
];

export const initialState = {
  product: {
    topProducts: [...mockProductsData],
    products: [...mockProductsData],
    search: '',
    pageIndex: 1,
    totalNumber: 3
  } as ProductState,
  lang: 'ru' as Lang
};
