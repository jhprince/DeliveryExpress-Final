import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import { OutletComponent} from './outlet/outlet.component';
import { SalesPersonComponent} from './salesperson/salesperson.component';
import { SalesrouteComponent} from './salesroute/salesroute.component';
import { LogoutComponent } from './login/Logout.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path:'dashboard', component: DashboardComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'product', component: ProductComponent},
  {path: 'outlet', component: OutletComponent},
  {path: 'salesperson', component: SalesPersonComponent},
  {path: 'salesroute', component: SalesrouteComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
