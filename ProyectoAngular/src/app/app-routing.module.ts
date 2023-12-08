import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllInvoicesComponent } from './modules/invoice/components/all-invoices/all-invoices.component';
import { BuyingComponent } from './modules/invoice/components/buying/buying.component';
import { CartComponent } from './modules/invoice/components/cart/cart.component';
import { CategoryComponent } from './modules/product/components/category/category.component';
import { CustomerComponent } from './modules/customer/components/customer/customer.component';
import { CustomerImageComponent } from './modules/customer/components/customer-image/customer-image.component'; 
import { InvoiceComponent } from './modules/invoice/components/invoice/invoice.component';
import { InvoiceDetailsComponent } from './modules/invoice/components/invoice-details/invoice-details.component';
import { ProductComponent } from './modules/product/components/product/product.component';
import { ProductImageComponent } from './modules/product/components/product-image/product-image.component';
import { ProductCategoryComponent } from './modules/product/components/product-category/product-category.component';
import { RegionComponent } from './modules/customer/components/region/region.component';
import { PrincipalComponent } from './modules/principal/components/principal/principal.component';

const routes: Routes = [
  { path: "buying/:rfc", component: BuyingComponent },
  { path: "cart/:rfc", component: CartComponent },
  { path: "category", component: CategoryComponent },
  { path: "customer", component: CustomerComponent },
  { path: "customer/:rfc", component: CustomerImageComponent },
  { path: "invoice", component: AllInvoicesComponent },
  { path: "invoice/:rfc", component: InvoiceComponent },
  { path: "invoice/:invoice_id/items", component: InvoiceDetailsComponent },
  { path: "product", component: ProductComponent },
  { path: "product/:gtin", component: ProductImageComponent },
  { path: "region", component: RegionComponent },
  { path: "products/category/:category_id", component: ProductCategoryComponent },
  { path: "", component: PrincipalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
