import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DataModel } from '../../data.model';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
    categories:Array<DataModel>=JSON.parse(localStorage.getItem('allitems'))['cat'];
    cti:any;
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {

  }

 
  closemodal(){
    this.modalCtrl.dismiss({'data': this.cti ? this.cti : 'null'})
  }

  changecategory($event){
    this.cti = $event.detail.value    
    this.closemodal()
    
    
  }
  onChange($event){
      this.closemodal()   
  }
}
