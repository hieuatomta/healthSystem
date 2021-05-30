import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ExpertSystemService} from '../../../../@core/services/expert-system.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./knowledge.component.scss'],
  templateUrl: './knowledge.component.html',
})
export class KnowledgeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }
  pdfSrc = "assets/pdf/bvptw.pdf";
  constructor(private expertSystemService: ExpertSystemService) {
  }
  arr: any;
  search() {
    this.expertSystemService.doSearch1({
      status: 1,
      type: 1
    }).subscribe(
      (res) => {
        this.arr = res.body.data.list;
        console.log(res);
        // this.onSuccess(res.body.data, res.headers, pageToLoad);
      },
      (error) => {
        // this.isLoad = false;
      },
    );
  }
  ngOnInit(): void {
    // pdfSrc =
    this.search();
  }
}
