import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ExpertSystemService} from '../../../../@core/services/expert-system.service';
import {TreeviewItem} from 'ngx-treeview';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./treatment.component.scss'],
  templateUrl: './treatment.component.html',
})
export class TreatmentComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }
  pdfSrc = "assets/pdf/bvptw.pdf";

  constructor(private expertSystemService: ExpertSystemService) {
  }
 arr: any;
  search() {
    this.expertSystemService.doSearch1({
      status: 1,
      type: 0
    }).subscribe(
      (res) => {
        this.arr = this.formatDataTree(res.body.data.list, 0);
        // this.arr = ;
        console.log( this.arr);
        // this.onSuccess(res.body.data, res.headers, pageToLoad);
      },
      (error) => {
        // this.isLoad = false;
      },
    );
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
        const dataTreeview = {text: dataItem.name, value: dataItem.id, children: dataItem.children, code: dataItem.code};
        arr.push(dataTreeview);
      }
    }
    return arr;
  }

  ngOnInit(): void {
    // pdfSrc =
    this.search();
  }
}
