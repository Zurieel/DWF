import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CartComponent } from './components/cart/cart.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ItemComponent } from './components/item/item.component';
import { BuyingComponent } from './components/buying/buying.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { AllInvoicesComponent } from './components/all-invoices/all-invoices.component';

@NgModule({
  declarations: [
    CartComponent,
    InvoiceComponent,
    ItemComponent,
    BuyingComponent,
    InvoiceDetailsComponent,
    AllInvoicesComponent
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
