import { Component } from '@angular/core';
import { CartService } from '../../_services/cart.service';
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


  async eliminarCarrito(rfc: string) {

    if(this.cart.length != 0){

      const result = await Swal.fire({
        position: 'center',
        title: '¿Deseas vaciar tu carrito?',
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
  
        this.cartService.deleteCart("/"+rfc).subscribe(
          res => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              iconColor: '#30871a',
              title: '¡Carrito eliminado exitosamente!',
              color: '#30871a',
              background: '#e0ffce',
              showConfirmButton: false,
              timer: 2000
            });
    
            this.getCart(this.rfc);    
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
        );
      }
    }
  }

  async quitaProducto(id: number){

    const result = await Swal.fire({
      position: 'center',
      title: '¿Deseas eliminar este producto de tu carrito?',
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
    
      this.cartService.removeFromCart(id).subscribe(
        res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            iconColor: '#30871a',
            title: '¡Producto eliminado del carrito exitosamente!',
            color: '#30871a',
            background: '#e0ffce',
            showConfirmButton: false,
            timer: 2000
          });

          this.getCart(this.rfc);

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
      )
    }
  }
}
