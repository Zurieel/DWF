import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../_services/cart.service';
import { CustomerService } from 'src/app/modules/customer/_services/customer.service';
import { InvoiceService } from '../../_services/invoice.service';

import Swal from'sweetalert2'; 

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  rfc: string = 'SAAI920101A01';
  
  constructor(
    private cartService: CartService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  ngOnInit(){
    this.generateInvoice(this.rfc)
  }

  generateInvoice(rfc: string){
    
    this.invoiceService.generateInvoice(rfc).subscribe(
      res => {
        console.log(res)
      },  
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'center',
          icon: 'error',
          iconColor: 'brown',
          showConfirmButton: false,
          title: 'aqui esta el error',
          color: 'brown',
          background: '#f8a4a4',
          timer: 2000
        });
      }
    )
  }
}
