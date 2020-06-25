import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilAppService } from './util.app.service';
import { UtilService } from './util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private asv: UtilAppService,
    private usv: UtilService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      if(!this.detectMob()){
        this.usv.displayToast(`<ion-icon name="close"></ion-icon> This application is best viewed on a mobile phone. Preferably use Google Chrome Browser`,10000,true,'danger','top')
      }
      this.asv.find({ridn:'',namt:'',etin:''},{s:'controller',a:'findmobile',m:'l',d:'items_all_fn',c:'orders'}).subscribe(rd => {
        let out = rd;  
                  
        if(out.success){
          let item = {}
          out.sd['itm'].map(rm => {
            item = rm;
            item['inCart'] = false;
            item['count'] = 1;
            item['total'] = 1
            item['like'] = false    
            
          })
          
          localStorage.setItem('allitems',JSON.stringify(out.sd))          
        } else {
          this.usv.displayToast(`<ion-icon name="close"></ion-icon> ${out[0].em}`,3000,true,'danger','top')
        }
        
      },err=>{
        if (localStorage.getItem('allitems') ) {
          
        } else {

          this.usv.displayToast(err.name,2000,'','danger','top')
        }
      })

      if (JSON.parse(localStorage.getItem('cart'))) {
        return;
      } else {
        localStorage.setItem('cart',JSON.stringify([]))
      }
    });
  }


  detectMob() {
    return window.innerWidth <= 800;
  }

}
