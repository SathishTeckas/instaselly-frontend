import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication.component';
import { LibraryModule } from '../shared/library/library.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerificationComponent } from './verification/verification.component';


@NgModule({
  declarations: [
    LoginComponent,
    AuthenticationComponent,
    ForgotPasswordComponent,
    VerificationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    LibraryModule
  ]
})
export class AuthenticationModule { }
