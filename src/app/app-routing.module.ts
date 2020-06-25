import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  // { path: '', redirectTo: 'signup', pathMatch: 'full' },
  // { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'itemdetail', loadChildren: './pages/itemdetail/itemdetail.module#ItemdetailPageModule' },
  { path: 'items', loadChildren: './pages/items/items.module#ItemsPageModule' },
  { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule' },
  { path: 'checkout', loadChildren: './pages/checkout/checkout.module#CheckoutPageModule' },
  { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesPageModule' },
  { path: 'signin', loadChildren: './pages/signin/signin.module#SigninPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
