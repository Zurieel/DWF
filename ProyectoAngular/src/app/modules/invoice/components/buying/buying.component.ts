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

  rfc: string = 'SAAI920101A01';
  customer: any | Customer = new Customer();
  cart: DtoCartDetails[] = [];

  subtotal: number = 0;
  iva: number = 0.1905

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
        this.calculateSubtotal();
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
        background: '#e0ffce',
        color: '#30871a',
        title: "Efectuando la compra",
        text: "Espera un momento",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      })

      Swal.fire({
        icon: 'success',
        iconColor: '#30871a',
        background: '#e0ffce',
        title: "¡Compra realizada exitosamente!",
        text: "Disfruta tus productos :)",
        color: '#30871a',
        timer: 2500,
        showConfirmButton: false
      })
      
      this.router.navigate(['invoice/' + this.rfc]);
    }

  }

  calculateSubtotal() {
    this.subtotal = this.cart.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);
  }

  calculateTotal() {
    return this.subtotal + this.subtotal * this.iva;
  }


}
