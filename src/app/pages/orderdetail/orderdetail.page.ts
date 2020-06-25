import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController,ToastController,ModalController,LoadingController, NavParams } from '@ionic/angular';


import { UtilService } from "../../util.service";
import { UtilAppService } from '../../util.app.service';


@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.page.html',
  styleUrls: ['./orderdetail.page.scss'],
})
export class OrderDetailPage implements OnInit {

    loading:any;
    items:any=[];
    orderno:any;
    checkout_step3_class='disable-checkout-step';
    status:any='STATUS'
    state:any = 'notpaid'
    subtotal:any = 0;

  constructor(
    public alertController: AlertController,
    public modalCtrl: ModalController,
    private route: ActivatedRoute, 
    private router: Router, 
    private usv:UtilService,
    private asv: UtilAppService,
    private params: NavParams,
    public loadingController: LoadingController,
    private toastctrl: ToastController) { }

  ngOnInit() {
    this.items = this.params.get('items');    
    this.orderno = this.items[0].ord;

    this.checkorder()

    this.compute()
    
  }

  checkorder(){

    this.usv.presentLoading();
    this.asv.find({ridt:'',namt:'',ordt:this.orderno,etin:''},{s:'controller',a:'findmobile',m:'l',d:'orderin_fn',c:'orders'})
    .subscribe(rd => {
      this.usv.dismissloading()
      let out = rd;
      if(out.success){
        let sts:any = out.sd
        this.state = sts[0].ost === '0' ? 'notpaid' : sts[0].ost === '1' ? 'paid' : sts[0].ost === '2' ? 'cooking' : sts[0].ost === '3' ? 'moved' : sts[0].ost === '4' ? 'delivered' : sts[0].ost === '5' ? 'closed' : 'canceled';
        this.checkout_step3_class = this.state;
        this.status = sts[0].osn;
      }
      else {

      }
      

    },err => {
      console.log(err);
      
      this.usv.dismissloading();
      this.usv.displayToast(err.name,2000,'','danger','top');
    })
  }

  compute(){
    let subtotal = 0;
    this.items.map(item => (subtotal += item.qty * item.prc));
    this.subtotal = subtotal;
  }
 
  closemodal(){
    this.modalCtrl.dismiss()
  }

  async acceptdelivery() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you want to CONFIRM DELIVERY?',
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
            this.asv.save({ordt:this.orderno},{s:'controller',a:'save2',m:'l',d:'update_delivery_fn',c:'orders'})
            .subscribe(rd => {
              this.usv.dismissloading()
                let out = rd;                
                if(out.success){
                  let sd:Array<[]> = out.sd
                  
                  this.usv.displayToast(`Your order has successfully been updated. Thank you.`,3000,true,'success','top')
                  this.checkorder()

                } else {
                                  
                    this.usv.displayToast(`${out[0].em}`,5000,true,'danger','top')
                }
            },err => {
              this.usv.dismissloading()
              this.usv.displayToast(err.name,2000,'','danger','top')
            })
          }
        }
      ]
    });
    
    await alert.present();
  }


}
