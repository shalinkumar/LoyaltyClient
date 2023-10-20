import { Injectable } from '@angular/core';
import { CategoryModel } from '../category/models/category/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  allCategory!: CategoryModel[];
}
