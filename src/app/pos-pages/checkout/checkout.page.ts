import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilAppService } from '../../util.app.service';
import { UtilService } from '../../util.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  no_of_items:any = 'NO ITEM';
  total:any = 0.00;
  items:any = [];
  item:any
  cartitems:Array<any> = [];
  disabled:boolean = true;
  
  constructor(private router: Router, private asv: UtilAppService, private usv: UtilService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.init()
  }

  ionViewWillEnter(){
    this.getcart()
    this.init()
  }

  init(){
    let uid = this.route.snapshot.paramMap.get('uid');
    this.usv.setdata('uid',uid)
    this.usv.presentLoading()
    this.asv.find({ridn:'',namt:uid,etin:''},{s:'controller',a:'findmobile',m:'l',d:'items_all_fn',c:'orders'})
    .subscribe(rd => {
      this.usv.dismissloading()
      let out =rd;      
      if(out.success){
        let item = {}        
        out.sd['itm'].map(rm => {
          item = rm;
          item['inCart'] = false;
          item['count'] = 1;
          item['total'] = 1
          item['like'] = false 
        })

        this.items = out.sd['itm']
      } else {
        this.usv.displayToast(out[0].em,3000,true,'danger','top')
      }
    }, err => {
      this.usv.dismissloading()
      this.usv.displayToast(err.name,3000,true,'danger','top')
    })
  }

  async additem(object:any){
    let temproducts = this.items
      
    const selecteditem = temproducts.find(item => item.rid === object.rid);

    let index = temproducts.indexOf(selecteditem)
    let product = temproducts[index];
    
    
    product.inCart=true
    product.count = 1;
    product.total = product.prs;
    this.item = product;

    this.cartitems = await this.usv.getstoreddata('cart')    
        
    if(this.usv.containsObject(this.item,this.cartitems)){
      let item  = this.cartitems.find(item => item.rid === this.item.rid);
      item.count = item.count + 1   
    } else {
      this.cartitems.push(this.item)
    }
  
    
    this.usv.displayToast(`${this.item.nam} has been added to cart <ion-icon name="checkmark"></ion-icon>`,3000,true,'success','top')
    this.no_of_items = 0;
    this.cartitems.map((item) => {
      this.no_of_items = this.no_of_items + item.count
    });
    this.disabled = this.no_of_items > 0 ? false : true; 
    this.usv.setdata('cart',this.cartitems)
    this.total = this.usv.calc(this.cartitems)  
  }

  async getcart(){
    this.cartitems = await this.usv.getstoreddata('cart')
    this.no_of_items = 0;
    this.cartitems.map((item) => {
      this.no_of_items = this.no_of_items + item.count
    });

    this.no_of_items = this.cartitems.length === 0 ? 'NO ITEM' : this.no_of_items;
    this.disabled = this.no_of_items > 0 ? false : true; 
    this.total = this.usv.calc(this.cartitems)
  }
  navigate(path:any){    
    this.router.navigate([path])
  }

}
