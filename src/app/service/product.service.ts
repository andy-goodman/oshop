import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {Product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  objectToProduct = object => { return {
    key: object['key'],
    title: object['title'],
    imageUrl: object['imageUrl'],
    price: object['price'],
    category: object['category']
  }};

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list('/products')
      .snapshotChanges()
      .map(changes => {
        console.log('changes', changes);
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
      .map( objects => {
        return objects.map(this.objectToProduct);
      });
  }

  get(productId): Observable<Product> {
    return this.db.object('/products/' + productId).valueChanges().map(this.objectToProduct);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
