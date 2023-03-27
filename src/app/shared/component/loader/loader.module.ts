import {NgModule} from '@angular/core';
import {LoaderComponent} from 'src/app/shared/component/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports     : [MatProgressSpinnerModule],
  declarations: [LoaderComponent],
  exports     : [LoaderComponent],
})
export class LoaderModule {}
