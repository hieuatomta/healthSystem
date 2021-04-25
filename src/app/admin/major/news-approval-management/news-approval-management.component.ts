import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {TranslateService} from '@ngx-translate/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {UsersService} from '../../../@core/services/users.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ConfirmDialogComponent} from '../../../shares/directives/confirm-dialog/confirm-dialog.component';
import {ProductsService} from '../../../@core/services/products.service';
import {NewsApprovalUpdateComponent} from './news-approval-update/news-approval-update.component';
import {MapPopupComponent} from './map-popup/map-popup.component';
import {MapImageProductComponent} from './map-image-product/map-image-product.component';

class RequestOptions {
  constructor(param: { headers: Headers }) {

  }

}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-image-management',
  styleUrls: ['./news-approval-management.component.scss'],
  templateUrl: './news-approval-management.component.html',
})
export class NewsApprovalManagementComponent implements OnInit {
  ngOnInit(): void {
    this.search(0);
  }

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private toastrService: NbToastrService,
    private userService: UsersService,
    private productsService: ProductsService,
    private dialogService: NbDialogService) {
  }

  isLoad: boolean;
  listStatus = [
    {name: 'common.state.0', code: 0},
    {name: 'common.state.1', code: 1},
    {name: 'common.state.2', code: 2},
  ];
  rows: Object[];
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  columns = [
    {name: 'common.table.item_number', prop: 'index', flexGrow: 0.3},
    {name: 'common.table.item_news_code', prop: 'code', flexGrow: 1},
    {name: 'common.table.item_news_name', prop: 'title', flexGrow: 1.5},
    {name: 'common.table.item_news_paren_object', prop: 'categoryName', flexGrow: 1},
    {name: 'common.table.item_news_users_name', prop: 'usersName', flexGrow: 1},
    {name: 'common.table.item_news_highlights', prop: 'highlights', flexGrow: 1},
    {name: 'common.table.item_status', prop: 'status', flexGrow: 1},
    {name: 'common.table.item_reasonForRefusal', prop: 'reasonForRefusal', flexGrow: 1},
    {name: 'common.table.item_update_time', prop: 'updateTime', flexGrow: 1},
    {name: 'common.table.item_action', prop: 'action_btn', flexGrow: 1}
  ];

  inputForm = new FormGroup({
    name: new FormControl(null, []),
    code: new FormControl(null, []),
    updateTime: new FormControl(null, []),
    status: new FormControl(null, [])
  });

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.search(pageInfo.offset);
  }

  editUsers(row) {
    console.log(row);
    const data = {
      id: row.id,
      status: 0,
      reasonForRefusal: null
    };
    this.isLoad = true;
    console.log(data);
    this.productsService.newsRefuse(data).subscribe(
      (value) => {
        this.toastrService.success(this.translate.instant('news.delete_success'));
        this.search(0);
      },
      (error) => {
        this.toastrService.danger(error.error.message, this.translate.instant('common.title_notification'));
        this.isLoad = false;
      },
      () => this.isLoad = false
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
    this.productsService.doSearchAll({
      page: this.page.offset,
      page_size: this.page.limit,
      name: this.inputForm.get('name').value,
      code: this.inputForm.get('code').value,
      updateTime: this.inputForm.get('updateTime').value,
      status: this.inputForm.get('status').value,
    }).subscribe(
      (res) => {
        console.log(res);
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
        message: this.translate.instant('news.title_delete') + ' ' + data.name
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.isLoad = true;
        this.productsService.delete(data.id).subscribe(() => {
          this.toastrService.success(this.translate.instant('news.delete_success'),
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
  highlightsNews(data) {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('common.title_notification'),
        message: this.translate.instant('news.title_highlights') + ' ' + data.name
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.isLoad = true;
        this.productsService.highlights(data.id).subscribe(() => {
          this.toastrService.success(this.translate.instant('news.highlights_success'),
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
  offHighlightsNews(data) {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('common.title_notification'),
        message: this.translate.instant('news.title_offHighlights') + ' ' + data.name
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.isLoad = true;
        this.productsService.offHighlights(data.id).subscribe(() => {
          this.toastrService.success(this.translate.instant('news.offHighlights_success'),
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


  refuse(data) {
    const openMap = this.dialogService.open(NewsApprovalUpdateComponent, {
      context: {
        title: this.translate.instant('common.table.item_reasonForRefusal'),
        data: data,
      }
    });
    openMap.onClose.subscribe(value => {
      this.search(0);
      // this.toastr.success(this.translate.instant('common.content_map_action_success'),
      this.translate.instant('objects.title_notification');
    });
  }

  openMapModule(data) {
    const openMap = this.dialogService.open(MapPopupComponent, {
      context: {
        title: this.translate.instant('common.table.item_size_color'),
        data: data,
      }
    });
    openMap.onClose.subscribe(value => {
      this.search(0);
      // this.toastr.success(this.translate.instant('common.content_map_action_success'),
      this.translate.instant('objects.title_notification');
    });
  }

  openMapModuleImage(data) {
    const openMap = this.dialogService.open(MapImageProductComponent, {
      context: {
        title: this.translate.instant('common.table.item_image'),
        data: data,
      }
    });
    openMap.onClose.subscribe(value => {
      this.search(0);
      // this.toastr.success(this.translate.instant('common.content_map_action_success'),
      this.translate.instant('objects.title_notification');
    });
  }
}
