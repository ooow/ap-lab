import { Action, createReducer, on } from "@ngrx/store";
import { ProductsView } from "../../models/products-view";
import * as ProductsViewActions from "./products-view.actions";

export const initialState: ProductsView = JSON.parse(localStorage.getItem("view-mode")) as ProductsView || "list" as ProductsView;

const productsViewReducer = createReducer(
    initialState,
    on(ProductsViewActions.changeViewAction, (state: string, { mode }) => mode),
    on(ProductsViewActions.setViewFromStorageAction, (state: string, { mode }) => mode),
    on(ProductsViewActions.setViewFromComponentAction, (state: string, { mode }) => mode)
);

export function reducer(state: ProductsView, action: Action): string {
    return productsViewReducer(state, action);
}