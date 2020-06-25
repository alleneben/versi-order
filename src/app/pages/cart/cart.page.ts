import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from "@ionic/angular";
import { CallNumber } from '@ionic-native/call-number/ngx';

import { CheckoutPage } from "../checkout/checkout.page";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  items = JSON.parse(localStorage.getItem('allitems'))['itm'];
  cartitems:Array<any> = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
  enm = JSON.parse(localStorage.getItem('enm'));
  emptycart:boolean=false;
  public grandtotal = 0.00;
  public total = 0.00;
  public subtotal = 0.00;
  public shipping = 0.00;
  like:boolean = false;

  constructor(private modalCtrl: ModalController, private navCtrl: NavController,private callNumber: CallNumber) { }

  ngOnInit() {
    
    this.emptycart = this.cartitems.length > 0 ? true : false;
    this.computeitems()
  }
  togglelike(){
    this.like = !this.like
  }
  removeitem = (id:any) => {

    let tempcart = this.cartitems;
    tempcart = tempcart.filter(item => item.rid !== id);

    this.cartitems = tempcart;

    this.computeitems()
    if(this.cartitems.length < 1) {
      this.emptycart = false 
      localStorage.removeItem('enm')
    };
    this.items.find(item => item.inCart = false);
    
    localStorage.setItem('cart',JSON.stringify(this.cartitems));
  }

  onchange($e:any,l){
    this.computeitems()
    
  }
  qtyfn(id:any,type:any){
    
    let tempcart = this.cartitems
    const selecteditem = tempcart.find(item => item.rid === id);
    
    const index = tempcart.indexOf(selecteditem);
    const item = tempcart[index];

    if(type === 'increase'){
        item.count = item.count + 1;
        this.computeitems()
    } else {
        item.count = item.count - 1;
        this.computeitems()
        if(item.count === 0) return this.removeitem(id);
    }
    this.cartitems = tempcart;
    localStorage.setItem('cart',JSON.stringify(this.cartitems));
  }

  computeitems = () => {
    let subtotal = 0;
    this.cartitems.map(item => (subtotal += item.count * item.prc))
    
    this.subtotal = subtotal;
    this.shipping = 0.00;
    this.total = this.shipping + this.subtotal;
    this.grandtotal = this.total;
  }

  async gotocheckout(){
    const modal  = await this.modalCtrl.create({component: CheckoutPage})

    return await modal.present()
  }

  popcart(){
    this.navCtrl.pop()
  }
  call(){
    this.callNumber.callNumber(this.enm.tel, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
