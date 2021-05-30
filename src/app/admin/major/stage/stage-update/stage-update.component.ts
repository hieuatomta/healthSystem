import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../../../@core/mock/toastr-service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SizeService} from '../../../../@core/services/size.service';
import {TranslateService} from '@ngx-translate/core';
import {CategoriesService} from '../../../../@core/services/categories.service';
import {TypeDiseaseService} from '../../../../@core/services/type-disease.service';
import {StatusDiseaseService} from '../../../../@core/services/status-disease.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-size-update',
  styleUrls: ['./stage-update.component.scss'],
  templateUrl: './stage-update.component.html',
})
export class StageUpdateComponent implements OnInit {
  lstRole = [];
  listStatus = [
    {name: 'common.status.1', code: 1},
    {name: 'common.status.0', code: 0}
  ];
  inputSize: any;
  itemRoles: any;
  loading = false;
  title: string;
  data: any;
  listType = [];

  ngOnInit(): void {
    this.inputSize = new FormGroup({
      id: new FormControl(this.data?.id, []),
      name: new FormControl(null, [Validators.required]),
      determined: new FormControl(null, [Validators.required, Validators.pattern(/\-?\d*\.?\d{1,2}/)]),
      description: new FormControl(null, []),
      status: new FormControl(null, [Validators.required]),
      likStatus: new FormControl(null, [Validators.required]),
      typediseaseId: new FormControl(null, [Validators.required]),
      type: new FormControl(4, [Validators.required])
    });
    this.typeDiseaseService.query().subscribe(
      (res) => {
        console.log(res);
        this.listType = res.body.data.list;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      },
      () => this.loading = false,
    );
    this.inputSize.get('status').setValue(true);
    this.inputSize.get('likStatus').setValue(false);
    console.log(this.data);
    if (this.data) {
      this.inputSize.patchValue(this.data);
      const status = this.data.status === 1 ? true : false;
      this.inputSize.get('status').patchValue(status);
      const link = this.data.likStatus === 1 ? true : false;
      this.inputSize.get('likStatus').patchValue(link);
    };
  };


  constructor(
    private toastr1: ToastrService,
    private toastr: NbToastrService,
    private translate: TranslateService,
    public ref: NbDialogRef<StageUpdateComponent>,
    private typeDiseaseService: TypeDiseaseService,
    private statusDiseaseService: StatusDiseaseService,
    ) {
  }


  submit() {
    this.inputSize.get('status').patchValue(this.inputSize.get('status').value ? 1 : 0);
    this.inputSize.get('likStatus').patchValue(this.inputSize.get('likStatus').value ? 1 : 0);
    this.inputSize.markAllAsTouched();
    if (this.inputSize.valid) {
      this.loading = true;
      if (this.data == null) {
        this.statusDiseaseService.insert(this.inputSize.value).subscribe(
          (value) => this.ref.close(value),
          (error) => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false
        );
      } else {
        this.statusDiseaseService.update(this.inputSize.value).subscribe(
          (value) => this.ref.close(value),
          (error) => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false,
        );
      }
    } else {
    }
  }

  cancel() {
    this.ref.close();
  }
}
