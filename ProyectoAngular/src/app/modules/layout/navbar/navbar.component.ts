import { Component } from '@angular/core';

import { Category } from '../../product/_models/category';
import { CategoryService } from '../../product/_services/category.service';

declare var $: any;
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  categories: Category[] = [];
  category: any | Category = new Category(); 

  rfc: string = 'SAAI920101A01';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ){}

  ngOnInit(){
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res;
      },
      err =>{
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

  showCatalogue(category_id: number){
    this.router.navigate(['products/category/' + category_id]);
  }

  showCart(rfc: string) {
    this.router.navigate(['cart/' + rfc]);
  }

}
