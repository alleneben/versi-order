import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosItemPage } from './pos-item.page';

const routes: Routes = [
  {
    path: '',
    component: PosItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosItemPageRoutingModule {}
