import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from 'src/app/shared/modules/header/header.component';
import { LangSelectorComponent } from 'src/app/shared/modules/header/components/lang-selector/lang-selector.component';
import { LangSelectorOptionComponent } from 'src/app/shared/modules/header/components/lang-selector-option/lang-selector-option.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HeaderComponent,
    LangSelectorComponent,
    LangSelectorOptionComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
