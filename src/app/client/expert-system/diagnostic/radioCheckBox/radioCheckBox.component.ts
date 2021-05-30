import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SymptomsService} from '../../../../@core/services/symptoms.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./radioCheckBox.component.scss'],
  templateUrl: './radioCheckBox.component.html',
})
export class RadioCheckBoxComponent implements OnInit {
  key: any;
  options = [];
  option;
  usersClient: any;

  ngOnInit(): void {
    this.symptomsService.doSearchByClient({type: 1, status: 1}).subscribe(res => {
      this.options = res.body;
      console.log(res), err => {
        console.log(err);
      };
    });
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialogService: NbDialogService,
              private toastr: NbToastrService,
              private translate: TranslateService,
              private activatedRoute: ActivatedRoute,
              private symptomsService: SymptomsService) {

    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.key = params['key'];
      if (this.key?.trim() !== 'dau-hieu-nhan-biet') {
        this.router.navigate(['/trang-chu']);
      } else if (this.key?.trim() === 'dau-hieu-chung') {
        this.router.navigate(['/chan-doan/dau-hieu-chung']);
      }
    });
    this.usersClient = JSON.parse(localStorage.getItem('usersClient'));
    if (  this.usersClient === null) {
      this.router.navigate(['/chan-doan']);
    }
  }

  come() {
    this.router.navigate(['/chan-doan/dau-hieu-chung']);
  }

  submitForm() {
    console.log(this.option);
    try {
      if (this.option === undefined || this.option === null) {
        this.toastr.danger('Vui lòng chọn triệu chứng để chẩn đoán bệnh!', this.translate.instant('common.title_notification'));
        return;
      }
      const data = {
        id: this.option,
        type: 1
      };
      this.symptomsService.doSearchByClient(data).subscribe((res) => {
        if (res) {
          if (data !== null) {

          }
          this.router.navigate(['/chan-doan/lam-sang'], {state: {id: res.body[0].typediseaseId}});
        }
        console.log(res.body.data);
        //
        // if (res.body.data.list.likStatus === 1) {
        //   this.nextLink(res.body.data.list);
        // } else {
        //   this.noNextLink(res.body.data.list);
        // }
      }, (err) => {
        console.log(err);
      });
    } catch (e) {
      this.toastr.danger('Có lỗi xảy ra trong quán trình chẩn đoán, vui lòng thử lại sau!', this.translate.instant('common.title_notification'));
    }
  }
}
