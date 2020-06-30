import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', loadChildren: './pages/signin/signin.module#SigninPageModule' },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'positem', loadChildren: './pos-pages/pos-item/pos-item.module#PosItemPageModule' },
  { path: 'checkout', loadChildren: './pos-pages/checkout/checkout.module#CheckoutPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  {
    path: 'pos-item',
    loadChildren: () => import('./pos-pages/pos-item/pos-item.module').then( m => m.PosItemPageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
