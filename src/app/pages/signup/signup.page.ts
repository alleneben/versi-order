import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { UtilAppService } from 'src/app/util.app.service';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupform: FormGroup;
  constructor(private router: Router,private asv: UtilAppService, private usv: UtilService, private formBuilder:FormBuilder) {
    
    this.signupform = this.formBuilder.group({
      nsht: new FormControl('',Validators.compose([Validators.required])),
      loct: new FormControl('',Validators.compose([Validators.required])),
      telt: new FormControl('',Validators.compose([Validators.required])),
      emlt: new FormControl('',Validators.compose([Validators.required])),
      pwdt: new FormControl('',Validators.compose([Validators.required])),
      cwdt: new FormControl('',Validators.compose([Validators.required])),
    })
  }

  ngOnInit() {
    this.asv.startbase().subscribe(rd=>{
      // console.log(rd);
    })
  }
  signup(){
    if(this.signupform.valid){
      this.asv.signup(this.signupform.value,{s:'controller',a:'signup',m:'l',d:'signup_dv'}).subscribe( rd => {
        let out = rd;        
        if(out.success){
          this.usv.displayToast(`<ion-icon name="close"></ion-icon> Account created successfully`,3000,true,'success','top')
          this.router.navigate(['/signin'])
        } else{
          this.usv.displayToast(`<ion-icon name="close"></ion-icon> ${out[0].em}`,3000,true,'danger','top')
        }
      },err=> this.usv.displayToast(err,2000,'','danger','top'))
    } else{
      this.usv.displayToast(`<ion-icon name="close"></ion-icon> All fields are required`,3000,true,'danger','top')
    }
    
  }

}
