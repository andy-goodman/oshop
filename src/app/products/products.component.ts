import { Component } from '@angular/core';
import {ProductService} from '../service/product.service';
import {CategoryService} from '../service/category.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/Product';

@Component({
  selector: 'app-products-234',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;

  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService
  ) {
    const that = this;
    productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
      .subscribe( params => {
        that.category = params.get('category');
        console.log('this.category', that.category);

        that.filteredProducts = (that.category) ?
          that.products.filter( p => p.category === that.category) :
          that.products;
      });
    this.categories$ = categoryService.getAll();
  }

}
