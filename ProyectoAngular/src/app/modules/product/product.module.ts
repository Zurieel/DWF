import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';

import { NgxPhotoEditorModule } from "ngx-photo-editor";

@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductImageComponent,
    ProductCategoryComponent,
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
    CategoryComponent,
    ProductComponent,
    ProductImageComponent
  ]
})

export class ProductModule {}
