import { Component, OnInit, ViewChild } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { UtilAppService } from '../../util.app.service';
import { UtilService } from '../../util.service';

@Component({
  selector: 'app-pos-item',
  templateUrl: './pos-item.page.html',
  styleUrls: ['./pos-item.page.scss'],
})
export class PosItemPage implements OnInit {
  fm: FormGroup;
  @ViewChild("fileInput") fileInput:any;
  item:any = {namt:'',prcn:'',cstn:'',imgt:''}
  pic:''
  
  constructor(private formBuilder:FormBuilder,private usv: UtilService, private asv: UtilAppService) {

  }

  ngOnInit() {
  }
  
  getimage(){
    this.fileInput.nativeElement.click();
  }
  processwebimage(event:any) {
    let reader = new FileReader();
    reader.onload = readerEvent => {
      let imageData = (readerEvent.target as any).result;
      this.pic = imageData;
    };
    let image = event.target.files[0];
    const newimage = new File([image], 'usr'+image.name, {type: image.type});

    this.item.imgt = newimage.name;
    
    reader.readAsDataURL(newimage);
  }

  renderimageonscreen() {
    return "url(" + this.pic + ")";
  }

  async save(){
    if(this.item.namt == '' || this.item.prcn == '') return this.usv.displayToast('Name or Price fields cannot be blank',3000,true,'danger','top')

    this.item.emlt = await this.usv.getstoreddata('uid')
    
    this.usv.presentLoading()
    this.asv.save(this.item,{s:'controller',a:'save2',m:'l',d:'new_mobile_item_add',c:'orders'})
    .subscribe(rd => {
      this.usv.dismissloading()
      let out = rd;
      if(out.success){
        this.item = {namt:'',prcn:'',cstn:'',imgt:''}
        this.usv.displayToast('Item added successfully',3000,true,'success','top')
      } else {
        this.usv.displayToast(out[0].em,3000,true,'danger','top')
      }
    },err => {
      this.usv.dismissloading()
      this.usv.displayToast(err.name,3000,true,'danger','top')
    })
  }

}
