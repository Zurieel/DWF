import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerService } from 'src/app/modules/customer/_services/customer.service';
import { DtoCustomerList } from 'src/app/modules/customer/_dtos/dto-customer-list';
import { Invoice } from '../../_models/invoice';
import { InvoiceService } from '../../_services/invoice.service';

import Swal from'sweetalert2'; 

@Component({
  selector: 'app-all-invoices',
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.css']
})
export class AllInvoicesComponent {

  customers: DtoCustomerList[] = [];
  invoices: Invoice[] = [];

  constructor(
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  ngOnInit(){
    this.getAllInvoices();
  }

  getAllInvoices() {
    this.customerService.getCustomers().subscribe(
      customers => {
        this.customers = customers;
        this.customers.forEach(customer => {
          this.invoiceService.getInvoices(customer.rfc).subscribe(
            invoices => {

              invoices.forEach(invoice => {
                invoice.rfc = customer.rfc;
              });

              this.invoices.push(...invoices);
            },
            err => {
              console.error('Error al obtener invoices para el cliente:', customer.rfc, err);
            }
          );
        });
      },
      err => {
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
    );
  }

  showInvoice(invoice_id: number){
    this.router.navigate(['invoice/' + invoice_id + '/items']);
  }


}
