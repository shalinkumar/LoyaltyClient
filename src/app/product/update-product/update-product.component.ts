import { Component, ViewChild } from '@angular/core';
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
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  productForm: FormGroup;
  isSuccessfull: boolean = true;
  productToUpdate!: Productmodel;

  constructor(public formBuilder: FormBuilder,
    private httpClient: HttpClient, public activeModal: NgbActiveModal,
    private productService: ProductService, private endpoints: Endpoints,
    private modalService: NgbModal, private toastrService: ToastrService) {
    this.productForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [this.productToUpdate.name, Validators.required],
      description: [this.productToUpdate.description, Validators.required],
      category: [this.productToUpdate.category, Validators.required],
      price: [this.productToUpdate.price, Validators.required],
      color: [this.productToUpdate.color],
    });

  }

  submitForm() {
    var updateProduct = {} as ProductCreateUpdateDto;

    updateProduct.Id = this.productToUpdate.id;
    updateProduct.Name = this.productForm.get('name')!.value;
    updateProduct.Description = this.productForm.get('description')!.value;
    updateProduct.Price = this.productForm.get('price')!.value;
    updateProduct.Category = this.productForm.get('category')!.value;
    updateProduct.Color = this.productForm.get('color')!.value;


    this.httpClient
      .put<Productmodel[]>(this.endpoints.DevEndpoints.UpdateProduct, updateProduct)
      .subscribe({
        next: (response) => {
          this.productService.allProducts = response;
          this.toastrService.success('Product Updated');
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
