import { Component } from '@angular/core';

import { Category } from '../../_models/category';
import { CategoryService } from '../../_services/category.service';
import { DtoProductList } from '../../_dtos/dto-product-list';
import { ProductImage } from '../../_models/product-image';
import { ProductService } from '../../_services/product.service';
import { ProductImageService } from '../../_services/product-image.service';

import Swal from'sweetalert2'; // sweetalert
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  categories: Category[] = []; 
  category: any | Category = new Category(); 

  productImages: ProductImage[] = [];
  products: DtoProductList[] = []; 

  showOverlay: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      const category_id = +params['category_id']; 
      this.getProductsBySelectedCategory(category_id);
    });
  }

  getProductsBySelectedCategory(category_id: number) {
    this.productService.getProductsByCategory(category_id).subscribe(
      (res) => {
        this.products = res;
        console.log(this.products);
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
    );
  }

  showProduct(gtin: string){
    this.router.navigate(['product/' + gtin]);
  }


}
