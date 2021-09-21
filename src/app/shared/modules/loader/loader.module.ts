import { NgModule } from '@angular/core';
import { LoaderComponent } from 'src/app/shared/modules/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [MatProgressSpinnerModule],
  declarations: [LoaderComponent],
  exports: [LoaderComponent]
})
export class LoaderModule {}
