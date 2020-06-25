import { Component } from '@angular/core';
import { ModalController } from "@ionic/angular";

import { OrderDetailPage } from '../pages/orderdetail/orderdetail.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  ord:any=[]; 
  constructor(private modalCtrl: ModalController) {}

  ngOnInit(){
       
  }
  ionViewWillEnter(){
    this.ord = JSON.parse(localStorage.getItem('ord')) ? JSON.parse(localStorage.getItem('ord')) : [];
  }

  async gotocheckout(item:any){
    const modal  = await this.modalCtrl.create({component: OrderDetailPage,componentProps:{'items':item}})

    return await modal.present()
  }
}
