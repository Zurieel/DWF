import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Category } from '../../_models/category';
import { CategoryService } from '../../_services/category.service';
import { DtoProductCategory } from '../../_dtos/dto-product-category';
import { ProductService } from '../../_services/product.service';

import Swal from'sweetalert2'; // sweetalert

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent {

  category: any | Category = new Category(); 
  category_id: any | number = 0;
  products: DtoProductCategory[] = []; 

  showOverlay: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ){

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.category_id = this.route.snapshot.paramMap.get('category_id');
      if (this.category_id) {
        this.getProductsByCategory();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          iconColor: 'brown',
          showConfirmButton: false,
          title: '¡Categoria inexistente!',
          color: 'brown',
          background: '#f8a4a4',
          timer: 2000
        });
      }
    });
  }

  ngOnInit(){
    this.category_id = this.route.snapshot.paramMap.get('category_id');
    if(this.category_id){
      this.getProductsByCategory();
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        iconColor: 'brown',
        showConfirmButton: false,
        title: '¡Categoria inexistente!',
        color: 'brown',
        background: '#f8a4a4',
        timer: 2000
      });
    }
  }

  getCategory(category_id: number){
    this.categoryService.getCategory(category_id).subscribe(
      res => {
        this.category = res
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

  getProductsByCategory() {
    this.productService.getProductsByCategory(this.category_id).subscribe(
      res => {
        this.products = res;
        this.getCategory(this.category_id);
        console.log(this.products);
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
    );
  }

  showProduct(gtin: string){
    this.router.navigate(['product/' + gtin]);
  }


}
