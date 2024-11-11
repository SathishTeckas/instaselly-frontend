import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/controller/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./view/view.module').then(m => m.ViewModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./buyers/buyers.module').then(m => m.BuyersModule),
    data: {
      breadcrumb: { skip: true }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
