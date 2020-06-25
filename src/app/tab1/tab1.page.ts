import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';

import  { UtilAppService } from '../util.app.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slideOpts = {
    initialSlide: 1,
    speed: 100,
    autoplay: true
  };

  items:any=[];
  message:any;
  
  cartitems:Array<any>;
  count:any;

  constructor(private router: Router, private asv: UtilAppService, private usv: UtilService,private callNumber: CallNumber) {}
  
  ngOnInit(){
    // this.usv.presentLoading()
    // this.asv.find({ridt:'',namt:''},{s:'controller',a:'findmobile',m:'l',d:'entities_fn',c:'orders'}).subscribe(rd => {
    //   this.usv.dismissloading()
    //   let out = rd;             
    //     if(out.success){
    //      this.items = out.sd
    //     } else{
    //       this.usv.displayToast(`<ion-icon name="close"></ion-icon> ${out[0].em}`,3000,true,'danger','top')
    //     }
    // },err => {
    //   this.usv.dismissloading()
    //   this.usv.displayToast(err,2000,'','danger','top')
    // })
    // this.cartitems = JSON.parse(localStorage.getItem('cart'));
    
    
    // this.count = this.cartitems ? this.cartitems.length : '';
  }
  route(id:any,nam:any,tel:any){
    
    localStorage.setItem('enm',JSON.stringify({eti:id,enm:nam,tel:tel}))
    this.router.navigate(['/items',{ id:id,nam:nam,tel:tel }])
  }

  gotocart(){
    this.router.navigate(['/cart'])
  }

  ionViewWillEnter(){  
    if(JSON.parse(localStorage.getItem('entities'))) return this.items = JSON.parse(localStorage.getItem('entities'));  
    this.usv.presentLoading()
    this.asv.find({ridt:'',namt:''},{s:'controller',a:'findmobile',m:'l',d:'entities_fn',c:'orders'}).subscribe(rd => {
      this.usv.dismissloading()
      let out = rd;             
      if(out.success){
        this.items = out.sd
        localStorage.setItem('entities',JSON.stringify(out.sd))
      } else{
        this.usv.displayToast(`<ion-icon name="close"></ion-icon> ${out[0].em}`,3000,true,'danger','top')
      }
    },err => {
      this.message = 'Application failed to load. Check you internet connection'
      this.usv.dismissloading()
      this.usv.displayToast(`${err.name} <br/> ${this.message}`,3000,'','danger','middle')
    })
    this.cartitems = JSON.parse(localStorage.getItem('cart'));

    this.count = this.cartitems ? this.cartitems.length : ''; 
  }

  call(number:string){
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}
