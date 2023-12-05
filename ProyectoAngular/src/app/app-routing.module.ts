import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuyingComponent } from './modules/invoice/components/buying/buying.component';
import { CartComponent } from './modules/invoice/components/cart/cart.component';
import { CategoryComponent } from './modules/product/components/category/category.component';
import { CustomerComponent } from './modules/customer/components/customer/customer.component';
import { CustomerImageComponent } from './modules/customer/components/customer-image/customer-image.component'; 
import { InvoiceComponent } from './modules/invoice/components/invoice/invoice.component';
import { ProductComponent } from './modules/product/components/product/product.component';
import { ProductImageComponent } from './modules/product/components/product-image/product-image.component';
import { ProductListComponent } from './modules/product/components/product-list/product-list.component';
import { RegionComponent } from './modules/customer/components/region/region.component';
import { PrincipalComponent } from './modules/principal/components/principal/principal.component';

const routes: Routes = [
  { path: "buying/:rfc", component: BuyingComponent },
  { path: "cart/:rfc", component: CartComponent },
  { path: "category", component: CategoryComponent },
  { path: "customer", component: CustomerComponent },
  { path: "customer/:rfc", component: CustomerImageComponent },
  { path: "invoice/:rfc", component: InvoiceComponent },
  { path: "product", component: ProductComponent },
  { path: "product/:gtin", component: ProductImageComponent },
  { path: "region", component: RegionComponent },
  { path: "products/category/:category_id", component: ProductListComponent },
  { path: "", component: PrincipalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
