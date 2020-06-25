import { Injectable, Inject } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import {APP_CONFIG, AppConfig} from "./util.app.config";
import { DataModel } from "./data.model";

@Injectable({
  providedIn: 'root'
})
export class UtilAppService {

  constructor(@Inject(APP_CONFIG) private config:AppConfig,private http: HttpClient,) { }

  startbase(): Observable<DataModel> {
        let fm = new FormData()
        fm.append('s','session')
        fm.append('a','sessioncreate')
        fm.append('m','l')
      return this.http.post<DataModel>(this.config.apiBase,fm,{});
  }

  signup(data:any,bp:any): Observable<DataModel> {
    let bd = this.formatpost(data,bp);
    return this.http.post<DataModel>(this.config.apiBase,bd,{});
  }

  find(data:any,bp:any): Observable<DataModel> {
    let bd = this.formatpost(data,bp);
    return this.http.post<DataModel>(this.config.apiBase,bd,{})
  }


  save(data:any,bp:any): Observable<DataModel> {
    let bd = this.formatpost(data,bp);
    return this.http.post<DataModel>(this.config.apiBase,bd,{})
  }
  
  formatpost(data:any,bp:any){
    var fm = new FormData(),props={};
    for (var key in data) {   
      // console.log(key);
       
      if(key === 'sdt' || key === 'edt'){
        // var dt = bp[key].toISOString();
        // fm.append(key,dt);
      } else {      
        fm.append(key,data[key]);
        props[key]= key.substr(key.length-1);
      }
    }
  
    fm.append("s", bp.s);fm.append("a", bp.a);fm.append('m',bp.m);fm.append('d',bp.d);
    fm.append('dd',JSON.stringify(props));fm.append('c',bp.c);
    return fm;
  }
  
}
