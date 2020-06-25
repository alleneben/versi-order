import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { UtilAppService } from 'src/app/util.app.service';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signinform: FormGroup;
  constructor(private router: Router,private asv: UtilAppService, private usv: UtilService, private formBuilder:FormBuilder) {
    
    this.signinform = this.formBuilder.group({
      emlt: new FormControl('',Validators.compose([Validators.required])),
      pwdt: new FormControl('',Validators.compose([Validators.required])),
    })
  }

  ngOnInit() {
    this.asv.startbase().subscribe(rd=>{
      console.log(rd);
    })
  }
  signin(){
    if(this.signinform.valid){
      this.asv.signup(this.signinform.value,{s:'controller',a:'auth',m:'l',d:'security_login'}).subscribe( rd => {
        let out = rd;        
        if(out.success){
          this.usv.displayToast(`<ion-icon name="close"></ion-icon> Login successful`,3000,true,'success','top')
          this.router.navigate(['/tabs'])
        } else{
          this.usv.displayToast(`<ion-icon name="close"></ion-icon> ${out[0].em}`,3000,true,'danger','top')
        }
      },err=> this.usv.displayToast(err,2000,'','danger','top'))
    } else{
      this.usv.displayToast(`<ion-icon name="close"></ion-icon> All fields are required`,3000,true,'danger','top')
    }
    
  }

}
