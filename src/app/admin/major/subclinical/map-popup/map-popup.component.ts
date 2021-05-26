import {Component, OnInit} from '@angular/core';
import {ColumnChangesService, DimensionsHelper, ScrollbarHelper} from '@swimlane/ngx-datatable';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {TestDiseaseService} from '../../../../@core/services/test-disease.service';
import {TypeTestService} from '../../../../@core/services/type-test.service';
import {SymptomsService} from '../../../../@core/services/symptoms.service';

@Component({
  selector: 'ngx-map-module-cls',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.scss'],
  providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
})
export class MapPopupComponent implements OnInit {
  lstRole1 = [];

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
    amount1: null,
    amount: null,
    typediseaseId: null,
    lsId: null,
    statusdiseaseId: null,
    idXn: null,
    listIdXn: null,
    lsXn: null
  };
  columns = [
    {prop: 'index', name: 'common.table.item_number', flexGrow: 0.2},
    {prop: 'amount', name: 'common.table.item_amount', flexGrow: 0.3},
    {prop: 'nameXn', name: 'common.table.item_xn', flexGrow: 1},
    {name: 'common.table.item_action', prop: 'action_btn', flexGrow: 0.5}
  ];

  constructor(private ref: NbDialogRef<MapPopupComponent>,
              private toastr: NbToastrService,
              private translate: TranslateService,
              private testDiseaseService: TestDiseaseService,
              private typeTestService: TypeTestService,
              private symptomsService: SymptomsService
  ) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.loading = true;
    this.typeTestService.query({typediseaseId: this.data?.typediseaseId}).subscribe(
      res => {
        this.originalData = res.body.data.list;
        this.amount = res.body.data.count;
        this.paramSearch.amount1 = res.body.data.count;
      },
      (error) => {
        this.toAstrError();
        this.loading = false;
      },
      () => this.loading = false,
    );
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
    this.typeTestService.searchXd(this.data?.id).subscribe(
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
  groupingHelper(item) {
    return item.nameXn
  }

  changeLeagueOwner(e) {
    const obj = {
      typediseaseId: 3,
      listIdXn: this.paramSearch.lsId
    }
    this.symptomsService.doSearchGroup(obj).subscribe(
      res => {
        console.log(res);
        this.lsTt = res.body.data.list;
        // this.originalData = res.body.data.list;
      },
      (error) => {
        this.toAstrError();
        this.loading = false;
      },
      () => this.loading = false,
    );
     console.log(e);
  }

  submit() {
    this.paramSearch.statusdiseaseId = this.data?.id;
    this.paramSearch.listIdXn = this.paramSearch.lsId;
    this.paramSearch.amount = this.paramSearch.lsId?.length;
    this.paramSearch.typediseaseId = this.data?.typediseaseId;
    console.log(this.paramSearch);
    this.loading = true;
    this.typeTestService.insertXd(this.paramSearch).subscribe(
      res => {
        console.log(res);
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
