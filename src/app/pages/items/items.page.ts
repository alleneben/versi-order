import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from "@ionic/angular";

import { DataModel } from 'src/app/data.model';
import { CategoriesPage } from '../categories/categories.page';
import  { UtilService } from '../../util.service';
@Component({
  selector: 'app-items',
  templateUrl: 'items.page.html',
  styleUrls: ['items.page.scss']
})
export class ItemsPage {
  slideOpts = {
    initialSlide: 1,
    speed: 100,
    autoplay: false
  };

  allitems:Array<DataModel>=JSON.parse(localStorage.getItem('allitems'))['itm'];
  items:any;
  name:any;
  cartitems:Array<any>;
  count:any;
  searchTerm: string = '';
  searchitems=[]

  constructor(private router: Router, private aroute: ActivatedRoute,private modalCtrl: ModalController, private navCtrl: NavController, private usv: UtilService) {}
  
  ngOnInit(){

    let itemid = this.aroute.snapshot.paramMap.get('id');
    this.name = this.aroute.snapshot.paramMap.get('nam');

    this.items = this.allitems.filter(rd => rd.eti === itemid);
    this.searchitems = this.allitems.filter(rd => rd.eti === itemid);

    this.cartitems = JSON.parse(localStorage.getItem('cart'));
    
    
    this.count = this.cartitems ? this.cartitems.length : '';
  }

  onSearchInput($event){
    this.searchTerm = $event.detail.value;
    this.setFilteredItems();
  }
  
  setFilteredItems(){
    this.searchitems = this.filterItems(this.searchTerm);
    if(this.searchitems.length < 1) return this.usv.displayToast(`<ion-icon name="remove-circle"></ion-icon>No items found for ${this.searchTerm}`,3000,true,'danger','center')
    
  }


  filterItems(searchTerm:any){
       
    return this.items.filter((itemdb) => {
      return itemdb.nam.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  route(id:any){
    this.router.navigate(['/itemdetail',{ id:id }])
  }

  gotocart(){
    this.router.navigate(['/cart'])
  }
  async gotocategories(){
    const modal  = await this.modalCtrl.create({component: CategoriesPage})
    await modal.present()


    const { data } = await modal.onWillDismiss()
    
    if(data.data === 'null') return this.searchitems = this.items;
    this.searchitems = this.items.filter((item) => item.cti === data.data)
  }
}
