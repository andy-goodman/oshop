import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;

  constructor(categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
    console.log('this.categories$', this.categories$);
  }

  ngOnInit() {
  }

  save(product) {
    this.productService.create(product);
  }

}
