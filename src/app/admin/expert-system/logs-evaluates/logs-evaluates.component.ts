import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {FormControl, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../@core/services/users.service';
import {HttpHeaders} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../../shares/directives/confirm-dialog/confirm-dialog.component';
import {SizeService} from '../../../@core/services/size.service';
import {LogsService} from '../../../@core/services/logs.service';
import {LogsEvaluateService} from '../../../@core/services/logs-evaluate.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-users',
  styleUrls: ['./logs-evaluates.component.scss'],
  templateUrl: './logs-evaluates.component.html',
})
export class LogsEvaluatesComponent implements OnInit {
  ngOnInit(): void {
    this.search(0);
  }

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private toastrService: NbToastrService,
    private userService: UsersService,
    private logsService: LogsEvaluateService) {
  }

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
    {name: 'common.table.item_name', prop: 'fullName', flexGrow: 0.7},
    {name: 'common.table.item_email', prop: 'mail', flexGrow: 0.9},
    {name: 'common.table.item_tel', prop: 'phone', flexGrow: 0.7},
    {name: 'common.table.item_name_evaluate', prop: 'nameEvaluate', flexGrow: 1},
    {name: 'common.table.item_name_type', prop: 'nameType', flexGrow: 1},
    {name: 'common.table.item_content', prop: 'content', flexGrow: 1.5},
    {name: 'common.table.item_update_time', prop: 'updateTime', flexGrow: 1},
  ];

  inputForm = new FormGroup({
    fullName: new FormControl(null, []),
    mail: new FormControl(null, []),
    phone: new FormControl(null, []),
    nameEvaluate: new FormControl(null, []),
    nameType: new FormControl(null, []),
    content: new FormControl(null, []),
    updateTime: new FormControl(null, [])
  });

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.search(pageInfo.offset);
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.page.count = data.count;
    this.page.offset = page || 0;
    this.rows = data.list || [];
  }


  search(pageToLoad: number) {
    this.isLoad = true;
    this.page.offset = pageToLoad;
    this.logsService.doSearch({
      page: this.page.offset,
      page_size: this.page.limit,
      updateTime: this.inputForm.get("updateTime").value,
      content: this.inputForm.get("content").value,
      nameType: this.inputForm.get("nameType").value,
      nameEvaluate: this.inputForm.get("nameEvaluate").value,
      phone: this.inputForm.get("phone").value,
      mail: this.inputForm.get("mail").value,
      fullName: this.inputForm.get("fullName").value
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

}
