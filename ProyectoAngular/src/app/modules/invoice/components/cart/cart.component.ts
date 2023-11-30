import { Component } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2'; // sweetalert

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  // formulario de registro
  form = this.formBuilder.group({
    rfc: ['', [Validators.required, Validators.pattern('[A-Z]{4}[0-9]{6}[A-Z0-9]{3}')]]
  });

  submitted = false; // indica si se envió el formulario

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder // formulario) 
  ) {}

  eliminarCarrito(id: number) {
    this.cartService.deleteCart(id).subscribe(
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
