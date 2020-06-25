import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  ud = JSON.parse(localStorage.getItem('ud')) ? JSON.parse(localStorage.getItem('ud')) : {namt:'',telt:'',plct:'',lmkt:''}
  readonly:boolean = true;
  btext:any = 'EDIT';
  constructor() {}

  ngOninit(){
    console.log(this.ud);
    
  }

  edit(){
    this.readonly = false;
    this.btext = 'SAVE';
  }

  save(){
    this.readonly = true;
    this.btext = 'EDIT';
    localStorage.setItem('ud',JSON.stringify(this.ud));
  }

}
