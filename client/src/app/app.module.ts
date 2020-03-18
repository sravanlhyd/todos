import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';

import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';

import { MaterialModule } from './material.module';
import { DialogproductComponent } from './dialogproduct/dialogproduct.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';

@NgModule({
  entryComponents: [
    DialogproductComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    HomeComponent,
    DialogproductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule
  ],
  providers: [UserService,AlertService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
