import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import {ProductState} from 'src/app/shared/model/product_state';
import {StoredProductState} from 'src/app/shared/model/stored_product_state';
import {TopProductsState} from 'src/app/shared/model/top_products_state';

export interface AppState {
  product: ProductState;
  topProducts: TopProductsState;
  storedProduct: StoredProductState;
  lang: Language;
}
