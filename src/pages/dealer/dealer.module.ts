import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealerPage } from './dealer';

@NgModule({
  declarations: [
    DealerPage,
  ],
  imports: [
    IonicPageModule.forChild(DealerPage),
  ],
})
export class DealerPageModule {}
