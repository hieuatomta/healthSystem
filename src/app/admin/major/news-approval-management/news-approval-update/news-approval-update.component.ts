import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../../../@core/mock/toastr-service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ObjectsService} from '../../../../@core/services/objects.service';
import {ColorService} from '../../../../@core/services/color.service';
import {ProductsService} from '../../../../@core/services/products.service';
import {ColumnChangesService, DimensionsHelper, ScrollbarHelper} from '@swimlane/ngx-datatable';
import {CategoriesService} from '../../../../@core/services/categories.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-size-update',
  styleUrls: ['./news-approval-update.component.scss'],
  templateUrl: './news-approval-update.component.html',
  providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
})
export class NewsApprovalUpdateComponent implements OnInit {
  inputProduct: any;
  loading = false;
  data: any;
  title: string;

  constructor(
    private objectsService: ObjectsService,
    private toastr1: ToastrService,
    private toastr: NbToastrService,
    private translate: TranslateService,
    public ref: NbDialogRef<NewsApprovalUpdateComponent>,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
  ) {
  }


  ngOnInit(): void {
    this.inputProduct = new FormGroup({
      id: new FormControl(this.data?.id, []),
      reasonForRefusal: new FormControl(null, [Validators.required]),
      status: new FormControl(2, [Validators.required]),
    });
    if (this.data) {
      this.inputProduct.patchValue(this.data);
    }
  };


  submit() {
    this.inputProduct.markAllAsTouched();
    if (this.inputProduct.valid) {
      this.loading = true;
      if (this.data != null) {
        console.log(this.inputProduct.value);
        this.inputProduct.get('status').setValue(2);
        this.productsService.newsRefuse(this.inputProduct.value).subscribe(
          (value) => this.ref.close(value),
          (error) => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false
        );
      }
    } else {
    }
  }

  cancel() {
    this.ref.close();
  }
}
