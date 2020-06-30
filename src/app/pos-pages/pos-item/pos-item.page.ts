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

    console.log(this.item);
    
    this.usv.presentLoading()
    this.asv.save(this.item,{s:'controller',a:'save2',m:'l',d:'newitem_fn',c:'orders'})
    .subscribe(rd => {
      let out = rd;

      if(out.success){

      } else {

      }
    })
  }

}
