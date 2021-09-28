import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from 'src/app/shared/modules/header/header.component';
import { LangSelectorComponent } from 'src/app/shared/modules/header/components/lang-selector/lang-selector.component';
import { LangSelectorOptionComponent } from 'src/app/shared/modules/header/components/lang-selector-option/lang-selector-option.component';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { SearchOptionsPipe } from 'src/app/products/pipes/search-options.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    HeaderComponent,
    LangSelectorComponent,
    LangSelectorOptionComponent,
    SearchComponent,
    SearchOptionsPipe
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
