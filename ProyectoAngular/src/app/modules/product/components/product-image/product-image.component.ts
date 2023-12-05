import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Product } from '../../_models/product';
import { Category } from '../../_models/category';
import { ProductImage } from '../../_models/product-image';

import { CartService } from '../../../invoice/_services/cart.service';
import { ProductService } from '../../_services/product.service';
import { CategoryService } from '../../_services/category.service';
import { ProductImageService } from '../../_services/product-image.service';

import { NgxPhotoEditorService } from 'ngx-photo-editor';
import Swal from'sweetalert2'; // sweetalert

declare var $: any; // jquery

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent {

  product: any | Product = new Product(); // producto consultado
  gtin: any | string = ""; // gtin del producto consultado

  productImages: ProductImage[] = [];
  
  categories: Category[] = []; // lista de categorias
  category: any | Category = new Category(); // datos de la categoria del producto

  quantity: number = 1;
  rfc: string = 'SAAI920101A01'; 

  // formulario de actualización
  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: ["", [Validators.required]],
  });

  submitted = false; // indica si se envió el formulario

  constructor(
    private cartService: CartService,
    private productService: ProductService, // servicio product de API
    public productImageService: ProductImageService, // servicio product image de API
    private formBuilder: FormBuilder, // formulario
    private categoryService: CategoryService, // servicio category de API
    private route: ActivatedRoute, // recupera parámetros de la url
    private router: Router, // redirigir a otro componente
    private service: NgxPhotoEditorService
  ){}

  ngOnInit() {
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    if (this.gtin) {
      this.getProduct();
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        iconColor: 'brown',
        showConfirmButton: false,
        title: '¡GTIN inexistente!',
        color: 'brown',
        background: '#f8a4a4',
        timer: 2000
      });
    }
  }
  
  getProduct() {
    this.productService.getProduct(this.gtin).subscribe(
      (res) => {
        this.product = res; // asigna la respuesta de la API a la variable de producto
        this.getCategory(this.product.category_id);
        console.log('Producto obtenido:', this.product);
        this.visualizeImage(this.product.product_id);
      },
      (err) => {
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
  
  onSubmit(){
    // valida el formulario
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    this.productService.updateProduct(this.form.value, this.product.product_id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'center',
          icon: 'success',
          iconColor: '#30871a',
          title: '¡Producto actualizado exitosamente!',
          color: '#30871a',
          background: '#e0ffce',
          showConfirmButton: false,
          timer: 2000
        });

        if(this.form.controls['gtin'].value != this.gtin){
          this.gtin = this.form.controls['gtin'].value!; // actualizamos el gtin

          // sustituimos en la url el nuevo gtin
          let currentUrl = this.router.url.split("/");
          currentUrl.pop();
          currentUrl.push(this.gtin);
          
          // actualizamos la url con el nuevo gtin
          this.redirect(currentUrl);
        }

        this.getProduct(); // consulta el cliente con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro
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

  updateProduct() {
    this.form.reset();
    this.submitted = false;
    this.getCategories();
  
    // Asignar valores a los campos del formulario
    this.form.patchValue({
      product: this.product.product,
      gtin: this.product.gtin,
      description: this.product.description,
      price: this.product.price,
      stock: this.product.stock,
      category_id: this.product.category_id,
    });
  
    $("#modalForm").modal("show");
  }
  

  // product image
  updateProductImage(image: string){
    let productImage: ProductImage = new ProductImage();
    productImage.product_id = this.product.product_id; // Asigna el product_id del producto actual
    productImage.image = image;
  
    this.productImageService.uploadProductImage(productImage).subscribe(
      res => {
        // Muestra mensaje de confirmación
        Swal.fire({
          position: 'center',
          icon: 'success',
          iconColor: '#30871a',
          title: '¡Imagen actualizada exitosamente!',
          color: '#30871a',
          background: '#e0ffce',
          showConfirmButton: false,
          timer: 2000
        });
  
        this.getProduct(); // Consulta el producto con los cambios realizados
  
        $("#modalForm").modal("hide"); // Oculta el modal de registro
      },
      err => {
        // Muestra mensaje de error
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

  visualizeImage(product_id: number) {
    this.productImageService.getProductImage(product_id).subscribe(
      (productImages: ProductImage[]) => {
        productImages.forEach(image => {
          // Construye la URL completa de la imagen
          image.image = `assets/imagenes/${image.image}`;
        });
        this.productImages = productImages;
        console.log('Imágenes del producto:', productImages);
      },
      (err) => {
        console.error('Error al obtener imágenes del producto:', err);
      }
    );
  }

  deleteImage(productId: number) {
    this.productImageService.deleteProductImage(productId).subscribe(
      (response) => {
        // Image has been successfully deleted.
        console.log('Imagen eliminada:', response);
        
        // Remove the image from the carousel
        this.productImages.splice(this.productImages.findIndex((image) => image.product_image_id === productId), 1);
        
        this.getProduct();
      },
      err => {
        // Muestra mensaje de error
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
  
  // catalogues
  getCategories(){
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res; // asigna la respuesta de la API a la lista de categoryes
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
  
  // auxiliary functions
  getCategory(id: number){
    this.categoryService.getCategory(id).subscribe(
      res => {
        this.category = res; // asigna la respuesta de la API a la lista de categoryes
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
  
  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 4 / 4,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      console.log(data);
      this.updateProductImage(data.base64!);
    });
  }

  redirect(url: string[]){
    this.router.navigate(url);
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  updateQuantity(value: string): void {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      this.quantity = parsedValue;
    }
  }

  agregarAlCarrito() {
  
    if (!isNaN(this.quantity) && this.quantity >= 1) {
      if (this.gtin) {
        const nuevoCart = {
          rfc: this.rfc,
          gtin: this.gtin,
          quantity: this.quantity
        };
  
        this.cartService.addToCart(nuevoCart).subscribe(
          res => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              iconColor: '#30871a',
              title: '¡Producto agregado al carrito exitosamente!',
              color: '#30871a',
              background: '#e0ffce',
              showConfirmButton: false,
              timer: 2000
            });
  
            console.log(res); // Puedes imprimir la respuesta del servicio si lo deseas.
  
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
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          iconColor: 'brown',
          showConfirmButton: false,
          title: '¡GTIN inválido!',
          color: 'brown',
          background: '#f8a4a4',
          timer: 2000
        });
        console.error('El valor de GTIN es nulo o no válido');
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        iconColor: 'brown',
        showConfirmButton: false,
        title: '¡Cantidad inválida!',
        color: 'brown',
        background: '#f8a4a4',
        timer: 2000
      });
    }
  }

  comprarAhora(){
    if (!isNaN(this.quantity) && this.quantity >= 1) {
      if (this.gtin) {
        const nuevoCart = {
          rfc: this.rfc,
          gtin: this.gtin,
          quantity: this.quantity
        };
  
        this.cartService.addToCart(nuevoCart).subscribe(
          res => {
            this.router.navigate(['buying/' + this.rfc]);
            console.log(res); // Puedes imprimir la respuesta del servicio si lo deseas.
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
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          iconColor: 'brown',
          showConfirmButton: false,
          title: '¡GTIN inválido!',
          color: 'brown',
          background: '#f8a4a4',
          timer: 2000
        });
        console.error('El valor de GTIN es nulo o no válido');
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        iconColor: 'brown',
        showConfirmButton: false,
        title: '¡Cantidad inválida!',
        color: 'brown',
        background: '#f8a4a4',
        timer: 2000
      });
    }
  }

}

