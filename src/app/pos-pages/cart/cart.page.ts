import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



import { UtilService } from '../../util.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  items:any=[]
  no_of_items:any;
  total:any = 0.00;
  item:any
  cartitems:Array<any> = [];
  disabled:boolean = true;
  constructor(private usv: UtilService,private router: Router) { }

  ngOnInit() {
    
  }
  
  ionViewWillEnter(){
    this.getitems()
  }

  async getitems(){
    this.usv.presentLoading()
    this.cartitems = await this.usv.getstoreddata('cart')
    this.usv.dismissloading()
    
    console.log(this.cartitems);
    
    this.no_of_items = 0
    this.cartitems.map((item) => {
      this.no_of_items = this.no_of_items + item.count
    });
    this.no_of_items = this.cartitems.length === 0 ? 'NO ITEM' : this.no_of_items;
    this.disabled = this.no_of_items > 0 ? false : true; 
    this.total = this.usv.calc(this.cartitems)
  }

  qtyfn(id:any,type:any){
    
    let tempcart = this.cartitems
    const selecteditem = tempcart.find(item => item.rid === id);
    
    const index = tempcart.indexOf(selecteditem);
    const item = tempcart[index];

    if(type === 'increase'){
        item.count = item.count + 1;
        this.total = this.usv.calc(this.cartitems)
    } else {
        item.count = item.count - 1;
        this.total = this.usv.calc(this.cartitems)
        if(item.count === 0) return this.removeitem(id);
    }
    this.cartitems = tempcart;
    
    this.usv.setdata('cart',this.cartitems)
  }

  removeitem(id:any){
    let tempcart = this.cartitems;
    tempcart = tempcart.filter(item => item.rid !== id);

    this.cartitems = tempcart;
    this.usv.setdata('cart',this.cartitems)

    this.no_of_items = 0
    this.cartitems.map((item) => {
      this.no_of_items = this.no_of_items + item.count
    });

    this.no_of_items = this.cartitems.length === 0 ? 'NO ITEM' : this.no_of_items;
    this.disabled = this.no_of_items > 0 ? false : true; 
    this.total = this.usv.calc(this.cartitems)
    
    if(this.cartitems.length < 1) {
      // this.emptycart = false 
      // localStorage.removeItem('enm')
    };
    this.items.find(item => item.inCart = false);
  }
  navigate(path:any){    
    this.router.navigate([path])
  } 
}
