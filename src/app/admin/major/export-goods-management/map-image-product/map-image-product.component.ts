import {Component, OnInit} from '@angular/core';
import {ColumnChangesService, DimensionsHelper, ScrollbarHelper} from '@swimlane/ngx-datatable';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../../../@core/services/products.service';
import {ConfirmDialogComponent} from '../../../../shares/directives/confirm-dialog/confirm-dialog.component';
import {Observable} from 'rxjs';
import {UploadFileService} from '../../../../@core/services/uploadFileService.service';

@Component({
  selector: 'ngx-map-module',
  templateUrl: './map-image-product.component.html',
  styleUrls: ['./map-image-product.component.scss'],
  providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
})
export class MapImageProductComponent implements OnInit {
  title: string;
  data: any;
  loading = false;
  rows;
  allData: any;
  selected = [];
  originalData = [];
  isLoad: boolean;
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  columns = [
    {name: 'common.table.item_image_link', prop: 'imageLink', flexGrow: 1},
    {name: 'common.table.item_color_image', prop: 'name', flexGrow: 2.5},
    {name: 'common.table.item_status', prop: 'status', flexGrow: 1},
    {name: 'common.table.item_update_time', prop: 'updateTime', flexGrow: 1},
    {name: 'common.table.item_action', prop: 'action_btn', flexGrow: 1}
  ];
  lstRole1 = [];
  lstRole2 = [];
  inputProduct: any;

  constructor(public ref: NbDialogRef<MapImageProductComponent>,
              private uploadService: UploadFileService,
              private toastr: NbToastrService,
              private translate: TranslateService,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService,
              private productsService: ProductsService,
  ) {
  }

  protected onSuccess(data: any | null): void {
    this.rows = data.DS_Image || [];

  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
    this.loading = true;
    this.inputProduct = new FormGroup({
      idProduct: new FormControl(this.data?.id, []),
      amount: new FormControl(null, [Validators.required]),
      idSize: new FormControl(null, [Validators.required]),
      idColor: new FormControl(null, [Validators.required]),
    });
    this.search();
  }

  toAstrError() {
    this.toastr.success(this.translate.instant('common.table.unknown_error'),
      this.translate.instant('common.title_notification'));
  }

  search() {
    this.loading = true;
    this.uploadService.doSearchByCode(this.data?.id).subscribe(res => {
        this.onSuccess(res.body.data);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      });
  };

  cancel() {
    this.ref.close();
  }

  // upload ts
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;
  canUpdate = true;

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    if (this.data.id) {
      this.uploadService.upload({id: this.data.id}, this.currentFile).subscribe(
        (res) => {
          this.message = res.body.data;
          this.search();
          this.canUpdate = true;
        },
        (error) => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
          this.canUpdate = true;
          // this.isLoad = false;
        },
        () => this.canUpdate = true,
      );
    }
    this.selectFile(null);
    // this.selectedFiles = null;
  }

  selectFile(event) {
    if (event !== null) {
      this.selectedFiles = event.target.files;
    } else {
      this.canUpdate = true;
      this.selectedFiles = null;
    }
    if (this.selectedFiles === null) {
      this.canUpdate = true;
    } else {
      this.canUpdate = false;
    }
  }

  lock(data) {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('common.title_notification'),
        message: this.translate.instant('image.title_lock') + ' ' + data.name
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.isLoad = true;
        this.uploadService.lock(data).subscribe(() => {
          this.toastrService.success(this.translate.instant('image.lock_success'),
            this.translate.instant('common.title_notification'));
          this.search();
          this.isLoad = false;
        }, (err) => {
          this.toastrService.success(err.message),
            this.translate.instant('common.title_notification');
          this.isLoad = false;
        });
      }
    });
  }

  deleteSizeColor(data) {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('common.title_notification'),
        message: this.translate.instant('image.title_delete') + ' ' + data.name
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.isLoad = true;
        this.uploadService.delete(data.id).subscribe(() => {
          this.toastrService.success(this.translate.instant('image.delete_success'),
            this.translate.instant('common.title_notification'));
          this.search();
          this.isLoad = false;
        }, (err) => {
          this.toastrService.success(err.message),
            this.translate.instant('common.title_notification');
          this.isLoad = false;
        });
      }
    });
  }


  removeVietnameseTones(str) {
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
    str = str.replace(/??|??|???|???|??/g, 'i');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
    str = str.replace(/???|??|???|???|???/g, 'y');
    str = str.replace(/??/g, 'd');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'A');
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'E');
    str = str.replace(/??|??|???|???|??/g, 'I');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'O');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'U');
    str = str.replace(/???|??|???|???|???/g, 'Y');
    str = str.replace(/??/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ?? ?? ??  ??, ??, ??, ??, ??
    // Remove extra spaces
    // B??? c??c kho???ng tr???ng li???n nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // B??? d???u c??u, k?? t??? ?????c bi???t
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    // ?????i kho???ng tr???ng th??nh -
    str = str.replace(/\s+/g, '-').toLowerCase();
    return str;
  }
}
