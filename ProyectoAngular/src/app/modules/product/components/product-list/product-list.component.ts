import { Component } from '@angular/core';

import { Category } from '../../_models/category';
import { CategoryService } from '../../_services/category.service';
import { DtoProductList } from '../../_dtos/dto-product-list';
import { Product } from '../../_models/product';
import { ProductImage } from '../../_models/product-image';
import { ProductService } from '../../_services/product.service';
import { ProductImageService } from '../../_services/product-image.service';

import Swal from'sweetalert2'; // sweetalert

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  categories: Category[] = []; 

  product: any | Product = new Product();
  productImage: ProductImage[] = [];
  products: DtoProductList[] = []; 

  constructor(
    private productService: ProductService,
    private productImageService : ProductImageService,
    private categoryService: CategoryService
  ){}

  ngOnInit(){
    this.getProducts()
    console.log(this.getProductImage(this.product.product_id))
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      res => {
        this.products = res; // asigna la respuesta de la API a la lista de productos
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

  getProductImagesForAllProducts() {
    // Recorrer todos los productos y obtener las imágenes
    this.products.forEach(product => {
      this.getProductImage(product.product_id);
    });
  }

  getProductImage(product_id: number){
    this.productImageService.getProductImages(product_id).subscribe(
      (productImages: ProductImage[]) => {
        productImages.forEach(image => {
          // Construye la URL completa de la imagen
          image.image = `assets/imagenes/${image.image}`;
        });
        this.productImage = productImages;
        console.log('Imágenes del producto:', productImages);
      },
      error => {
        console.error('Error al obtener la imagen del producto:', error);
      }
    )
  }


}
