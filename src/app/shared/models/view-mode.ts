import { ProductsView } from "./products-view";
import { ViewModeIcon } from "./view-mode-icon";

export interface ViewMode {
    mode: ProductsView,
    icon: ViewModeIcon
}