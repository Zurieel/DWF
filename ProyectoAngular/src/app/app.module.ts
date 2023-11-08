import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductModule } from './modules/product/product.module';

import { NgxPhotoEditorModule } from "ngx-photo-editor";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    NgxPhotoEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
