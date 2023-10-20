import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Endpoints } from '../../services/api-end-points';
import HTTP_OPTIONS from '../../services/http-options';
import { ProductCreateUpdateDto } from '../models/product/product-create-update-dto';
import { ProductService } from '../../services/product-service';
import { Productmodel } from '../models/product/product-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  productForm: FormGroup;
  isSuccessfull: boolean = true;

  constructor(public formBuilder: FormBuilder,
    private httpClient: HttpClient, public activeModal: NgbActiveModal,
    private productService: ProductService, private endpoints: Endpoints,
    private modalService: NgbModal, private toastrService: ToastrService) {
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      price: ["", Validators.required],
      color: [""],
    });
  }

  submitForm() {
    var createProduct = {} as ProductCreateUpdateDto;

    createProduct.Name = this.productForm.get('name')!.value;
    createProduct.UserDescription = this.productForm.get('description')!.value;
    createProduct.Price = this.productForm.get('price')!.value;
    createProduct.Category = this.productForm.get('category')!.value;
    createProduct.Color = this.productForm.get('color')!.value;

    this.httpClient
      .post<Productmodel[]>(this.endpoints.DevEndpoints.CreateProduct, createProduct, HTTP_OPTIONS)
      .subscribe({
        next: (response) => {
          this.toastrService.success('Product Created');
          this.productService.allProducts = response;
          this.modalService.dismissAll();
        },
        error: (error: HttpErrorResponse) => {
          if (error.error.instance == "") {
            this.toastrService.error("Error Occured");
          } else {
            this.toastrService.error(error.error.instance);
          }
        },
      });
  }
}
