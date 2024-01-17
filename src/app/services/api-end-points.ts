import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

const locaEndpoints = {
  GetAllProducts: 'product',
  CreateProduct: 'product',
  UpdateProduct: 'product',
  DeleteProduct: 'product',
  GetAllCategory: 'category',
  CreateCategory: 'category',
  UpdateCategory: 'category',
  DeleteCategory: 'category'
};

@Injectable({
  providedIn: 'root'
})
export class Endpoints {
  DevEndpoints: any;
  apiUrl: any;

  constructor() {   
    
    this.apiUrl = 'https://localhost:7139';

    this.DevEndpoints = {
      GetAllProducts: `${this.apiUrl}/${locaEndpoints.GetAllProducts}`,
      CreateProduct: `${this.apiUrl}/${locaEndpoints.CreateProduct}`,
      UpdateProduct: `${this.apiUrl}/${locaEndpoints.UpdateProduct}`,
      DeleteProduct: `${this.apiUrl}/${locaEndpoints.DeleteProduct}`,

      GetAllCategory: `${this.apiUrl}/${locaEndpoints.GetAllCategory}`,
      CreateCategory: `${this.apiUrl}/${locaEndpoints.CreateCategory}`,
      UpdateCategory: `${this.apiUrl}/${locaEndpoints.UpdateCategory}`,
      DeleteCategory: `${this.apiUrl}/${locaEndpoints.DeleteCategory}`
    };
  }

  //readonly endpoints = environment.production ? ProdEndpoints : DevEndpoints;
}
