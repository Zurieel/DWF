import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent {

  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
  ){}

  form = this.formBuilder.group({
    code: ["", [Validators.required]],
    category: ["", [Validators.required]],
  });

  submitted = false;

  getCategories() {

    let category1 = new Category(1, "Sci-Fi", "Avatar ", 0);
    let category2 = new Category(1, "Acción", "Misión Imposible", 1);
    let category3 = new Category(1, "Terror", "Five Nights at Freddy's", 0);
    let category4 = new Category(1, "Sci-Fi", "Jurassic Park", 1);

    this.categories.push(category1);
    this.categories.push(category2);
    this.categories.push(category3);
    this.categories.push(category4);

}

  ngOnInit(){
    this.getCategories();
  }

  ngOnSubmit(){
    this.submitted = true;
    
    if(this.form.invalid) return;

    const selectedText = this.form.controls['code'].value!;

    let category = new Category(0, selectedText, this.form.controls['category'].value!, 0);
    this.categories.push(category);
    
    this.form.reset();
    this.submitted = false;

    $("#exampleModal").modal("hide");

    alert("¡Película guardada exitosamente!");

  }

  resetForm() {
    this.form.reset();
    this.form.controls['code'].setValue("");
    this.submitted = false;
    $("#exampleModal").modal("show");
  }
  

}


