import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Endpoints } from './services/api-end-points';
import { CreateProductComponent } from '../app/product/create-product/create-product.component';
import { UpdateProductComponent } from '../app/product/update-product/update-product.component';
import { CreateCategoryComponent } from '../app/category/create-category/create-category.component';
import { UpdateCategoryComponent } from '../app/category/update-category/update-category.component';
import { Productmodel } from './product/models/product/product-model';
import { ProductService } from '../app/services/product-service';
import HTTP_OPTIONS from '../app/services/http-options';
import { CategoryModel } from './category/models/category/category-model';
import { CategoryService } from './services/category-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoyaltyClient';
  productmodel: any;

  modalOptions: NgbModalOptions = {
    size: 'lg'
  }

  constructor(private httpClient: HttpClient,
    public service: ProductService, public categoryService: CategoryService,
    private modalService: NgbModal, private endpoints: Endpoints,
    private toastrService: ToastrService) {

  }

  ngOnInit(): void {

    this.getProduct();
    this.getCategory();
  }

  getProduct() {
    this.httpClient.get<Productmodel[]>(this.endpoints.DevEndpoints.GetAllProducts)
      .subscribe({
        next: (response) => {
          this.service.allProducts = response;
        },
        error: () => {        
          this.toastrService.error("Error Occured");
        },
      });
  }

  getCategory() {
    this.httpClient.get<CategoryModel[]>(this.endpoints.DevEndpoints.GetAllCategory)
      .subscribe({
        next: (response) => {
          this.categoryService.allCategory = response;
        },
        error: () => {
          this.toastrService.error("Error Occured");
        },
      });
  }

  createCategory() {
    const modalRef = this.modalService.open(CreateCategoryComponent, this.modalOptions);
    modalRef.result.then((data) => {
      // on close
    }, (reason) => {
      // on dismiss
      this.getCategory();
    });
  }

  updateCategory(categoryModel: CategoryModel) {
    const modalRef = this.modalService.open(UpdateCategoryComponent, this.modalOptions);
    modalRef.componentInstance.categoryToUpdate = categoryModel;
    modalRef.result.then((data) => {
      // on close      
    }, (reason) => {
      // on dismiss      
      this.getCategory();
    });
  }

  deleteCategory(categoryModel: CategoryModel) {
    this.httpClient
      .delete<CategoryModel[]>(this.endpoints.DevEndpoints.DeleteCategory + "/" + categoryModel.id, HTTP_OPTIONS)
      .subscribe({
        next: () => {
          this.getCategory();
          this.toastrService.success('Deleted Category');
        },
        error: () => {
          this.toastrService.error("Error Occured");
        },
      });
  }

  createProduct() {
    const modalRef = this.modalService.open(CreateProductComponent, this.modalOptions);
    modalRef.result.then((data) => {
      // on close      
    }, (reason) => {
      // on dismiss      
      this.getProduct();
    });
  }

  updateProduct(productmodel: Productmodel) {
    const modalRef = this.modalService.open(UpdateProductComponent, this.modalOptions);
    modalRef.componentInstance.productToUpdate = productmodel;
    modalRef.result.then((data) => {
      // on close      
    }, (reason) => {
      // on dismiss      
      this.getProduct();
    });
  }

  deleteProduct(productmodel: Productmodel) {

    this.httpClient
      .delete<Productmodel[]>(this.endpoints.DevEndpoints.DeleteProduct + "/" + productmodel.id, HTTP_OPTIONS)
      .subscribe({
        next: () => {
          this.getProduct();
          this.toastrService.success('Deleted Product');
        },
        error: () => {
          this.toastrService.error("Error Occured");
        },
      });
  }
}
