import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {SizeService} from '../../../../../@core/services/size.service';
import {TreeviewConfig, TreeviewItem} from 'ngx-treeview';
import {ObjectsService} from '../../../../../@core/services/objects.service';

@Component({
  selector: 'ngx-column-grid-import',
  templateUrl: './column-grid-import.component.html',
  styleUrls: ['./column-grid-import.component.scss']
})
export class ColumnGridImportComponent implements OnInit, OnChanges {

  moment = moment;
  @Input() rows: any = [];
  @Output() rowsChange = new EventEmitter();

  @Input() columns: any;
  @Input() mapRef: any;
  @Input() page: any;
  @Input() editing: any = [];

  @Output() onValues = new EventEmitter();
  @Output() onSetPage = new EventEmitter();
  @Output() onAddRow = new EventEmitter();

  addRowFlg = false;
  @Input() reportId: any;
  @Input() dataTime: any;
  currentRows: any = [];
  @ViewChild('table', {static: false}) table: DatatableComponent;
  currentTheme: any = 'dark';

  constructor(
    private sizeService: SizeService,
    private toastr: NbToastrService,
    private objectsService: ObjectsService,
    // protected configRegportService: ConfigReportService,
    //           protected toastrService: ToasterService,
    //           private dashboardService: DashboardService,
    private translate: TranslateService,
    private dialogService: NbDialogService) {
  }

  item: TreeviewItem[] = [];
  treeViewConfig = TreeviewConfig.create({
    hasFilter: true,
    hasAllCheckBox: false,
    maxHeight: 300,
    hasCollapseExpand: true,
  });

  idParent: any;
  loading = false;

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

  parentIdChange($event) {
    this.idParent = $event;
  }

  lstRole1: any;

  ngOnInit() {
    this.sizeService.query().subscribe(res => {
      this.lstRole1 = res.body.data.list;
    }, err => {
    });
    this.getParenTree( 1);

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  setPage($event: any) {
    this.onSetPage.emit($event);
    this.editing = [];
  }

  confirmRemoveRow(row, index?) {
    // // const ref = this.dialogService.open(ConfirmDialogComponent, {
    // //   autoFocus: true,
    // //   context: {
    // //     message: `Xác nhận xóa?`
    // //   },
    // // });
    // ref.onClose.subscribe(res => {
    //   if (res) {
    //     this.removeRow(row, index);
    //   }
    // });
  }

  removeRow(row, index?) {
    if (!row[this.getPrimaryKey()]) {
      this.rows.splice(index, 1);
      this.editing.splice(index, 1);
      this.rows = [...this.rows];
      return;
    }
    const data = {
      reportId: this.reportId,
      dataTime: this.dataTime,
      mapValue: row
    };
    // Check dataType has DATE type
    const dateColumn = this.columns.find(e => e.dataType === 'DATE');
    if (dateColumn) {
      data.mapValue[dateColumn.columnName] = moment(data.mapValue[dateColumn.columnName]).format('YYYY-MM-DD');
    }
    // this.configRegportService.deleteRowData(data).subscribe((res: any) => {
    //   if (this.rows.length === 1 && this.table.offset > 0) {
    //     this.table.offset--;
    //     this.page.pageNumber--;
    //   }
    //   this.toastrService.pop('success', 'Thông báo', this.translate.instant('nhapLieu.success.delete'));
    //   this.setPage({offset: this.page.pageNumber});
    // });
  }

  listStatus = [
    {name: 'common.state.0', code: 0},
    {name: 'common.state.1', code: 1},
    {name: 'common.state.2', code: 2},
    {name: 'common.state.3', code: 3},
  ];

  saveRow(row, rowIndex) {
    console.log(row);
    row.idObjects = this.idParent;
    const value = row;
    console.log(rowIndex);
    // if (!this.validRow(row)) return;
    const data = {
      mapValue: row
    };
    // // Check dataType has DATE type
    // const dateColumn = this.columns.find(e => e.dataType === 'DATE');
    // if (dateColumn) {
    //   data.mapValue[dateColumn.columnName] = moment(data.mapValue[dateColumn.columnName]).format('YYYY-MM-DD');
    // }
    // this.configRegportService.saveRowData(data).subscribe((res: any) => {
    //   if (dateColumn) {
    //     res.body.mapValue[dateColumn.columnName] = moment(res.body.mapValue[dateColumn.columnName], 'YYYY-MM-DD');
    //   }
    //   row = {
    //     ...res.body.mapValue
    //   };
    this.rows[rowIndex] = row;
    this.editing[rowIndex] = false;
    console.log(this.page);
    this.toastr.info('success', 'Thông báo');
    this.onSetPage.emit({offset: this.page.pageNumber});
    this.onValues.emit(value);
    this.addRowFlg = false;
    this.rows = [...this.rows];
    console.log(this.rows);
    // }, error => {
    //   this.toastrService.pop('error', `Lỗi`, error.error.message);
    // })
  }

  addRow() {
    const rowEditing = this.editing.some(e => !!e);
    if (rowEditing) {
      this.toastr.danger(`Bạn phải lưu row vừa thêm mới`, this.translate.instant('common.title_notification'));
      return;
    }
    this.addRowFlg = true;
    this.onAddRow.emit();
  }

  getPrimaryKey() {
    return this.columns.find(e => e.isPrimaryKey).columnName;
  }

  edit(rowIndex) {
    const rowEditing = this.editing.some(e => !!e);
    if (rowEditing) {
      this.toastr.danger(`Bạn phải lưu row vừa sửa`, this.translate.instant('common.title_notification'));
      return;
    }
    this.editing[rowIndex] = Object.assign({}, this.rows[rowIndex]);
  }

  cancel(rowIndex) {
    if (!this.addRowFlg) {
      this.rows[rowIndex] = Object.assign({}, this.editing[rowIndex]);
      this.rows = [...this.rows];
      this.editing[rowIndex] = null;
    } else {
      this.addRowFlg = false;
      this.rows.splice(rowIndex, 1);
      this.page.totalElements--;
      this.editing.splice(rowIndex, 1);
      if (this.rows.length === 0 && this.page.pageNumber > 0) {
        this.page.pageNumber--;
        this.setPage({offset: this.page.pageNumber});
      } else {
        this.rows = [...this.rows];
      }
    }
  }


}
