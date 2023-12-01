import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomerModule } from './modules/customer/customer.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { LayoutModule } from './modules/layout/layout.module';
import { PrincipalModule } from './modules/principal/principal.module';
import { ProductModule } from './modules/product/product.module';

import { NgxPhotoEditorModule } from "ngx-photo-editor";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    InvoiceModule,
    LayoutModule,
    PrincipalModule,
    ProductModule,
    NgxPhotoEditorModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
