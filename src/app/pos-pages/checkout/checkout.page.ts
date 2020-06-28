import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  no_of_item:any = 'NO ITEM';
  total:any = 0.00;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goto(){

    this.router.navigate(['/positem'])
  }


}
