import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from 'src/app/shared/modules/header/header.component';
import { LangSelectorComponent } from 'src/app/shared/modules/header/components/lang-selector/lang-selector.component';
import { LangSelectorOptionComponent } from 'src/app/shared/modules/header/components/lang-selector-option/lang-selector-option.component';
import { SearchComponent } from 'src/app/products/components/search/search.component';
import { SearchOptionsPipe } from 'src/app/products/pipes/search-options.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    LangSelectorComponent,
    LangSelectorOptionComponent,
    SearchOptionsPipe
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
