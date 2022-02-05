import { ProductsView } from "src/app/shared/models/products-view";
import { ViewModeIcon } from "src/app/shared/models/view-mode-icon";

export interface ViewMode {
    mode: ProductsView,
    icon: ViewModeIcon,
    label: string;
}