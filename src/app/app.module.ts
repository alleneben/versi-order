import { NgModule,  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { CheckoutPageModule } from "../app/pages/checkout/checkout.module";
import { CategoriesPageModule } from "../app/pages/categories/categories.module";
import { OrderDetailPageModule } from '../app/pages/orderdetail/orderdetail.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilAppService } from './util.app.service';
import { UtilService } from './util.service';
import { APP_CONFIG, BaseAppConfig } from "./util.app.config";

@NgModule({
  declarations: [AppComponent,],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,CheckoutPageModule,CategoriesPageModule,OrderDetailPageModule,HttpClientModule,ReactiveFormsModule],
  providers: [
    UtilAppService,
    UtilService,
    StatusBar,
    SplashScreen,
    CallNumber,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: APP_CONFIG, useValue: BaseAppConfig}
  ],
  schemas: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
