import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../../category.service';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent {

  categories: Category[] = [];
  categoryUpdated: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ){}

  form = this.formBuilder.group({
    code: ["", [Validators.required]],
    category: ["", [Validators.required]],
  });

  submitted = false;

  ngOnInit(){
    this.getCategories();
  }

  ngOnSubmit(){
    if(this.categoryUpdated == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }

  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  onSubmitCreate() {
    if (this.form.valid) {
      this.categoryService.createCategory(this.form.value).subscribe((response) => {
      });
    } else {
      // errores
    }
  }

  onSubmitUpdate() {
    if (this.form.valid) {
      const updatedCategory = { id: this.categoryUpdated, ...this.form.value };
      this.categoryService.updateCategory(updatedCategory).subscribe((response) => {
        // Procesa la respuesta después de actualizar la categoría
      });
    } else {
      // errores
    }
  }

  updateCategory(category: Category){
    this.categoryUpdated = category.category_id;
    
    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['code'].setValue(category.code);
    
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  rentCategory(id: number){
    this.categoryService.enableCategory(id).subscribe((response) => {
      // Procesa la respuesta después de habilitar la categoría
    });
  }

  returnCategory(id: number){
    this.categoryService.disableCategory(id).subscribe((response) => {
      // Procesa la respuesta después de deshabilitar la categoría
    });
  }

  showModalForm() {
    this.form.reset();
    this.categoryUpdated = 0;
    this.form.controls['code'].setValue("");
    this.submitted = false;
    $("#modalForm").modal("show");
  }
  
}