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
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  categoryForm: FormGroup;
  categoryToUpdate!: CategoryModel;

  constructor(public formBuilder: FormBuilder,
    private httpClient: HttpClient, public activeModal: NgbActiveModal,
    private CategoryService: CategoryService, private endpoints: Endpoints,
    private modalService: NgbModal, private toastrService: ToastrService) {
    this.categoryForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: [this.categoryToUpdate.name, Validators.required],
      description: [this.categoryToUpdate.description, Validators.required],
    });
  }

  submitForm() {
    var updateCategory = {} as CategoryCreateUpdateDto;

    updateCategory.id = this.categoryToUpdate.id;
    updateCategory.name = this.categoryForm.get('name')!.value;
    updateCategory.description = this.categoryForm.get('description')!.value;

    this.httpClient
      .put<CategoryModel[]>(this.endpoints.DevEndpoints.UpdateCategory, updateCategory, HTTP_OPTIONS)
      .subscribe({
        next: (response) => {
          this.toastrService.success('Category Updated');
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
