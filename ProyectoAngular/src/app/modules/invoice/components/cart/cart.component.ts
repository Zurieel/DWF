import { Component } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DtoCartDetails } from '../../_dtos/dto-cart-details';

import Swal from'sweetalert2'; // sweetalert
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {

  // formulario de registro
  rfc: string = 'SAAI920101A01';
  cart: DtoCartDetails[] = []; 

  submitted = false; // indica si se envió el formulario

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(){
    this.getCart(this.rfc);
  }
  
  getCart(rfc: string){
    this.cartService.getCart(rfc).subscribe(
      (res) => {
        this.cart = res; // Asigna la respuesta a this.cart
        console.log(this.cart);
      },
      (err) => {
        // manejar errores
        Swal.fire({
          position: 'center',
          icon: 'error',
          showConfirmButton: false,
          title: err.error.message,
          background: '#292A2D',
          timer: 2000
        });
      }
    )
  }


  eliminarCarrito(rfc: string) {
    this.cartService.deleteCart(rfc).subscribe(
      res => {
        console.log('Carrito eliminado con éxito', res);      
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'center',
          icon: 'error',
          showConfirmButton: false,
          title: err.error.message,
          background: '#292A2D',
          timer: 2000
        });
      }
    );
  }
}
