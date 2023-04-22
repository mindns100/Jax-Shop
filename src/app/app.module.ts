import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HotToastModule } from '@ngneat/hot-toast';
import {MatMenuModule} from "@angular/material/menu";
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { AdminComponent } from './admin/admin.component';
import {MatDialogModule} from "@angular/material/dialog";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutComponent } from './checkout/checkout.component';
import {FavoritesService} from "./services/favorites.service";
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    LandingComponent,
    CartComponent,
    CartItemComponent,
    ProductListComponent,
    ProductItemComponent,
    AdminComponent,
    CheckoutComponent,
    AccountComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        provideAuth(() => getAuth()),
        HotToastModule.forRoot(),
        MatMenuModule,
        HttpClientModule,
        MatDialogModule,
        NgbModule,
        FormsModule
    ],
  providers: [CartComponent,FavoritesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
