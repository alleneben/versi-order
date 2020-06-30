import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { UtilService } from "../../util.service";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.page.html',
  styleUrls: ['./itemdetail.page.scss'],
})
export class ItemdetailPage implements OnInit {
  like:boolean = false;
  items=JSON.parse(localStorage.getItem('allitems'))['itm']
  enm = JSON.parse(localStorage.getItem('enm'));
  item:any;
  cartitems:Array<any>;
  count:any;
  show:boolean = false


  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private usv:UtilService,
    private toastctrl: ToastController,
    private socialSharing: SocialSharing,
    private callNumber: CallNumber
    ) { }

  ngOnInit() {
    this.cartitems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
    
    let itemid = this.route.snapshot.paramMap.get('id');

    
    
    
    this.cartitems.find(item => item.rid === parseInt(itemid)) === undefined ?
    this.item = this.items.find(item => item.rid === itemid) :
    this.cartitems.find(item => item.rid === parseInt(itemid))

    
    
    this.count = this.cartitems ? this.cartitems.length : '';
    
  }

  togglelike(){
    this.like = !this.like
  }

  addtocart(object:any){
    if(!this.checkrestaurant(object,this.enm)) return  this.displayToast(`<ion-icon name="checkmark"></ion-icon> Your cart has meals from ${this.enm.enm}. You cannot order meals from ${object.enm} at the same time. Please you need to place the orders separately or remove all items from the cart and place a new order from ${object.enm}. Thank you.`,20000,true,'danger','top');

    let temproducts = this.items
      
    const selecteditem = temproducts.find(item => item.rid === object.rid);

    let index = temproducts.indexOf(selecteditem)
    let product = temproducts[index];
    
    
    product.inCart=true
    product.count = 1;
    product.total = product.prs;
    this.item = product;

    if (this.cartitems === null) {
      this.cartitems = []
    }
    this.cartitems.push(this.item)
    this.displayToast(`<ion-icon name="checkmark"></ion-icon> ${this.item.nam} has been added to cart`,3000,true,'success','top')
    
    this.count = this.cartitems.length;
    localStorage.setItem('cart',JSON.stringify(this.cartitems))
    
  }

  gotocart(){
    this.router.navigate(['/cart'])
  }
  checkrestaurant(item:any,enm:any){
    if(enm && (item.eti != enm.eti)){
      return false
    } else {

    }
    return true;
  }

  share(){
    
    let options = {
      // url: `http://worktimer.kitchencarelimited.com/server/img/${this.item.img}`,
      message: `Hey, I found this meal, ${this.item.nam} at ${this.enm.enm} Its only GHC ${this.item.prc}. Try it out`,
    }
    this.socialSharing.shareWithOptions(options);
  }

  call(){
    this.callNumber.callNumber(this.enm.tel, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  async displayToast(msg:any,dur:any,anm:any,cls:any,pos:any) {
    let toast = await this.toastctrl.create({
      message: msg,
      duration: dur,
      animated: anm,
      // showCloseButton: true,
      // closeButtonText: "OK",
      cssClass: cls,
      position: pos,
    });
    toast.present();
  }
}
