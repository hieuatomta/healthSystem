import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../../../@core/mock/toastr-service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {TreeviewConfig, TreeviewItem} from 'ngx-treeview';
import {ObjectsService} from '../../../../@core/services/objects.service';
import {ColorService} from '../../../../@core/services/color.service';
import {ProductsService} from '../../../../@core/services/products.service';
import {ColumnChangesService, DimensionsHelper, ScrollbarHelper} from '@swimlane/ngx-datatable';
import {HttpHeaders} from '@angular/common/http';
import {CategoriesService} from '../../../../@core/services/categories.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-size-update',
  styleUrls: ['./news-update.component.scss'],
  templateUrl: './news-update.component.html',
  providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
})
export class NewsUpdateComponent implements OnInit {
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
    {name: 'common.state.4', code: 4},
  ];
  arr = [];


  constructor(
    private objectsService: ObjectsService,
    private toastr1: ToastrService,
    private toastr: NbToastrService,
    private translate: TranslateService,
    public ref: NbDialogRef<NewsUpdateComponent>,
    private categoriesService: CategoriesService,
    private colorService: ColorService,
    private productsService: ProductsService,
  ) {
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.page.count = data.count;
    this.page.offset = page || 0;
    this.rows = data.list || [];
  }

  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };

  ngOnInit(): void {
    this.categoriesService.doSearch({
      status: 1,
    }).subscribe(
      (res) => {
        this.lstRole1 = res.body.data.list;
      },
      (error) => {
        // this.isLoad = false;
      },
      // () => this.isLoad = false,
    );

    this.inputProduct = new FormGroup({
      id: new FormControl(this.data?.id, []),
      title: new FormControl(null, [Validators.required]),
      bodyChild: new FormControl(null, [Validators.required]),
      bodyNews: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
    });
    if (this.data) {
      this.inputProduct.patchValue(this.data);
    }
    this.getParenTree(this.data?.type ? this.data.type : 1);

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
        console.log(this.inputProduct.value);
        // this.inputProduct.get('status').setValue(1);
        // this.productsService.insert(this.inputProduct.value).subscribe(
        //   (value) => this.ref.close(value),
        //   (error) => {
        //     this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
        //     this.loading = false;
        //   },
        //   () => this.loading = false
        // );
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
}
