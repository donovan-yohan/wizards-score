import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalPlayersPage } from './local-players';

@NgModule({
  declarations: [
    LocalPlayersPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalPlayersPage),
  ],
})
export class LocalPlayersPageModule {}
