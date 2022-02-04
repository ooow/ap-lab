import { createAction, props } from "@ngrx/store";

import { ProductsView } from "src/app/shared/models/products-view";

export const changeViewAction = createAction(
    '[Products component] Change view mode',
    props<{ mode: ProductsView }>()
)

export const setViewFromStorageAction = createAction(
    '[Products component] Change view mode succes',
    props<{ mode: ProductsView }>()
)

export const setViewFromComponentAction = createAction(
    '[Products component] Change view mode default',
    props<{ mode: ProductsView }>()
)