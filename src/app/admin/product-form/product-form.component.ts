import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs-compat/add/operator/take';
import {Product} from '../../domain/Product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: Product = {
    title: '',
    imageUrl: '',
    price: 0,
    category: null
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();

    const id = this.route.snapshot.params.id;
    if (id) {
      this.productService.get(id).take(1).subscribe(p => this.product = {
        title: p['title'],
        imageUrl: p['imageUrl'],
        price: p['price'],
        category: p['category']
      });
    }
  }

  ngOnInit() {
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
