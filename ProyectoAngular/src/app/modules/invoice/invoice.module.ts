import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CartComponent } from './components/cart/cart.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [
    CartComponent,
    InvoiceComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    CartComponent,
    InvoiceComponent,
    ItemComponent
  ]
})
export class InvoiceModule { }
