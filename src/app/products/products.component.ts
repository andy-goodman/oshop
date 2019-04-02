import { Component } from '@angular/core';
import {ProductService} from '../service/product.service';
import {CategoryService} from '../service/category.service';

@Component({
  selector: 'app-products-234',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;
  categories$;

  constructor(productService: ProductService, categoryService: CategoryService) {
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();
  }

}
