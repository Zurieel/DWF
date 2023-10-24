import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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

  onSubmitCreate(){

    this.submitted = true;
    
    if(this.form.invalid) return;

    const selectedText = this.form.controls['code'].value!;

    let category = new Category(0, selectedText, this.form.controls['category'].value!, 1);
    this.categories.push(category);

    $("#modalForm").modal("hide");

    Swal.fire({
      iconColor:'aqua',
      position: 'center',
      icon: 'success',
      background: '#170229',
      color: 'aqua',
      title: '¡Película guardada exitosamente!',
      showConfirmButton: false,
      timer: 2000
    })

  }

  onSubmitUpdate(){

    this.submitted = true;

    if(this.form.invalid) return;

    this.submitted = false;

    for(let category of this.categories){
      if(category.category_id == this.categoryUpdated){
        category.category = this.form.controls['category'].value!;
        category.code = this.form.controls['code'].value!;
        break;
      }
    }

    $("#modalForm").modal("hide");

    Swal.fire({
      iconColor:'aqua',
      position: 'center',
      icon: 'success',
      background: '#170229',
      color: 'aqua',
      title: '¡Película actualizada exitosamente!',
      showConfirmButton: false,
      timer: 2000
    })

    this.categoryUpdated = 0;

  }

  updateCategory(category: Category){
    this.categoryUpdated = category.category_id;
    
    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['code'].setValue(category.code);
    
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  getCategories() {

    let category1 = new Category(1, "Sci-Fi", "Avatar ", 0);
    let category2 = new Category(2, "Acción", "Misión Imposible", 1);
    let category3 = new Category(3, "Terror", "Five Nights at Freddy's", 0);
    let category4 = new Category(4, "Sci-Fi", "Jurassic Park", 1);

    this.categories.push(category1);
    this.categories.push(category2);
    this.categories.push(category3);
    this.categories.push(category4);

  }

  rentCategory(id: number){

    for(let category of this.categories){

      if(category.category_id == id){
        category.status = 0;

        Swal.fire({
          iconColor:'aqua',
          position: 'center',
          icon: 'success',
          background: '#170229',
          color: 'aqua',
          title: '¡Has rentado '+category.category+" exitosamente!",
          showConfirmButton: false,
          timer: 2000
        })
        break;
      }
    }
    console.log("SALIR")
  }

  returnCategory(id: number){

    for(let category of this.categories){

      if(category.category_id == id){
        category.status = 1;

        Swal.fire({
          iconColor:'aqua',
          position: 'center',
          icon: 'success',
          background: '#170229',
          color: 'aqua',
          title: '¡Has devuelto '+category.category+" exitosamente!",
          showConfirmButton: false,
          timer: 2000
        })
        break;
      }
    }
  }

  showModalForm() {
    this.form.reset();
    this.categoryUpdated = 0;
    this.form.controls['code'].setValue("");
    this.submitted = false;
    $("#modalForm").modal("show");
  }
  

}


