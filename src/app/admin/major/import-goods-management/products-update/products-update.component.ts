import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../../../@core/mock/toastr-service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SizeService} from '../../../../@core/services/size.service';
import {TranslateService} from '@ngx-translate/core';
import {TreeviewConfig, TreeviewItem} from 'ngx-treeview';
import {ObjectsService} from '../../../../@core/services/objects.service';
import {ProductsService} from '../../../../@core/services/products.service';
import {ColumnChangesService, DimensionsHelper, ScrollbarHelper} from '@swimlane/ngx-datatable';
import {ColumnGridImportComponent} from './column-grid-import/column-grid-import.component';
import {Page} from '../../../../@core/model/page.model';
import * as moment from 'moment';
import {SuppliersService} from '../../../../@core/services/suppliers.service';
import {ImportProductsService} from '../../../../@core/services/importProducts.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-size-update',
  styleUrls: ['./products-update.component.scss'],
  templateUrl: './products-update.component.html',
  providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
})
export class ProductsUpdateComponent implements OnInit {

  @Input() reportConfig;
  @ViewChild('inputElement', {static: false}) fileInput: ElementRef;
  @ViewChild('fileLabel', {static: false}) fileLabel: ElementRef;
  @ViewChild('columnGridImportComponent', {static: false}) columnGridImportComponent: ColumnGridImportComponent;


  lstRole = [];
  inputProduct: any;
  inputSizeColor: any;
  itemRoles: any;
  loading = false;
  title: string;
  data: any;
  lstRole1 = [];
  lstRole2 = [];
  item: TreeviewItem[] = [];
  treeViewConfig = TreeviewConfig.create({
    hasFilter: true,
    hasAllCheckBox: false,
    maxHeight: 300,
    hasCollapseExpand: true,
  });
  rows = [];

  listStatus = [
    {name: 'common.state.0', code: 0},
    {name: 'common.state.1', code: 1},
    {name: 'common.state.2', code: 2},
    {name: 'common.state.3', code: 3},
  ];
  arr = [];


  constructor(
    private objectsService: ObjectsService,
    private toastr1: ToastrService,
    private toastr: NbToastrService,
    private translate: TranslateService,
    public ref: NbDialogRef<ProductsUpdateComponent>,
    private sizeService: SizeService,
    private suppliersService: SuppliersService,
    private importProductsService: ImportProductsService,
    private productsService: ProductsService,
  ) {
  }


  ngOnInit(): void {
    console.log(this.data);
    this.inputProduct = new FormGroup({
      id: new FormControl(this.data?.id, []),
      supplierId: new FormControl(null, [Validators.required]),
      // code: new FormControl(null, [Validators.required]),
      importCustomDTOList: new FormControl(null, [Validators.required]),
      description: new FormControl('Nhập hàng ngày ' + moment(new Date()).format('DD/MM/YYYY'), []),
      // objectsId: new FormControl(this.data?.objectsId, [Validators.required])
    });
    this.suppliersService.query().subscribe(res => {
      this.lstRole1 = res.body.data.list;
    }, err => {
    });
    if (this.data) {
      this.inputProduct.patchValue(this.data);
    }
    this.getParenTree(this.data?.type ? this.data.type : 1);
    if (this.data != null) {
      this.searchData(this.page, null, null, this.data?.id);
    }
  };

  parentIdChange($event) {
    this.inputProduct.get('objectsId').setValue($event);
  }


  getParenTree(e: Number) {
    this.loading = true;
    this.objectsService.query().subscribe(res => {
        const result = res.body.data.list.filter(function (hero) {
          return hero.type === e;
        });
        this.item = this.formatDataTree(result, 0);
      }, (error) => {
        this.loading = false;
      },
      () => this.loading = false);
  }

