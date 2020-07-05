import { Component, OnInit } from '@angular/core';

import { UtilService } from '../../util.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  amount = 0;
  total = 0;
  precision = 2;
  bal = 0;
  show_bal:boolean;
  show_options:boolean;

  constructor(private usv: UtilService) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.show_bal = false;
    let cart = await this.usv.getstoreddata('cart')
    this.total = this.usv.calc(cart)    
  }
  amountChanged(event: number) {
    this.show_bal = true
    this.amount = event;
    this.bal = this.amount/100 - this.total;
  }
  focus(event:boolean){
    this.show_options = event;
  }
}
