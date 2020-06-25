import { Injectable } from '@angular/core';
import { ToastController,LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  loading:boolean = false;
  constructor(private toastctrl: ToastController,public loadingController: LoadingController) { }


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

  async presentLoading():Promise<any> {
    this.loading = true;
    return await this.loadingController.create({
      message: 'Please wait ...',
      spinner: 'circles' 
    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
        if (!this.loading) {
          a.dismiss().then(() => console.log('abort laoding'));
        }
        // setTimeout(()=>{
        //   if(this.loading){
        //     a.dismiss().then(() => console.log('it too a long time to load'))
        //   }

        // },10000)
      });
    });
  }
  async dismissloading(){
    this.loading = false;
    return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));

  }
}
