import { Component } from '@angular/core';
import { Category } from '../../_models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent {

  categories: Category[] = [];

  ngOnInit(){
    this.getCategories();
  }

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
  

}


