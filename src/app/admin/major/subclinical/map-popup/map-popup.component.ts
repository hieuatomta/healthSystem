import {Component, OnInit} from '@angular/core';
import {ColumnChangesService, DimensionsHelper, ScrollbarHelper} from '@swimlane/ngx-datatable';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {TestDiseaseService} from '../../../../@core/services/test-disease.service';
import {TypeTestService} from '../../../../@core/services/type-test.service';

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
  paramSearch = {code: null, status: 1};
  columns = [
    {prop: 'index', name: 'common.table.item_number', flexGrow: 0.2},
    {prop: 'code', name: 'common.table.item_objects_code', flexGrow: 1},
    {prop: 'name', name: 'common.table.item_objects_name', flexGrow: 1},
    {prop: 'updateTime', name: 'common.table.item_update_time', flexGrow: 1},
    {name: 'common.table.item_action', prop: 'action_btn', flexGrow: 0.5}
  ];

  constructor(private ref: NbDialogRef<MapPopupComponent>,
              private toastr: NbToastrService,
              private translate: TranslateService,
              private testDiseaseService: TestDiseaseService,
              private typeTestService: TypeTestService
  ) {
  }

  protected onSuccess(data: any | null): void {
    this.rows = data.list || [];
    this.selectedUI = [];
    this.selected.map(value => {
      this.rows.map((value1) => {
        if (value === value1.id) {
          this.selectedUI.push(value1);
        }
      });
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.typeTestService.query({typediseaseId: this.data?.id}).subscribe(
      res => {
        this.originalData = res.body.data.list;
        res.body.data.list.map(value => {
          this.selected.push(value.testdiseaseId);
        });
      },
      (error) => {
        this.toAstrError();
        this.loading = false;
      },
      () => this.search(),
    );

  }

  toAstrError() {
    this.toastr.success(this.translate.instant('common.table.unknown_error'),
      this.translate.instant('common.title_notification'));
  }

  onSelect({selected}) {
    this.selectedUI = [];
    this.selectedUI.push(...selected);
    this.rows.map((value) => {
      this.selected.map((value1, index) => {
        if (value.id === value1) {
          this.selected.splice(index, index + 1);
        }
      });
    });
    selected.map(value => this.selected.push(value.id));
  }

  search() {
    this.loading = true;
    this.testDiseaseService.doSearch().subscribe(res => {
        this.allData = res.body.data.list;
        this.onSuccess(res.body.data);
      },
      (error) => {
        this.loading = false;
      },
      () => this.loading = false);
  }

  submit() {
    this.loading = true;
    const listUncheck = [];
    const listAdd = [];
    if (this.allData?.length === this.selected?.length) {
      this.originalData.map(value => {
        listUncheck.push(value.testdiseaseId);
      });
      this.selected.map(value => {
        listAdd.push(value);
      });
    } else {
      this.originalData.map(value => {
        let isUncheck = true;
        this.selected.map((select, index) => {
          if (value.testdiseaseId === select) {
            this.selected.splice(index, index + 1);
            isUncheck = false;
          }
        });
        if (isUncheck) {
          listUncheck.push(value.testdiseaseId);
        }
      });
      this.selected.map(value => {
        listAdd.push(value);
      });
    }
    const data1 = {
      typediseaseId: this.data.id,
      listAdd: listAdd
    };
    const data2 = {
      typediseaseId: this.data.id,
      listUncheck: listUncheck
    };
    this.typeTestService.delete(data2).subscribe(
      success => {
        this.typeTestService.insert(data1).subscribe(
          res => this.ref.close('success'),
          error => {
            this.toAstrError()
            this.loading = false;
          },
        );
      },
      error => {
        this.toAstrError();
        this.loading = false;
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
