import { ProductsView } from "src/app/shared/models/products-view";
import { ViewMode } from "src/app/shared/models/view-mode";
import { ViewModeIcon } from "src/app/shared/models/view-mode-icon";

export const viewModes: ViewMode[] = [
    {
        mode: ProductsView.list,
        icon: ViewModeIcon.list
    },
    {
        mode: ProductsView.cards,
        icon: ViewModeIcon.cards
    }
]
