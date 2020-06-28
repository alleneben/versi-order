import { Component, OnInit, ViewChild } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {  } from '@angular/platform-browser-dynamic';


@Component({
  selector: 'app-pos-item',
  templateUrl: './pos-item.page.html',
  styleUrls: ['./pos-item.page.scss'],
})
export class PosItemPage implements OnInit {
  fm: FormGroup;
  @ViewChild("fileInput") fileInput:any;
  item:any = {namt:'',prcn:'',pict:'',imgt:''}
  
  constructor(private formBuilder:FormBuilder) {

    // this.fm = this.formBuilder.group({
    //   pict: new FormControl('',Validators.compose([Validators.required])),
    // })
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

      // this.fm.patchValue({ pict: imageData });
      this.item.pict = imageData;
    };
    let image = event.target.files[0];
    const newimage = new File([image], 'usr'+image.name+'.png', {type: image.type});

    this.item.imgt = newimage.name;
    
    reader.readAsDataURL(newimage);
  }

  renderimageonscreen() {
    return "url(" + this.item.pict + ")";
  }

  save(){
    console.log(this.item);
    
  }

}
