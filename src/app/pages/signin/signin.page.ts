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
      this.usv.presentLoading() 
      this.asv.signup(this.signinform.value,{s:'controller',a:'auth',m:'l',d:'security_login',c:'orders'}).subscribe( rd => {
        this.usv.dismissloading()
        let out = rd;        
        if(out.success){
          this.router.navigate(['/checkout',{uid:this.signinform.value.emlt}])
        } else{
          this.usv.displayToast(`${out[0].em}`,3000,true,'danger','top')
        }
      },err=> {
        this.usv.dismissloading()
        this.usv.displayToast(err,2000,'','danger','top')
      })
    } else{
      this.usv.displayToast(`All fields are required`,3000,true,'danger','top')
    }
    
  }

  register(){
    this.router.navigate(['/signup'])
  }

}
