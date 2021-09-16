import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lang } from './shared/models/lang';
import * as LangActions from './shared/store/lang/lang.actions';
import * as LangSelectors from './shared/store/lang/lang.selectors';

@Component({
  selector: 'tk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly lang$: Observable<Lang> = this.store.select(
    LangSelectors.langSelector
  );
  readonly LangActions = LangActions;

  constructor(readonly store: Store) {}
}
