import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryModule } from './shared/library/library.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { ProgressLoaderConfiguration } from './shared/configurations/loaders/progress-bar.config';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HelperService } from './shared/controller/common/helper/helper.service';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LibraryModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgProgressModule.withConfig(ProgressLoaderConfiguration),
    NgProgressHttpModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [
    HttpClientModule,
    HelperService,
    { provide: NZ_I18N, useValue: en_US }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
