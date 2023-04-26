import {Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsCollection: AngularFirestoreCollection<Product>;

  constructor(private db: AngularFirestore) {
    this.productsCollection = this.db.collection<Product>('products');
  }

  getProducts(category?: string): Observable<Product[]> {
    let productsCollection: AngularFirestoreCollection<Product>;
    if (category) {
      productsCollection = this.db.collection<Product>('products', ref => {
        return ref.where('category', '==', category);
      });
    } else {
      productsCollection = this.productsCollection;
    }
    return productsCollection.valueChanges({ idField: 'id' });
  }

  filterProductsByCategory(category: string): Observable<Product[]> {
    return this.db.collection<Product>('products', ref => {
      return ref.where('category', '==', category);
    }).valueChanges({ idField: 'id' });

  }

  filterProductsByPriceRange(minimum: number, maximum: number): Observable<Product[]> {
    return this.db.collection<Product>('products', ref => {
      return ref.where('price', '>=', minimum).where('price', '<=', maximum);
    }).valueChanges({ idField: 'id' });
  }

  filterProductsByText(searchText: string): Observable<Product[]> {
    searchText = searchText.toLowerCase(); // Convert search text to lowercase
    return this.db.collection<Product>('products', ref => {
      return ref.where('name_lowercase', '>=', searchText)
        .where('name_lowercase', '<=', searchText + '\uf8ff');
    }).valueChanges({ idField: 'id' });
  }
  /////////////////////////////////////////////////////////////////////////////

  createProduct(product: Product): Promise<void> {
    product.name_lowercase = product.name.toLowerCase();
    return this.productsCollection.add(product)
      .then((docRef) => {
        console.log("Product created with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding product: ", error);
      });
  }

  deleteProduct(id: string): Promise<void> {
    return this.productsCollection.doc(id).delete();
  }

  updateProduct(product: Product): Promise<void> {
    product.name_lowercase = product.name.toLowerCase();
    return this.productsCollection.doc(product.id).update(product)
      .then(() => {
        console.log("Product updated with ID: ", product.id);
      })
      .catch((error) => {
        console.error("Error updating product: ", error);
      });
  }


}
