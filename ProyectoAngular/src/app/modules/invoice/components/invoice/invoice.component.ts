import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Invoice } from '../../_models/invoice';
import { InvoiceService } from '../../_services/invoice.service';

import Swal from'sweetalert2'; 

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  rfc: string = 'SAAI920101A01';
  invoices: Invoice[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  ngOnInit(){
    this.getInvoices();
  }

  getInvoices(){
    this.invoiceService.getInvoices(this.rfc).subscribe(
      res => {
        this.invoices = res;
        console.log(res);
      },
      err =>{
        // muestra mensaje de error
        Swal.fire({
          position: 'center',
          icon: 'error',
          iconColor: 'brown',
          showConfirmButton: false,
          title: err.error.message,
          color: 'brown',
          background: '#f8a4a4',
          timer: 2000
        });
      }
    )
  }

  showInvoice(invoice_id: number){
    this.router.navigate(['invoice/' + invoice_id + '/items']);
  }

}
