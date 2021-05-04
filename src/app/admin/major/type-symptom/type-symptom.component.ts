import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {FormControl, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../@core/services/users.service';
import {HttpHeaders} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../../shares/directives/confirm-dialog/confirm-dialog.component';
import {SizeService} from '../../../@core/services/size.service';
import {TypeSymptomUpdateComponent} from './type-symptom-update/type-symptom-update.component';
import {CategoriesService} from '../../../@core/services/categories.service';
import {TypeDiseaseService} from '../../../@core/services/type-disease.service';
import {SymptomsService} from '../../../@core/services/symptoms.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-users',
  styleUrls: ['./type-symptom.component.scss'],
  templateUrl: './type-symptom.component.html',
})
export class TypeSymptomComponent implements OnInit {
  ngOnInit(): void {
    this.search(0);
  }

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private toastrService: NbToastrService,
    private userService: UsersService,
    private typeDiseaseService: SymptomsService,
    private dialogService: NbDialogService) {
  }

  isLoad: boolean;
  listStatus = [
    {name: 'common.status.1', code: 1},
    {name: 'common.status.0', code: 0}
  ];

  listType = [
    {name: 'common.typeSymptom.0', code: 0},
    {name: 'common.typeSymptom.1', code: 1},
    {name: 'common.typeSymptom.2', code: 2},
    {name: 'common.typeSymptom.3', code: 3},
    {name: 'common.typeSymptom.4', code: 4}
  ];

  rows: Object[];
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  columns = [
    {name: 'common.table.item_number', prop: 'index', flexGrow: 0.3},
    {name: 'common.table.item_type_symptom_name', prop: 'name', flexGrow: 1.5},
    {name: 'common.table.item_type_symptom_type', prop: 'type', flexGrow: 1},
    {name: 'common.table.item_status', prop: 'status', flexGrow: 1},
    {name: 'common.table.item_update_time', prop: 'updateTime', flexGrow: 1},
    {name: 'common.table.item_action', prop: 'action_btn', flexGrow: 1}
  ];

  inputForm = new FormGroup({
    name: new FormControl(null, []),
    type: new FormControl(null, []),
    updateTime: new FormControl(null, []),
    status: new FormControl(null, [])
  });

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.search(pageInfo.offset);
  }

  editUsers(data) {
    let title;
    if (data == null) {
      title = this.translate.instant('type_symptom.title_add');
    } else {
      title = this.translate.instant('type_symptom.title_edit');
    }
    this.dialogService.open(TypeSymptomUpdateComponent, {
      context: {
        title: title,
        data: data,
      },
      dialogClass: 'modal-full',
    }).onClose.subscribe(
      value => {
        if (value) {
          if (data == null) {
            this.toastrService.success(this.translate.instant('type_symptom.content_add_success'),
              this.translate.instant('common.title_notification'));
          } else {
            this.toastrService.success(this.translate.instant('type_symptom.content_edit_success'),
              this.translate.instant('common.title_notification'));
          }
          this.search(0);
        }
      }
    );
  }
  copy(data) {
    data.id = null;
    data.name = null;
    let title;
    console.log(data);
    if (data.id == null) {
      title = this.translate.instant('type_symptom.title_add');
    } else {
      title = this.translate.instant('type_symptom.title_edit');
    }
    this.dialogService.open(TypeSymptomUpdateComponent, {
      context: {
        title: title,
        data: data,
      },
      dialogClass: 'modal-full',
    }).onClose.subscribe(
      value => {
        if (value) {
          if (data.id == null) {
            this.toastrService.success(this.translate.instant('type_symptom.content_add_success'),
              this.translate.instant('common.title_notification'));
          } else {
            this.toastrService.success(this.translate.instant('type_symptom.content_edit_success'),
              this.translate.instant('common.title_notification'));
          }
          this.search(0);
        }
      }
    );
  }
  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.page.count = data.count;
    this.page.offset = page || 0;
    console.log(data.list)
    this.rows = data.list || [];
  }

  search(pageToLoad: number) {
    this.isLoad = true;
    this.page.offset = pageToLoad;
    this.typeDiseaseService.doSearch({
      page: this.page.offset,
      page_size: this.page.limit,
      name: this.inputForm.get("name").value,
      type: this.inputForm.get("type").value,
      updateTime: this.inputForm.get("updateTime").value,
      status: this.inputForm.get("status").value,
    }).subscribe(
      (res) => {
        this.onSuccess(res.body.data, res.headers, pageToLoad);
      },
      (error) => {
        this.isLoad = false;
      },
      () => this.isLoad = false,
    );
  }


  deleteUsers(data) {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('common.title_notification'),
        message: this.translate.instant('type_symptom.title_delete') + ' ' + data.name
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.isLoad = true;
        this.typeDiseaseService.delete(data.id).subscribe(() => {
          this.toastrService.success(this.translate.instant('type_symptom.delete_success'),
            this.translate.instant('common.title_notification'));
          this.search(0);
          this.isLoad = false;
        }, (err) => {
          this.toastrService.success(err.message),
            this.translate.instant('common.title_notification');
          this.isLoad = false;
        });
      }
    });

  }
}
