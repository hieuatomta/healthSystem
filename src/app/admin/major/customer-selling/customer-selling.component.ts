import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {FormControl, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../@core/services/users.service';
import {HttpHeaders} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../../shares/directives/confirm-dialog/confirm-dialog.component';
import {SupplierUpdateComponent} from './supplier-update/supplier-update.component';
import {SuppliersService} from '../../../@core/services/suppliers.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ExcelService} from './excel.service';
import {StatisticalService} from '../../../@core/services/statistical.service';
import {formatDate} from '@angular/common';
import {checkVaidDate} from '../../../validator';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-users',
  styleUrls: ['./customer-selling.component.scss'],
  templateUrl: './customer-selling.component.html',
})
export class CustomerSellingComponent implements OnInit {
  ngOnInit(): void {
    this.search(0);
    // this.sizeService.doSearch({}).subscribe(res => {
    //   console.log(res), err => {
    //     console.log(err);
    //   };
    // });
  }

  @ViewChild('dataTable') public dataTable: DatatableComponent;
  // excelHeaders: string[] = [this.translate.instant('common.table.item_suppliers_code'), 'Age', 'Email', 'Contact Number', 'Location'];
  // templateToExcel: string[][] = [this.excelHeaders, ['1', '2', '3', '1', '2', '3'], ['1', '2', '3', '1', '2', '3'], ['1', '2', '3', '1', '2', '3']];
  exportAsCSV() {
    // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.templateToExcel);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.writeFile(wb, 'san-phan-ban-chay' + '.xlsx');
    // if (this.rows?.length > 0) {
    //   for (let i = 0; i < this.rows?.length; i++) {
    //     const arr = [];
    //     console.log(Object.values(this.rows[i]));
    //     // arr.push(this.rows.)
    //   }
    // }
    this.excelService.exportAsExcelFile(this.rows, 'top_khach_hang_data');
  }

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private toastrService: NbToastrService,
    private userService: UsersService,
    private suppliersService: SuppliersService,
    private excelService: ExcelService,
    private statisticalService: StatisticalService,
    private dialogService: NbDialogService) {
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
    {name: 'Họ và tên', prop: 'fullName', flexGrow: 1},
    {name: 'Email', prop: 'mail', flexGrow: 1.5},
    {name: 'Số Lượng Sản Phẩm Mua', prop: 'totalOrder', flexGrow: 1.5},
    {name: 'Số tiền chi tiêu', prop: 'totalPrice', flexGrow: 1},
  ];

  inputForm = new FormGroup({
    fromTime: new FormControl(null, []),
    toTime: new FormControl(null, []),
    soLuong: new FormControl(10, []),
  });

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.search(pageInfo.offset);
  }

  editUsers(data) {
    let title;
    if (data == null) {
      title = this.translate.instant('suppliers.title_add');
    } else {
      title = this.translate.instant('suppliers.title_edit');
    }
    this.dialogService.open(SupplierUpdateComponent, {
      context: {
        title: title,
        data: data,
      },
      dialogClass: 'modal-full',
    }).onClose.subscribe(
      value => {
        if (value) {
          if (data == null) {
            this.toastrService.success(this.translate.instant('suppliers.content_add_success'),
              this.translate.instant('common.title_notification'));
          } else {
            this.toastrService.success(this.translate.instant('suppliers.content_edit_success'),
              this.translate.instant('common.title_notification'));
          }
          this.search(0);
        }
      }
    );
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.page.count = data?.length;
    this.page.offset = page || 0;
    if (data?.length > 0) {
      for (let i = 0; i < data?.length; i++) {
        data[i].totalPrice = data[i].totalPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
      }
    }
    this.rows = data || [];
  }

  nowYear = formatDate(new Date(), 'dd/MM/yyyy', 'en-us');
  lastYear = formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), 'dd/MM/yyyy', 'en-us');

  dateDate = {
    fromTime: null,
    toTime: null,
    soLuong: null,
  };

  changeValueEndDate(event) {
    const value = event.target.value;
    if (!checkVaidDate(value)) {
      return this.inputForm.get('toTime').setErrors({date: true});
    }
  }

  changeValueStartDate(event) {
    const value = event.target.value;
    if (!checkVaidDate(value)) {
      return this.inputForm.get('fromTime').setErrors({date: true});
    }
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  search(pageToLoad: number) {
    this.isLoad = true;
    this.page.offset = pageToLoad;
    if (this.inputForm.get('fromTime').value === null) {
      this.dateDate.fromTime = this.formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
    } else {
      this.dateDate.fromTime = this.formatDate(this.inputForm.get('fromTime').value);
    }
    if (this.inputForm.get('toTime').value === null) {
      this.dateDate.toTime = this.formatDate(new Date());
    } else {
      this.dateDate.toTime = this.formatDate(this.inputForm.get('toTime').value);
    }
    if (this.inputForm.get('soLuong').value === null) {
      this.dateDate.soLuong = 10;
    } else {
      this.dateDate.soLuong = this.inputForm.get('soLuong').value;
    }
    this.statisticalService.getTopKhachHang(this.dateDate
    ).subscribe(
      (res) => {
        console.log(res);
        this.onSuccess(res.body, res.headers, pageToLoad);
        this.isLoad = false;
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
        message: this.translate.instant('suppliers.title_delete') + ' ' + data.name
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.isLoad = true;
        this.suppliersService.delete(data.id).subscribe(() => {
          this.toastrService.success(this.translate.instant('suppliers.delete_success'),
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
