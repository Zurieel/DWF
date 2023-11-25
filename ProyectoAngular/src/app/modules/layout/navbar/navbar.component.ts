import { Component } from '@angular/core';

import { Category } from '../../product/_models/category';
import { CategoryService } from '../../product/_services/category.service';


declare var $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  categories: Category[] = [];
  category: any | Category = new Category(); 

  constructor(
    private categoryService: CategoryService
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
}
