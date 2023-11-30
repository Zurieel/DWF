import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from '../invoice/components/cart/cart.component';

import { NgxPhotoEditorModule } from "ngx-photo-editor";

@NgModule({
  declarations: [
    CartComponent,
    CategoryComponent,
    ProductComponent,
    ProductImageComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPhotoEditorModule,
  ],
  exports: [
    CartComponent,
    CategoryComponent,
    ProductComponent,
    ProductImageComponent
  ]
})

export class ProductModule {}
