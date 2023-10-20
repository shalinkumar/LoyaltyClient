import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

const localDevelopementUrl = 'https://localhost:7139';

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



const ProdEndpoints = {}



@Injectable({
  providedIn: 'root'
})
export class Endpoints {

  readonly DevEndpoints = {
    GetAllProducts: `${localDevelopementUrl}/${locaEndpoints.GetAllProducts}`,
    CreateProduct: `${localDevelopementUrl}/${locaEndpoints.CreateProduct}`,
    UpdateProduct: `${localDevelopementUrl}/${locaEndpoints.UpdateProduct}`,
    DeleteProduct: `${localDevelopementUrl}/${locaEndpoints.DeleteProduct}`,

    GetAllCategory: `${localDevelopementUrl}/${locaEndpoints.GetAllCategory}`,
    CreateCategory: `${localDevelopementUrl}/${locaEndpoints.CreateCategory}`,
    UpdateCategory: `${localDevelopementUrl}/${locaEndpoints.UpdateCategory}`,
    DeleteCategory: `${localDevelopementUrl}/${locaEndpoints.DeleteCategory}`
  };

  //readonly endpoints = environment.production ? ProdEndpoints : DevEndpoints;
}
