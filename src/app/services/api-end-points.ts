import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

const locaEndpoints = {
  GetAllProducts: 'products',
  CreateProduct: 'create-product',
  UpdateProduct: 'update-product',
  DeleteProduct: 'delete-product',
  GetAllCategory: 'category',
  CreateCategory: 'create-category',
  UpdateCategory: 'update-category',
  DeleteCategory: 'delete-category'
};

@Injectable({
  providedIn: 'root'
})
export class Endpoints {
  DevEndpoints: any;
  apiUrl: any;

  constructor() {   
    
    this.apiUrl = 'https://shalinloyaltyapi.azurewebsites.net';

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
