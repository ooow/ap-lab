import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { ProductsView } from "src/app/shared/models/products-view";
import { PersistenceService } from "src/app/shared/services/persistence.service";
import {
    changeViewAction,
    setViewFromStorageAction,
    setViewFromComponentAction
} from "src/app/shared/store/products-view/products-view.actions";

@Injectable()
export class ProductsViewEffect {
    changeView$ = createEffect(() => this.actions$.pipe(
        ofType(changeViewAction),
        switchMap(({ mode }) => {
            const modeFromComponent = mode;
            return this.persistenceService.set<ProductsView>("view-mode", mode).pipe(
                map((mode) => setViewFromStorageAction({ mode })),
                catchError((_) => of(setViewFromComponentAction({ mode: modeFromComponent })))
            )
        })
    ))

    constructor (
        private actions$: Actions,
        private persistenceService: PersistenceService
    ){}
}
