import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Endpoints } from '../../services/api-end-points';
import HTTP_OPTIONS from '../../services/http-options';
import { CategoryCreateUpdateDto } from '../models/category/category-create-update-dto';
import { CategoryService } from '../../services/category-service';
import { CategoryModel } from '../models/category/category-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  categoryForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private httpClient: HttpClient, public activeModal: NgbActiveModal,
    private CategoryService: CategoryService, private endpoints: Endpoints,
    private modalService: NgbModal, private toastrService: ToastrService) {
    this.categoryForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  submitForm() {
    var createCategory = {} as CategoryCreateUpdateDto;

    createCategory.name = this.categoryForm.get('name')!.value;
    createCategory.description = this.categoryForm.get('description')!.value;

    this.httpClient
      .post<CategoryModel[]>(this.endpoints.DevEndpoints.CreateCategory, createCategory, HTTP_OPTIONS)
      .subscribe({
        next: (response) => {
          this.toastrService.success('Category Created');
          this.CategoryService.allCategory = response;
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
