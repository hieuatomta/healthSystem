import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./knowledge-key.component.scss'],
  templateUrl: './knowledge-key.component.html',
})
export class KnowledgeKeyComponent implements OnInit, OnDestroy {
  pdfSrc = 'http://localhost:4201/ltnc/assets/pdf/bvptw.pdf';
  key: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.key = params['key'];
      if (this.key === 'tri-thuc-chung-ve-benh-phoi') {
        this.pdfSrc = 'http://localhost:4201/ltnc/assets/pdf/trithuc/tri-thuc-chung-ve-benh-phoi.pdf';
      } else if (this.key === 'tri-thuc-viem-phoi-cong-dong') {
        this.pdfSrc = 'http://localhost:4201/ltnc/assets/pdf/trithuc/tri-thuc-viem-phoi-cong-dong.pdf';
      }else if (this.key === 'tri-thuc-ap-xe-phoi') {
        this.pdfSrc = 'http://localhost:4201/ltnc/assets/pdf/trithuc/tri-thuc-ap-xe-phoi.pdf';
      }else if (this.key === 'tri-thuc-gian-phe-quan') {
        this.pdfSrc = 'http://localhost:4201/ltnc/assets/pdf/trithuc/tri-thuc-gian-phe-quan.pdf';
      } else if (this.key === 'tri-thuc-hen-phe-quan') {
        this.pdfSrc = 'http://localhost:4201/ltnc/assets/pdf/trithuc/tri-thuc-hen-phe-quan.pdf';
      }
    });
  }

  ngOnInit(): void {
    // pdfSrc =
  }

  ngOnDestroy(): void {
  }
}
