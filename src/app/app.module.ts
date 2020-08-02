import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ModalComponent} from './modal/modal.component';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {ContentTypeInterceptor} from "./interceptors/content-type.interceptor";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {ToastNoAnimationModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 4000,
      closeButton: true
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent
  ]
})
export class AppModule {
}
