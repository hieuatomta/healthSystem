import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {TranslateService} from '@ngx-translate/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {UsersService} from '../../../@core/services/users.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ConfirmDialogComponent} from '../../../shares/directives/confirm-dialog/confirm-dialog.component';
import {ProductsService} from '../../../@core/services/products.service';
import {ProductsUpdateComponent} from './products-update/products-update.component';
import {MapPopupComponent} from './map-popup/map-popup.component';
import {MapImageProductComponent} from './map-image-product/map-image-product.component';
import {OrderService} from '../../../@core/services/order.service';

class RequestOptions {
  constructor(param: { headers: Headers }) {

  }

}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-image-management',
  styleUrls: ['./export-goods-management.component.scss'],
  templateUrl: './export-goods-management.component.html',
})
export class ExportGoodsManagementComponent implements OnInit {
  ngOnInit(): void {
    this.search(0);
  }

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private toastrService: NbToastrService,
    private userService: UsersService,
    private orderService: OrderService,
    private dialogService: NbDialogService) {
  }

  isLoad: boolean;
  listStatus = [
    {name: 'common.statusOrder.0', code: 0},
    {name: 'common.statusOrder.1', code: 1},
    {name: 'common.statusOrder.2', code: 2},
  ];
  rows: Object[];
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  columns = [
    {name: 'common.table.item_number', prop: 'index', flexGrow: 0.3},
    {name: 'common.table.item_order_code', prop: 'code', flexGrow: 1},
    {name: 'common.table.item_contact', prop: 'contact', flexGrow: 1.5},
    {name: 'common.table.address', prop: 'address', flexGrow: 1},
    {name: 'common.table.item_status', prop: 'status', flexGrow: 1},
    {name: 'common.table.item_update_time', prop: 'updateTime', flexGrow: 1},
    {name: 'common.table.item_action', prop: 'action_btn', flexGrow: 1}
  ];

  inputForm = new FormGroup({
    address: new FormControl(null, []),
    code: new FormControl(null, []),
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
      title = this.translate.instant('products.title_add');
    } else {
      title = this.translate.instant('products.title_edit');
    }
    this.dialogService.open(ProductsUpdateComponent, {
      context: {
        title: title,
        data: data,
      },
      dialogClass: 'modal-full',
    }).onClose.subscribe(
      value => {
        if (value) {
          if (data == null) {
            this.toastrService.success(this.translate.instant('products.content_add_success'),
              this.translate.instant('common.title_notification'));
          } else {
            this.toastrService.success(this.translate.instant('products.content_edit_success'),
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
    this.orderService.doSearch({
      page: this.page.offset,
      page_size: this.page.limit,
      address: this.inputForm.get("address").value,
      code: this.inputForm.get("code").value,
      updateTime: this.inputForm.get("updateTime").value,
      status: this.inputForm.get("status").value,
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
        message: this.translate.instant('products.title_delete') + ' ' + data.name
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.isLoad = true;
        this.orderService.delete(data.id).subscribe(() => {
          this.toastrService.success(this.translate.instant('products.delete_success'),
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
