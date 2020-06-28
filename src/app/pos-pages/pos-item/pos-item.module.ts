import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PosItemPageRoutingModule } from './pos-item-routing.module';

import { PosItemPage } from './pos-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PosItemPageRoutingModule
  ],
  declarations: [PosItemPage]
})
export class PosItemPageModule {}
