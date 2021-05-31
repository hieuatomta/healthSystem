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
  styleUrls: ['./stage.component.scss'],
  templateUrl: './stage.component.html',
})
export class StageComponent implements OnInit {
  form: FormGroup;
  Data: Array<any> = [];
  typediseaseId: any;
  usersClient: any;

  ngOnInit(): void {
    // this.typediseaseId = 6;
    if (this.typediseaseId === undefined || this.typediseaseId === null) {
      this.router.navigate(['/chan-doan/dau-hieu-chung']);
    } else {
      this.symptomsService.doSearchByClient({type: 4, status: 1, typediseaseId: this.typediseaseId}).subscribe(res => {
        console.log(res);
        this.Data = res.body;
        this.reformattedArray = this.Data.map(obj => {
          const rObj = {
            id: null,
            frequencyList: null
          };
          rObj.id = obj.id;
          rObj.frequencyList = obj.frequencyList.map(ob1 => {
            const rObj1 = {
              id: null,
            };
            rObj1.id = ob1.id;
            return rObj1;
          });
          return rObj;
        });
        console.log(res), err => {
          console.log(err);
        };
      });
    }
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialogService: NbDialogService,
              private logsEvaluateService: LogsEvaluateService,
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
    if (this.usersClient === null) {
      this.router.navigate(['/chan-doan']);
    }
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    });
  }

  come() {
    this.router.navigate(['/chan-doan/can-lam-sang'], {state: {id: this.typediseaseId}});
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

  arr = [];
  arrId = [];
  reformattedArray: any;

  onChange(e) {
    console.log(e);
    console.log(this.reformattedArray);
    for (let i = 0; i < this.reformattedArray?.length; i++) {
      for (let j = 0; j < this.reformattedArray[i].frequencyList?.length; j++) {
        if (this.reformattedArray[i].frequencyList[j].id === e && this.arr.indexOf(e) === -1) {
          this.arr.push(e);
          if (this.arrId.indexOf(this.reformattedArray[i].id) === -1) {
            this.arrId.push(this.reformattedArray[i].id);
          } else {
            const finalArray = this.reformattedArray[i].frequencyList.map(function (obj) {
              return obj.id;
            });
            const filteredArray = this.arr.filter(value => finalArray.includes(value));
            const new_arr = [...this.arr, ...filteredArray];
            this.arr = new_arr.filter(item => !filteredArray.includes(item));
            this.arr.push(e);
          }
        }
      }
    }
  }


  nextLink(data) {
    this.dialogService.open(ConfirmDialogClientComponent, {
      context: {
        title: this.translate.instant('common.title_cd'),
        message: data.name,
        okTitle: this.translate.instant('common.kt'),
        cancelTitle: this.translate.instant('common.title_ql'),
        hideCancel1: false
      },
    }).onClose.subscribe(res => {
      if (res === 'confirm') {
        this.usersClient.updateTime = null;
        this.usersClient.nameType = data.name;
        this.logsEvaluateService.updateClient(this.usersClient).subscribe(
          (value) => {
            localStorage.setItem('usersClient', JSON.stringify(value.body.data.list));
            this.router.navigate(['/danh-gia'], {state: {id: this.typediseaseId}});
          },
          error => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
          },
        );
      } else if (res === 'confirm1') {
        console.log(data);
        this.usersClient.updateTime = null;
        this.usersClient.nameType = data.name;
        this.logsEvaluateService.updateClient(this.usersClient).subscribe(
          (value) => {
            localStorage.setItem('usersClient', JSON.stringify(value.body.data.list));
            if (data.isExLink) {
              this.router.navigate(['/chan-doan/dieu-tri/' + data.isExLink]);
            } else {
              this.router.navigate(['/danh-gia']);
            }
          },
          error => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
          },
        );
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

  typeGd = 0;

  submitForm() {
    try {
      if (this.typediseaseId === 6) {
        if (this.Data?.length === this.arrId?.length) {
          this.typeGd = -1;
        } else {
          this.toastr.danger('Vui lòng nhập đủ các triệu chứng trên!', this.translate.instant('common.title_notification'));
          return;
        }
      } else {
        // if ( this.form.value.checkArray?.length === 0) {
        //   this.toastr.danger('Vui lòng chọn triệu chứng để chẩn đoán bệnh!', this.translate.instant('common.title_notification'));
        //   return;
        // }
        this.typeGd = 0;
      }
      const data = {
        value: this.form.value.checkArray?.length,
        type: 4,
        typediseaseId: this.typediseaseId,
        type1: this.typeGd,
        lsGd: this.arr
      };
      console.log(this.arr);
      console.log(this.arrId);
      this.statusDiseaseService.queryStatus(data).subscribe((res) => {
        console.log(res.body.data.list);
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
