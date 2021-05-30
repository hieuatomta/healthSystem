import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SymptomsService} from '../../../../@core/services/symptoms.service';
import {Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {StatusDiseaseService} from '../../../../@core/services/status-disease.service';
import {ConfirmDialogClientComponent} from '../../../../shares/directives/confirm-dialog-client/confirm-dialog-client.component';
import {LogsEvaluateService} from '../../../../@core/services/logs-evaluate.service';


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
  usersClient: any;

  ngOnInit(): void {
    if (this.typediseaseId === undefined || this.typediseaseId === null) {
      this.router.navigate(['/chan-doan/dau-hieu-chung']);
    } else {
      this.symptomsService.doSearchByClient({type: 2, status: 1, typediseaseId: this.typediseaseId}).subscribe(res => {
        this.Data = res.body;
        console.log(res), err => {
          console.log(err);
        };
      });
    }
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private logsEvaluateService: LogsEvaluateService,
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
    this.usersClient = JSON.parse(localStorage.getItem('usersClient'));
    if (  this.usersClient === null) {
      this.router.navigate(['/chan-doan']);
    }
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    });
  }

  come() {
    this.router.navigate(['/chan-doan/dau-hieu-nhan-biet']);
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
    this.dialogService.open(ConfirmDialogClientComponent, {
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
    this.dialogService.open(ConfirmDialogClientComponent, {
      context: {
        title: this.translate.instant('common.title_cd'),
        message: data.name,
        okTitle: this.translate.instant('common.kt'),
        cancelTitle: this.translate.instant('common.title_ql')
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.usersClient.updateTime = null;
        this.usersClient.nameType = data.name;
        this.logsEvaluateService.updateClient(this.usersClient).subscribe(
          (value) => {
            console.log(value);
            localStorage.setItem('usersClient', JSON.stringify(value.body.data.list));
            this.router.navigate(['/danh-gia']);
          },
          error => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
          },
        );
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
