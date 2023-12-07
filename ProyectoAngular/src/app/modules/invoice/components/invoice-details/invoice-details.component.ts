import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../_services/cart.service';
import { CustomerService } from 'src/app/modules/customer/_services/customer.service';
import { Invoice } from '../../_models/invoice';
import { InvoiceService } from '../../_services/invoice.service';

import Swal from'sweetalert2'; 

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent {

  rfc: string = 'SAAI920101A01';

  invoice: any | Invoice = new Invoice();
  
  
  constructor(
    private cartService: CartService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  ngOnInit(){
  }

  

}