  formatDataTree(data, parentId) {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      if (dataItem.parentId === parentId) {
        let children = [];
        if (dataItem.id != null) {
          children = this.formatDataTree(data, dataItem.id);
        }
        if (children.length > 0) {
          dataItem.children = children;
        } else {
          dataItem.children = null;
        }
        const dataTreeview = new TreeviewItem({text: dataItem.name, value: dataItem.id, children: dataItem.children});
        arr.push(dataTreeview);
      }
    }
    return arr;
  }


  submit() {
    this.inputProduct.markAllAsTouched();
    if (this.inputProduct.valid) {
      this.loading = true;
      if (this.data == null) {
        // this.inputProduct.get('status').setValue(1);
        console.log(this.inputProduct.value);
        this.importProductsService.insert1(this.inputProduct.value).subscribe(
          (value) => this.ref.close(value),
          (error) => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false
        );
      } else {
        this.productsService.update(this.inputProduct.value).subscribe(
          (value) => this.ref.close(value),
          (error) => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false,
        );
      }
    } else {
    }
  }

  cancel() {
    this.ref.close();
  }

  searchData(page, time, addRow, id) {
    this.importProductsService.doSearchByCode(id).subscribe((res: any) => {
      console.log(res.body);
      this.rows = res.body.map(data => {
        const result = {};
        this.columns.forEach((column, index) => {
          if (column.dataType === 'idObjects' && data[index]) {
            result[column.columnName] = data[index];
          } else {
            result[column.columnName] = data[index];
          }
        });
        console.log(result)
        return result;
      });
    })

    //   });

    const totalElements = Number(10);
    this.page = new Page(Math.pow(2, 31) - 1, totalElements, this.totalPages(totalElements, Math.pow(2, 31) - 1), 0);
    this.editing = [];
    if (addRow) {
      this.addNewRow();
    }
    setTimeout(this.calcHeightDatatable, 100);
    // });
  }

  listValue = [];
  objValue = {
  };

  onValue(e) {
    const objValue = {
      code: null,
      name: null,
      amount: null,
      idSize: null,
      importPrice: null,
      idObjects: null,
    }
    // console.log(e);
    if (e?.code !== undefined) {
      objValue.code = e.code;
    }
    objValue.name = e.name;
    objValue.amount = e.amount;
    objValue.idSize = e.idSize;
    objValue.importPrice = e.importPrice;
    objValue.idObjects = e.idObjects;
    console.log(objValue);
    this.listValue.push(objValue);
    this.inputProduct.get('importCustomDTOList').setValue(this.listValue);
  }

  onAddRow() {
    if (this.page.totalPages > 1 && this.page.pageNumber !== this.page.totalPages - 1) {
      this.page.pageNumber = this.page.totalPages - 1;
      this.searchData(this.page, null, true, null);
      return;
    }
    this.addNewRow();
  }

  totalPages(totalElements, size) {
    const count = totalElements < 1 ? 1 : Math.ceil(totalElements / size);
    return Math.max(count || 0, 1);
  }

  addNewRow() {
    this.page.totalElements = this.page.totalElements + 1;
    const newData = {};
    for (let i = 0; i < this.columns.length; i++) {
      newData[this.columns[i]] = null;
    }
    if (this.rows.length === this.page.size) {
      this.page.pageNumber++;
      this.page = new Page(5, this.page.totalElements, this.totalPages(this.page.totalElements, 5), this.page.pageNumber);
      this.rows = [newData];
      this.editing = [newData];
    } else {
      this.editing[this.rows.length] = newData;
      this.rows[this.rows.length] = newData;
    }
    this.rows = [...this.rows];
    const that = this;
    setTimeout(function () {
      that.calcHeightDatatable();
    }, 2000);
  }

  collapseSearchFrm = false;
  editing = [];
  mapRef: any;
  columns: any = [
    {id: 6014, columnName: 'id', title: 'id', isRequire: 0, isTimeColumn: 0, isShow: 1, dataType: 'BIGINT'},
    {id: 6015, columnName: 'code', title: 'Mã sản phẩm', isRequire: 0, isTimeColumn: 0, isShow: 1, dataType: 'LONG'},
    {id: 6015, columnName: 'name', title: 'Tên sản phẩm', isRequire: 0, isTimeColumn: 0, isShow: 1, dataType: 'LONG'},
    {
      id: 6015,
      columnName: 'importPrice',
      title: 'Giá nhập',
      isRequire: 0,
      isTimeColumn: 0,
      isShow: 1,
      dataType: 'LONG'
    },
    {id: 6015, columnName: 'idObjects', title: 'Danh mục', isRequire: 0, isTimeColumn: 0, isShow: 1, dataType: 'OBJ'},
    {id: 6015, columnName: 'idSize', title: 'Kích thước', isRequire: 0, isTimeColumn: 0, isShow: 1, dataType: 'SIZE'},
    {id: 6015, columnName: 'amount', title: 'Số lượng', isRequire: 0, isTimeColumn: 0, isShow: 1, dataType: 'LONG'},
  ];
  rows1: any = [];
  page = new Page();


  calcHeightDatatable() {
    const dt = document.getElementById('column-grid-import') as HTMLElement;
    const dtBody = document.querySelector('#column-grid-import .datatable-body') as HTMLElement;
    const dtHeader = document.querySelector('#column-grid-import .datatable-header') as HTMLElement;
    const dtFooter = document.querySelector('#column-grid-import .datatable-footer') as HTMLElement;
    if (dt && dtBody && dtHeader && dtFooter) {
      dt.style.height = (window.innerHeight - (this.collapseSearchFrm ? 160 : 340) - 16) + 'px';
      const dtBodyHeight = dt.clientHeight - dtHeader.clientHeight - dtFooter.clientHeight;
      dtBody.style.height = dtBodyHeight + 'px';
    }
  }

  setPage($event: any) {
    this.page.pageNumber = $event.offset;
    this.searchData(this.page, null, null, null);
  }

  actionSetPage($event: any) {
    this.setPage($event);
    const that = this;
    setTimeout(function () {
      that.calcHeightDatatable();
    }, 2000);
  }

  checkValidate(rows: any) {
    for (const row of rows) {
      if (this.columnGridImportComponent && !this.validRow(row, this.columns)) return false;
    }
    return true;
  }

  validRow(row, columnDatas) {
    for (let i = 0; i < columnDatas.length; i++) {
      const column = columnDatas[i];
      if (column.columnName === 'id') continue;
      let value = row[column.columnName] + '';
      if (column.isRequire === 1 && (!value || value === 'null' || value === '')) {
        this.toastr.danger(`${column.title} là trường bắt buộc`, this.translate.instant('common.title_notification'));
        return false;
      }
      if (!value) continue;
      value = value.trim();
      switch (column.dataType) {
        case 'INT':
        case 'LONG':
        case 'BIGINT':
          if (value !== undefined && value !== 'null' && value !== parseInt(value, 10) + '') {
            this.toastr.danger(`${column.title} phải là kiểu số nguyên`, this.translate.instant('common.title_notification'));
            return false;
          }
          break;
        case 'DOUBLE':
          if (value !== undefined && value !== 'null' && value !== parseFloat(value) + '') {
            this.toastr.danger(`${column.title} phải là kiểu số thực`, this.translate.instant('common.title_notification'));
            return false;
          }
          break;
        case 'DATE':
          if (value !== undefined && value !== 'null') {
            const date = moment(value, 'YYYY-MM-DD');
            if (date.format('YYYY-MM-DD') !== value) {
              this.toastr.danger(`${column.title} phải là kiểu ngày tháng theo định dạng yyyy-MM-dd`, this.translate.instant('common.title_notification'));
              return false;
            }
          }
          break;
      }
    }
    return true;
  }
}
