import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../../../@core/mock/toastr-service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {SymptomsService} from '../../../../@core/services/symptoms.service';
import {TypeDiseaseService} from '../../../../@core/services/type-disease.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-size-update',
  styleUrls: ['./type-symptom-update.component.scss'],
  templateUrl: './type-symptom-update.component.html',
})
export class TypeSymptomUpdateComponent implements OnInit {
  lstRole = [];
  listStatus = [
    {name: 'common.typeSymptom.0', code: 0},
    {name: 'common.typeSymptom.1', code: 1},
    {name: 'common.typeSymptom.2', code: 2},
    {name: 'common.typeSymptom.3', code: 3},
    {name: 'common.typeSymptom.4', code: 4}
  ];
  inputSize: any;
  itemRoles: any;
  loading = false;
  title: string;
  data: any;
  isLoad: boolean;

  ngOnInit(): void {
    this.inputSize = new FormGroup({
      id: new FormControl(this.data?.id, []),
      name: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      typediseaseId: new FormControl(null, []),
      testdiseaseId: new FormControl(null, []),
      status: new FormControl(null, [Validators.required])
    });
    this.inputSize.get('status').setValue(true);
    if (this.data) {
      this.inputSize.patchValue(this.data);
      const status = this.data.status === 1 ? true : false;
      this.inputSize.get('status').patchValue(status);
    }
    ;
    this.isLoad = true;
    this.typeDiseaseService.doSearch({
      status: 1,
    }).subscribe(
      (res) => {
        this.onSuccess(res.body.data, res.headers);
      },
      (error) => {
        this.isLoad = false;
      },
      () => this.isLoad = false,
    );
    this.update_select();
  };

  rows: any;

  protected onSuccess(data: any | null, headers: HttpHeaders): void {
    this.rows = data.list || [];
    console.log(this.rows);
  }

  isCheckType = false;
  isCheckType3 = false;

  update_select() {
    console.log(this.inputSize.get('type').value);
    if (this.inputSize.get('type').value !== 0 && this.inputSize.get('type').value !== null) {
      this.isCheckType = true;
      if (this.inputSize.get('type').value === 3) {
        this.isCheckType3 = true;
      } else {
        this.isCheckType3 = false;
      }
    } else {
      this.isCheckType = false;
      this.isCheckType3 = false;
    }
  }

  constructor(
    private toastr1: ToastrService,
    private toastr: NbToastrService,
    private translate: TranslateService,
    public ref: NbDialogRef<TypeSymptomUpdateComponent>,
    private typeDiseaseService: TypeDiseaseService,
    private symptomsService: SymptomsService) {
  }


  submit() {
    this.inputSize.get('status').patchValue(this.inputSize.get('status').value ? 1 : 0);
    this.inputSize.markAllAsTouched();
    if (this.inputSize.valid) {
      this.loading = true;
      if (this.data == null) {
        this.symptomsService.insert(this.inputSize.value).subscribe(
          (value) => this.ref.close(value),
          (error) => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false
        );
      } else {
        this.symptomsService.update(this.inputSize.value).subscribe(
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
