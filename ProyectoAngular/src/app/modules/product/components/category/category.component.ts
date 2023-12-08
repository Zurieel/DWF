import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../_services/category.service';

declare var $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent {

  categories: Category[] = [];
  categoryUpdated: number = 0;
  numbers: string[] = Array.from({ length: 20 }, (_, index) => ('0' + (40 + index + 1)).slice(-3));

  form = this.formBuilder.group({
    code: ["", [Validators.required]],
    category: ["", [Validators.required]],
  });

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ){}

  ngOnInit(){
    this.getCategories();
  }

  ngOnSubmit(){
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    if(this.categoryUpdated == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
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

  onSubmitCreate() {
      this.categoryService.createCategory(this.form.value).subscribe(
        res => {
          // muestra mensaje de confirmación
          Swal.fire({
            position: 'center',
            icon: 'success',
            iconColor: '#30871a',
            title: '¡Categoría registrada exitosamente!',
            color: '#30871a',
            background: '#e0ffce',
            showConfirmButton: false,
            timer: 2000
          });

          this.getCategories();

          $("#modalForm").modal("hide");
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

  onSubmitUpdate() {
    this.categoryService.updateCategory(this.form.value, this.categoryUpdated).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'center',
          icon: 'success',
          iconColor: '#30871a',
          title: '¡Categoría actualizada exitosamente!',
          color: '#30871a',
          background: '#e0ffce',
          showConfirmButton: false,
          timer: 2000
        });
      
      this.getCategories();

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

  updateCategory(category: Category){
    this.categoryUpdated = category.category_id;
    
    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['code'].setValue(category.code);
    
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  enableCategory(id: number){
    this.categoryService.enableCategory(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'center',
          icon: 'success',
          iconColor: '#30871a',
          title: '¡Categoría activada exitosamente!',
          color: '#30871a',
          background: '#e0ffce',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCategories(); // consulta regiones con los cambios realizados
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
      
  disableCategory(id: number){
    this.categoryService.disableCategory(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position:'center',
          icon: 'success',
          iconColor: '#30871a',
          title: '¡Categoría desactivada exitosamente!',
          color: '#30871a',
          background: '#e0ffce',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCategories(); // consulta regiones con los cambios realizados
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

  showModalForm() {
    this.form.reset();
    this.categoryUpdated = 0;
    this.form.controls['code'].setValue("");
    this.submitted = false;
    $("#modalForm").modal("show");
  }
  
}