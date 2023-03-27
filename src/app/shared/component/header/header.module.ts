import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from 'src/app/shared/component/header/header.component';
import {LangSelectorComponent} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import {MatInputModule} from '@angular/material/input';
import {SearchComponent} from 'src/app/shared/component/header/search/search.component';
import {SearchOptionsPipe} from 'src/app/products_view/pipe/search_options_pipe';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ProductsViewModule} from '../../../products_view/products_view_module';

@NgModule({
  declarations: [
    HeaderComponent, LangSelectorComponent, SearchComponent, SearchOptionsPipe,
  ], exports  : [HeaderComponent], imports: [
    CommonModule,
    ProductsViewModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class HeaderModule {}
