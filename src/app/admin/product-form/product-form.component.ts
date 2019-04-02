import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs-compat/add/operator/take';
import {Product} from '../../models/Product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  id: string;
  categories$;
  product: any = {
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
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.params.id;
    console.log('init card', this.id);
    if (this.id) {
      this.productService.get(this.id).take(1).subscribe(p => {
        this.product = p;
        console.log('this.product', this.product);
      });
    }
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
