import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SymptomsService} from '../../../../@core/services/symptoms.service';
import {Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {StatusDiseaseService} from '../../../../@core/services/status-disease.service';
import {ConfirmDialogComponent} from '../../../../shares/directives/confirm-dialog/confirm-dialog.component';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./clinical.component.scss'],
  templateUrl: './clinical.component.html',
})
export class ClinicalComponent implements OnInit {
  form: FormGroup;
  Data: Array<any> = [];
  typediseaseId: any;

  ngOnInit(): void {
    if (this.typediseaseId === undefined || this.typediseaseId === null) {
      this.router.navigate(['/chan-doan/dau-hieu-nhan-biet']);
    } else {
      this.symptomsService.doSearchByClient({type: 2, status: 1, typediseaseId: this.typediseaseId}).subscribe(res => {
        this.Data = res.body.data.list;
        console.log(res), err => {
          console.log(err);
        };
      });
    }
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialogService: NbDialogService,
              private toastr: NbToastrService,
              private translate: TranslateService,
              private symptomsService: SymptomsService,
              private statusDiseaseService: StatusDiseaseService) {
    try {
      this.typediseaseId = this.router.getCurrentNavigation()?.extras.state.id;
    } catch (e) {
      this.typediseaseId = null;
    }

    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    });
  }

  come() {
    this.router.navigate(['/chan-doan']);
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  nextLink(data) {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('common.title_cd'),
        message: data.name,
        okTitle: this.translate.instant('common.title_tt'),
        cancelTitle: this.translate.instant('common.title_ql'),
      },
    }).onClose.subscribe(res => {
      if (res) {
        if (data !== null) {

        }
        this.router.navigate(['/chan-doan/can-lam-sang'], { state: { id: this.typediseaseId } });
      }
    });
  };

  noNextLink(data) {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('common.title_cd'),
        message: data.name,
        okTitle: this.translate.instant('common.kt'),
        cancelTitle: this.translate.instant('common.title_ql')
      },
    }).onClose.subscribe(res => {
      if (res) {
        console.log(res);
        this.router.navigate(['/chan-doan']);
      }
    });
  }
  submitForm() {
    try {
      console.log(this.form.value.checkArray?.length);
      const data = {
        value: this.form.value.checkArray?.length,
        type: 2,
        typediseaseId: this.typediseaseId
      };
      this.statusDiseaseService.queryStatus(data).subscribe((res) => {
        console.log(res.body.data);
        if (res.body.data.list.likStatus === 1) {
          this.nextLink(res.body.data.list);
        } else {
          this.noNextLink(res.body.data.list);
        }
      }, (err) => {
        console.log(err);
      });
    } catch (e) {
      this.toastr.danger('Có lỗi xảy ra trong quán trình chẩn đoán, vui lòng thử lại sau!', this.translate.instant('common.title_notification'));
    }
  }
}
