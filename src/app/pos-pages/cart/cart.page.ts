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
  no_of_items:any = 'NO ITEM';
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

    this.no_of_items = this.cartitems.length;
    this.disabled = this.no_of_items > 0 ? false : true; 
    this.total = this.usv.calc(this.cartitems)
  }
  increase(item:any){

  }
  decrease(item:any){

  }
  delete(item:any){
    
  }
  navigate(path:any){    
    this.router.navigate([path])
  } 
}
