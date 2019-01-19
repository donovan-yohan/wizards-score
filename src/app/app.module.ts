import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { GamePage } from '../pages/game/game';
import { HomePage } from '../pages/home/home';
import { LocalPlayersPage } from '../pages/local-players/local-players';
import { DealerPage } from '../pages/dealer/dealer';
import { OrderPage } from '../pages/order/order';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    HomePage,
    LocalPlayersPage,
    DealerPage,
    OrderPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    HomePage,
    LocalPlayersPage,
    DealerPage,
    OrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatabaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
