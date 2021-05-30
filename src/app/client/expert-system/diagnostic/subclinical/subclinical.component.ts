import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SymptomsService} from '../../../../@core/services/symptoms.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {TypeTestService} from '../../../../@core/services/type-test.service';
import {ConfirmDialogClientComponent} from '../../../../shares/directives/confirm-dialog-client/confirm-dialog-client.component';
import {LogsEvaluateService} from '../../../../@core/services/logs-evaluate.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./subclinical.component.scss'],
  templateUrl: './subclinical.component.html',
})
export class SubclinicalComponent implements OnInit {
  key: any;
  options = [];
  option;
  list: any;
  reformattedArray: any;
  usersClient: any;

  ngOnInit(): void {
    // this.typediseaseId = 5;
    if (this.typediseaseId === undefined || this.typediseaseId === null) {
      this.router.navigate(['/chan-doan/dau-hieu-chung']);
    } else {
      this.symptomsService.doSearchByClientSubclinical({typediseaseId: this.typediseaseId}).subscribe(res => {
        this.options = res.body.data.list;
        if (this.typediseaseId === 5 &&    this.options?.length > 0) {
          this.options[0].checked = true;
          this.lsView = this.options[0].symptomDTOList;
        }

        this.reformattedArray = this.options.map(obj => {
          const rObj = {
            id: null,
            symptomDTOList: null
          };
          rObj.id = obj.id;
          rObj.symptomDTOList = obj.symptomDTOList.map(ob1 => {
            const rObj1 = {
              id: null,
            };
            rObj1.id = ob1.id;
            return rObj1;
          });
          return rObj;
        });
      }, err => {
        console.log(err);
      });

    }
  }

  arr = [];
  arrId = [];

  removeItemOnce(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  lsView: any;

  onChange1(e) {
    console.log(e);
    console.log(this.options);
    for (let i = 0; i < this.options?.length; i++) {
      if (this.options[i].id === e) {
        this.lsView = this.options[i].symptomDTOList;
      }
    }
    this.arr = [];
    this.arrId = [];
  }

  onChange(e) {

    for (let i = 0; i < this.reformattedArray?.length; i++) {
      for (let j = 0; j < this.reformattedArray[i].symptomDTOList?.length; j++) {
        if (this.reformattedArray[i].symptomDTOList[j].id === e && this.arr.indexOf(e) === -1) {
          this.arr.push(e);
          if (this.arrId.indexOf(this.reformattedArray[i].id) === -1) {
            this.arrId.push(this.reformattedArray[i].id);
          } else {
            const finalArray = this.reformattedArray[i].symptomDTOList.map(function (obj) {
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

  typediseaseId: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialogService: NbDialogService,
              private toastr: NbToastrService,
              private logsEvaluateService: LogsEvaluateService,
              private translate: TranslateService,
              private activatedRoute: ActivatedRoute,
              private typeTestService: TypeTestService,
              private symptomsService: SymptomsService) {
    try {
      this.typediseaseId = this.router.getCurrentNavigation()?.extras.state.id;
      console.log(this.typediseaseId);
    } catch (e) {
      this.typediseaseId = null;
    }
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.key = params['key'];
    });
    this.usersClient = JSON.parse(localStorage.getItem('usersClient'));
    if (this.usersClient === null) {
      this.router.navigate(['/chan-doan']);
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
      console.log(res);
      if (res) {
        if (data !== null) {

        }
        this.router.navigate(['/chan-doan/giai-doan'], {state: {id: this.typediseaseId}});
      }
    });
  };

  come() {
    this.router.navigate(['/chan-doan/lam-sang'], {state: {id: this.typediseaseId}});
  }

  noNextLink(data) {
    this.dialogService.open(ConfirmDialogClientComponent, {
      context: {
        title: this.translate.instant('common.title_cd'),
        message: data.name,
        okTitle: this.translate.instant('common.kt'),
        cancelTitle: this.translate.instant('common.title_ql'),
        hideCancel1: false
      },
    }).onClose.subscribe(res => {
      if (res) {
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
      }
    });
  }

  noNextLink1(data) {
    this.dialogService.open(ConfirmDialogClientComponent, {
      context: {
        title: this.translate.instant('common.title_cd'),
        message: data.name,
        okTitle: this.translate.instant('common.kt'),
        cancelTitle: this.translate.instant('common.title_ql'),
      },
    }).onClose.subscribe(res => {
      if (res) {
        if (res === 'confirm') {
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
          this.router.navigate(['/danh-gia'], {state: {id: this.typediseaseId}});
        }
      }
    });
  }

  submitForm() {
    if ( this.arr?.length === 0) {
      this.toastr.danger('Vui lòng chọn triệu chứng để chẩn đoán bệnh!', this.translate.instant('common.title_notification'));
      return;
    }
    const obj = {
      listIdXn: this.arrId,
      arr: this.arr,
      amount: this.arrId?.length,
      typediseaseId: this.typediseaseId,
      lsIdXn: this.arrId?.sort().toString(),
      lsIdTt: this.arr?.sort().toString()
    };
    console.log(obj);

    this.typeTestService.searchXdClient(obj).subscribe(
      res => {
        console.log(res);
        const rs = res.body.data.list[0];
        if (this.typediseaseId === 6 || this.typediseaseId === 3) {
          if (rs.likStatus === 1) {
            this.nextLink(rs);
          } else {
            this.noNextLink1(rs);
          }
        } else {
          // this.noNextLink1(rs);

          if (rs.likStatus === 1) {
            this.noNextLink(rs);
          } else {
            this.noNextLink1(rs);
          }
        }
        // if (rs.likStatus === 1) {
        //   this.nextLink(rs);
        // } else {
        //   this.noNextLink(rs);
        // }
        // this.originalData = res.body.data.list;
      },
      (error) => {

        // this.loading = false;
      },
    );

    // try {
    //   const data = {
    //     id: this.option,
    //     type: 1
    //   };
    //   this.symptomsService.doSearchByClientSubclinical(data).subscribe((res) => {
    //     if (res) {
    //       if (data !== null) {
    //
    //       }
    //       this.router.navigate(['/chan-doan/lam-san'],  { state: { id: res.body.data.list[0].typediseaseId } });
    //     }
    //     console.log(res.body.data);
    //     //
    //     // if (res.body.data.list.likStatus === 1) {
    //     //   this.nextLink(res.body.data.list);
    //     // } else {
    //     //   this.noNextLink(res.body.data.list);
    //     // }
    //   }, (err) => {
    //     console.log(err);
    //   });
    // } catch (e) {
    //   this.toastr.danger('Có lỗi xảy ra trong quán trình chẩn đoán, vui lòng thử lại sau!', this.translate.instant('common.title_notification'));
    // }
  }
}
