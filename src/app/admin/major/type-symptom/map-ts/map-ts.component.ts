import {Component, OnInit} from '@angular/core';
import {ColumnChangesService, DimensionsHelper, ScrollbarHelper} from '@swimlane/ngx-datatable';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../../../@core/services/products.service';
import {ConfirmDialogComponent} from '../../../../shares/directives/confirm-dialog/confirm-dialog.component';
import {Observable} from 'rxjs';
import {UploadFileService} from '../../../../@core/services/uploadFileService.service';
import {TestDiseaseService} from '../../../../@core/services/test-disease.service';
import {TypeTestService} from '../../../../@core/services/type-test.service';
import {SymptomsService} from '../../../../@core/services/symptoms.service';
import { FrequencieService } from '../../../../@core/services/frequencie.service';

@Component({
  selector: 'ngx-map-image',
  templateUrl: './map-ts.component.html',
  styleUrls: ['./map-ts.component.scss'],
  providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
})
export class MapTsComponent implements OnInit {
  lstRole1 = [];
  listType = [
    {name: 'common.typeTS.0', code: 0},
    {name: 'common.typeTS.1', code: 1},
    {name: 'common.typeTS.2', code: 2},
  ];
  title: string;
  data: any;
  loading = false;
  rows;
  allData: any;
  selectedUI = [];
  selected = [];
  originalData = [];
  isLoad: boolean;
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  amount: any;
  lsTt = [];
  paramSearch = {
    type: null,
    name: null,
    symptomId: null
  };
  columns = [
    {prop: 'index', name: 'common.table.item_number', flexGrow: 0.2},
    {prop: 'type', name: 'Mức độ', flexGrow: 0.5},
    {prop: 'name', name: 'Tên', flexGrow: 1},
    {prop: 'status', name: 'Trạng thái', flexGrow: 0.5},
    {prop: 'updateTime', name: 'Thời gian cập nhật', flexGrow: 1},
    {name: 'common.table.item_action', prop: 'action_btn', flexGrow: 0.5}
  ];

  constructor(private ref: NbDialogRef<MapTsComponent>,
              private toastr: NbToastrService,
              private translate: TranslateService,
              private testDiseaseService: TestDiseaseService,
              private typeTestService: TypeTestService,
              private frequencieService: FrequencieService
  ) {
  }

  ngOnInit(): void {
    console.log(this.data);
    // this.loading = true;
    // this.typeTestService.query({typediseaseId: this.data?.typediseaseId}).subscribe(
    //   res => {
    //     this.originalData = res.body.data.list;
    //     this.amount = res.body.data.count;
    //     this.paramSearch.amount1 = res.body.data.count;
    //   },
    //   (error) => {
    //     this.toAstrError();
    //     this.loading = false;
    //   },
    //   () => this.loading = false,
    // );
    this.search();
  }

  toAstrError() {
    this.toastr.success(this.translate.instant('common.table.unknown_error'),
      this.translate.instant('common.title_notification'));
  }

  delete(e) {
    console.log(e);
    this.typeTestService.deleteXd(e.type).subscribe(() => {
      this.toastr.success(this.translate.instant('type_symptom.delete_success'),
        this.translate.instant('common.title_notification'));
      this.search();
      this.isLoad = false;
    }, (err) => {
      this.toastr.success(err.message),
        this.translate.instant('common.title_notification');
      this.isLoad = false;
    });
  }

  search() {
    this.loading = true;
    console.log(this.data);
    this.frequencieService.query(this.data?.id).subscribe(
      res => {
        console.log(res);
        this.rows = res.body.data.list;
        // this.originalData = res.body.data.list;
      },
      (error) => {
        this.toAstrError();
        this.loading = false;
      },
      () => this.loading = false,
    );
  }

  submit() {
    // this.paramSearch.statusdiseaseId = this.data?.id;
    // this.paramSearch.listIdXn = this.paramSearch.lsId;
    // this.paramSearch.amount = this.paramSearch.lsId?.length;
    // this.paramSearch.typediseaseId = this.data?.typediseaseId;
    this.paramSearch.symptomId = this.data?.id;
    console.log(this.paramSearch);
    this.loading = true;
    this.frequencieService.insert(this.paramSearch).subscribe(
      res => {
        console.log(res);
        this.toastr.success('Thêm mới tần suất thành công', this.translate.instant('common.title_notification'))
        // this.originalData = res.body.data.list;
      },
      (error) => {
        this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.search();
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
