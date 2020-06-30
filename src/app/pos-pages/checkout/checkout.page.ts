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
  no_of_item:any = 'NO ITEM';
  total:any = 0.00;
  items:any = []
  constructor(private router: Router, private asv: UtilAppService, private usv: UtilService,private route: ActivatedRoute) { }

  ngOnInit() {
    let uid = this.route.snapshot.paramMap.get('uid');
    this.usv.setdata('uid',uid)
    this.usv.presentLoading()
    this.asv.find({ridn:'',namt:uid,etin:''},{s:'controller',a:'findmobile',m:'l',d:'items_all_fn',c:'orders'})
    .subscribe(rd => {
      this.usv.dismissloading()
      let out =rd;      
      if(out.success){
        this.items = out.sd['itm']
      } else {

      }
    }, err => {
      this.usv.dismissloading()
      this.usv.displayToast(err.name,3000,true,'danger','top')
    })
  }

  goto(){

    this.router.navigate(['/positem'])
  } 


}
