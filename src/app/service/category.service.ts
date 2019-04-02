import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private objectToCategory = object => { return {
    key: object['key'],
    name: object['name']
  }};

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories',
        ref => ref.orderByChild('name')
    )
    .snapshotChanges()
    .map(changes => {
      console.log('changes', changes);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
    .map( objects => {
      return objects.map(this.objectToCategory);
    });
  }
}
