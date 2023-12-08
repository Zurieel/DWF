import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../_services/cart.service';
import { Customer } from 'src/app/modules/customer/_models/customer';
import { CustomerService } from 'src/app/modules/customer/_services/customer.service';
import { DtoCartDetails } from '../../_dtos/dto-cart-details';
import { InvoiceService } from '../../_services/invoice.service';

import Swal from'sweetalert2'; 

@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css']
})
export class BuyingComponent {

  cart: DtoCartDetails[] = [];
  customer: any | Customer = new Customer();
  rfc: string = 'SAAI920101A01';
  total: number = 0;

  constructor(
    private cartService: CartService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}
  
  ngOnInit(){
    this.getCart()
    this.getCustomer();
  }

  getCart(){
    this.cartService.getCart(this.rfc).subscribe(
      res => {
        this.cart = res; // Asigna la respuesta a this.cart
        this.calculateTotal();
        console.log(this.cart);
      },
      err => {
        // manejar errores
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

  getCustomer(){
    this.customerService.getCustomer(this.rfc).subscribe(
      res => {
        this.customer = res; // asigna la respuesta de la API a la variable de cliente
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

  async confirmPurchase(){

    let result = await Swal.fire({

      position: 'center',
      title: '¿Deseas continuar con la compra?',
      background: '#e0ffce',
      color: '#30871a',
      icon: 'question',
      iconColor: '#30871a',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: "#30871a",
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'brown'
    })

    if(result.isConfirmed){

      result = await Swal.fire({
        imageUrl: 'assets/imagenes/loading.gif',
        imageWidth: 120,
        imageHeight: 120,
        imageAlt: 'loading icon',
        background: '#e0ffce',
        color: '#30871a',
        title: "Realizando la compra...",
        text: "Espera un momento",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      })

      result = await Swal.fire({
        icon: 'success',
        iconColor: '#30871a',
        background: '#e0ffce',
        title: '¡Compra realizada exitosamente!',
        text: 'Puedes obtener tu factura en "Mis Compras"',
        color: '#30871a',
        timer: 2700,
        showConfirmButton: false
      })

      this.generateInvoice()
    }

  }

  generateInvoice(){
    
    this.invoiceService.generateInvoice(this.rfc).subscribe(
      res => {
        this.router.navigate(['/']);
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

  calculateTotal() {
    this.total = this.cart.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);
  }

}
