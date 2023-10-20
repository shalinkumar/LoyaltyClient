import { Injectable } from '@angular/core';
import { Productmodel } from '../product/models/product/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  allProducts!: Productmodel[];
}
