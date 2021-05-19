import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {FormControl, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../@core/services/users.service';
import {HttpHeaders} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../../shares/directives/confirm-dialog/confirm-dialog.component';
import {SizeService} from '../../../@core/services/size.service';
import {GeneralSignsUpdateComponent} from './general-signs-update/general-signs-update.component';
import {CategoriesService} from '../../../@core/services/categories.service';
import {TypeDiseaseService} from '../../../@core/services/type-disease.service';
import {MapPopupComponent} from './map-popup/map-popup.component';
import {SymptomsService} from '../../../@core/services/symptoms.service';
import {StatusDiseaseService} from '../../../@core/services/status-disease.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-users',
  styleUrls: ['./general-signs.component.scss'],
  templateUrl: './general-signs.component.html',
})
export class GeneralSignsComponent implements OnInit {
  ngOnInit(): void {
    // this.statusDiseaseService.query().subscribe(
    //   (res) => {
    //     this.listType = res.body.data.list;
    //     this.isLoad = false;
    //   },
    //   (error) => {
    //     this.isLoad = false;
    //   },
    //   () => this.isLoad = false,
    // );
    this.symptomsService.doSearch({
      type: 0,
      status: 1,
    }).subscribe(
      (res) => {
        const result = res.body.data.list.map(({ name }) => name)
        this.symptoms = result.join(' - ');
        this.isLoad = false;
      },
      (error) => {
        this.isLoad = false;
      },
      () => this.isLoad = false,
    );
    this.search(0);
  }

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private toastrService: NbToastrService,
    private userService: UsersService,
    private statusDiseaseService: StatusDiseaseService,
    private symptomsService: SymptomsService,
    private dialogService: NbDialogService) {
  }
  listType = [];
  symptoms: any;
  isLoad: boolean;
  listStatus = [
    {name: 'common.status.1', code: 1},
    {name: 'common.status.0', code: 0}
  ];
  rows: Object[];
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  columns = [
    {name: 'common.table.item_number', prop: 'index', flexGrow: 0.3},
    {name: 'common.table.item_general_signs_name', prop: 'name', flexGrow: 1.5},
    {name: 'common.table.item_general_signs_determined', prop: 'determined', flexGrow: 1},
    {name: 'common.table.item_description', prop: 'description', flexGrow: 1.5},
    {name: 'common.table.item_status', prop: 'status', flexGrow: 1},
    {name: 'common.table.item_update_time', prop: 'updateTime', flexGrow: 1},
    {name: 'common.table.item_action', prop: 'action_btn', flexGrow: 1}
  ];

  inputForm = new FormGroup({
    name: new FormControl(null, []),
    code: new FormControl(null, []),
    updateTime: new FormControl(null, []),
    status: new FormControl(null, [])
  });

  openMapModule(data) {
    const openMap = this.dialogService.open(MapPopupComponent, {
      context: {
        title: this.translate.instant('common.table.item_test'),
        data: data,
      }
    });
    openMap.onClose.subscribe(value => {
      this.search(0);
      // this.toastr.success(this.translate.instant('common.content_map_action_success'),
      this.translate.instant('objects.title_notification');
    });
  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.search(pageInfo.offset);
  }

  editUsers(data) {
    let title;
    if (data == null) {
      title = this.translate.instant('general_signs.title_add');
    } else {
      title = this.translate.instant('general_signs.title_edit');
    }
    this.dialogService.open(GeneralSignsUpdateComponent, {
      context: {
        title: title,
        data: data,
      },
      dialogClass: 'modal-full',
    }).onClose.subscribe(
      value => {
        if (value) {
          if (data == null) {
            this.toastrService.success(this.translate.instant('general_signs.content_add_success'),
              this.translate.instant('common.title_notification'));
          } else {
            this.toastrService.success(this.translate.instant('general_signs.content_edit_success'),
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
    this.rows = data.list || [];
  }

  search(pageToLoad: number) {
    this.isLoad = true;
    this.page.offset = pageToLoad;
    this.statusDiseaseService.doSearch({
      page: this.page.offset,
      page_size: this.page.limit,
      name: this.inputForm.get("name").value,
      code: this.inputForm.get("code").value,
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
        message: this.translate.instant('general_signs.title_delete') + ' ' + data.name
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.isLoad = true;
        this.statusDiseaseService.delete(data.id).subscribe(() => {
          this.toastrService.success(this.translate.instant('general_signs.delete_success'),
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
