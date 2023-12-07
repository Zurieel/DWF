import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DtoInvoiceList } from '../../_dtos/dto-invoice-list';
import { InvoiceService } from '../../_services/invoice.service';
import { Product } from 'src/app/modules/product/_models/product';
import { ProductService } from 'src/app/modules/product/_services/product.service';

import Swal from'sweetalert2'; 
@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent {

  invoice: DtoInvoiceList = new DtoInvoiceList()
  invoice_id: any | number = 0;

  product: any | Product = new Product();

  randomString: string = this.generateRandomString();
  
  constructor(
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    this.invoice_id = this.route.snapshot.paramMap.get('invoice_id');
    if(this.invoice_id){
      this.getInvoice();
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        iconColor: 'brown',
        showConfirmButton: false,
        title: '¡ID de factura inexistente!',
        color: 'brown',
        background: '#f8a4a4',
        timer: 2000
      });
    }
  }

  getInvoice(){
    this.invoiceService.getInvoice(this.invoice_id).subscribe(
      res => {
        this.invoice = res; // asigna la respuesta de la API a la variable de cliente
        console.log(this.invoice);  
      },
      err => {
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

  getProduct(gtin: string){
    this.productService.getProduct(gtin).subscribe(
      res => {
        this.product = res;
        return this.product.product
      },
      err => {
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

  generateRandomString(): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result: string = '';
  
    for (let i: number = 0; i < 8; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

  async downloadInvoice(){

    await Swal.fire({
      imageUrl: 'assets/imagenes/loading.gif',
      imageWidth: 120,
      imageHeight: 120,
      imageAlt: 'loading icon',
      background: '#e0ffce',
      color: '#30871a',
      title: "Descargando...",
      text: "Espera un momento",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    })

    await Swal.fire({
      icon: 'success',
      iconColor: '#30871a',
      background: '#e0ffce',
      title: '¡Descarga finalizada!',
      color: '#30871a',
      timer: 2700,
      showConfirmButton: false
    })
  }

  
}
