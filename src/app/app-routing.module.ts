import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {HomeComponent} from "./home/home.component";
import { CheckoutComponent } from './checkout/checkout.component';
import {canActivate,redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard';
import {CartComponent} from "./cart/cart.component";
import {AdminComponent} from "./admin/admin.component";
import {AccountComponent} from "./account/account.component";

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home'])

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'home',
    component: HomeComponent,
      ...canActivate(redirectToLogin)
  },
  { path: 'cart/checkout', component: CheckoutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'account', component: AccountComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
