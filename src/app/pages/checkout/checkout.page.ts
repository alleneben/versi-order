import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController,ModalController,LoadingController } from '@ionic/angular';


import { UtilService } from "../../util.service";
import { UtilAppService } from '../../util.app.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
    step_button_text='PROCEED TO PAYMENT';
    checkout_step2_class='disable-checkout-step';
    checkout_step3_class='disable-checkout-step';
    ud = JSON.parse(localStorage.getItem('ud')) ? JSON.parse(localStorage.getItem('ud')) : {namt:'',telt:'',plct:'',lmkt:''}
    finish:boolean = false;
    cartitems:Array<any> = JSON.parse(localStorage.getItem('cart'));
    emptycart:boolean=false;
    public grandtotal = 0.00;
    public total = 0.00;
    public subtotal = 0.00;
    public shipping = 0.00;
    charge:number=0.00
    loading:any;
    deliverymode:any;
    deliverymodename:any;
    locations=[]
    town:any;
  constructor(
    public alertController: AlertController,
    public modalCtrl: ModalController,
    private router: Router, 
    private usv:UtilService,
    private asv: UtilAppService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.locations = JSON.parse(localStorage.getItem('allitems')) ? JSON.parse(localStorage.getItem('allitems'))['loc'].filter((loc) => loc.eti === this.cartitems[0]['eti']) : [];
    this.computeitems()
  }

  next(){

    if(this.ud.namt === '' || this.ud.telt === '' || this.ud.plct === '' || this.ud.lmkt === '' || this.deliverymode === undefined || (this.deliverymode === '1' && this.shipping == 0)) return   this.usv.displayToast(`<ion-icon name="close"></ion-icon> All fields are required`,5000,true,'danger','top')

    if(this.step_button_text === 'PROCEED TO PAYMENT'){
        this.step_button_text = 'PROCEED TO SUMMARY';
        this.checkout_step2_class = 'checkout-step';
        localStorage.setItem('ud',JSON.stringify(this.ud));
        

    } else if(this.step_button_text = 'PROCEED TO SUMMARY'){
    this.step_button_text = 'CONFIRM';
    this.checkout_step3_class = 'checkout-step';
    this.finish = true;
    }
  }
  backtodeliverytab(){
      this.step_button_text = 'PROCEED TO PAYMENT';
      this.checkout_step2_class = 'disable-checkout-step';
      this.checkout_step3_class='disable-checkout-step';
      this.finish = false;
  }
  confirm(){

      if(this.step_button_text === 'CONFIRM'){

        this.presentAlertConfirm()
      }
  }
  computeitems = () => {
    let subtotal = 0.00;
    this.cartitems.map(item => (subtotal += item.count * item.prc))
    
    this.subtotal = subtotal;
    // this.shipping = 0.00;
    this.total = this.shipping + this.subtotal;
    this.grandtotal = this.total;
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you want to PROCCEED?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.usv.presentLoading()            
            
            this.asv.save(this.ud,{s:'controller',a:'savemobile',m:'l',d:JSON.stringify({df:'write_order',ord:this.cartitems,dmi:this.deliverymode}),c:'orders'}).subscribe(rd => {
                this.usv.dismissloading()
                let out = rd;                
                if(out.success){
                  let sd:Array<[]> = out.sd
                  this.closemodal()
                  this.usv.displayToast(`<ion-icon name="close"></ion-icon>Your orderno is ${sd[0]['ord']}. Please make mobile money payments to ${sd[0]['enm']} on ${sd[0]['ct1']} before your order is processed. Thank you.`,5000,true,'success','top')
                  localStorage.removeItem('cart')

                  // localStorage.setItem('ord',JSON.stringify(sd))
                  this.saveorders(out.sd)
                  this.router.navigate(['/'])
                } else {
                    this.usv.displayToast(`<ion-icon name="close"></ion-icon> ${out[0].em}`,5000,true,'danger','top')
                }

            },err => {
                this.usv.dismissloading()
                this.usv.displayToast(err.statusText,2000,'','danger','top')
            })
          }
        }
      ]
    });
    
    await alert.present();
  }
  closemodal(){
    this.modalCtrl.dismiss()
  }

  saveorders(neworder:any){
    let ord:any = JSON.parse(localStorage.getItem('ord')) ? JSON.parse(localStorage.getItem('ord')) : [];
    ord.push(neworder)
    localStorage.setItem('ord',JSON.stringify(ord))
  }
  devmode($event){
    
    this.deliverymode = $event.detail.value;
    this.deliverymodename = $event.detail.value === '1' ? 'BY DELIVERY SERVICE' : $event.detail.value === '2' ? 'PICK UP' : 'NO DELIVERY METHOD SPECIFIED';
    if($event.detail.value === '2') {
      this.shipping = 0.00
      this.town = '';
      this.ud.plct = 'N/A'
    };
    this.computeitems()
  }
  onChange($event){
      let loc = this.locations.filter((loc) => loc.rid === $event.detail.value);
      // this.shipping = parseFloat(loc[0].rid); 
      this.town = loc[0].nam;
      this.ud.plct = ''
      this.shipping = parseFloat(loc[0].chg);
      this.computeitems()
         
  }
}
