import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SymptomsService} from '../../../../@core/services/symptoms.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';


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

  ngOnInit(): void {
    this.symptomsService.doSearchByClientSubclinical({typediseaseId: 3}).subscribe(res => {
      this.options = res.body.data.list;
      console.log(res), err => {
        console.log(err);
      };

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
      console.log(this.reformattedArray);
    });
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
      // if (this.key?.trim() !== 'dau-hieu-nhan-biet') {
      //   this.router.navigate(['/trang-chu']);
      // } else if (this.key?.trim() === 'dau-hieu-chung') {
      //   this.router.navigate(['/chan-doan/dau-hieu-chung']);
      // }
    });
  }


  submitForm() {
    console.log(this.arr);

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
