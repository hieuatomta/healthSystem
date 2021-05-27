import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {SymptomsService} from '../../../@core/services/symptoms.service';
import {StatusDiseaseService} from '../../../@core/services/status-disease.service';
import {ConfirmDialogComponent} from '../../../shares/directives/confirm-dialog/confirm-dialog.component';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./evaluate.component.scss'],
  templateUrl: './evaluate.component.html',
})
export class EvaluateComponent implements OnInit {
  form: FormGroup;
  Data: Array<any> = [];
  option: any;
  ngOnInit(): void {
    this.symptomsService.doSearchByClient({type: 0, status: 1}).subscribe(res => {
      this.Data = res.body.data.list;
      console.log(res), err => {
        console.log(err);
      };
    });
  }
  options = [
    {id: 1, name: 'Chất lượng kém'},
    {id: 2, name: 'Chất lượng trung bình'},
    {id: 3, name: 'Chất lượng tốt'}
  ]

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialogService: NbDialogService,
              private toastr: NbToastrService,
              private translate: TranslateService,
              private symptomsService: SymptomsService,
              private statusDiseaseService: StatusDiseaseService) {
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
      console.log(res);
      if (res) {
        if (data !== null) {

        }
        this.router.navigate(['/chan-doan/dau-hieu-nhan-biet']);
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
        type: 0,
        typediseaseId: null
      };
      this.statusDiseaseService.queryStatus(data).subscribe((res) => {
        console.log(res.body.data);
        if (res.body.data.list.likStatus === 1) {
          this.nextLink(res.body.data.list);
        } else {
          this.noNextLink(res.body.data.list);
        }
      }, (err) => {
      });
    } catch (e) {
      this.toastr.danger('Có lỗi xảy ra trong quán trình chẩn đoán, vui lòng thử lại sau!', this.translate.instant('common.title_notification'));
    }
  }
}