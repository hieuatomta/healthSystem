import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./treatment-key.component.scss'],
  templateUrl: './treatment-key.component.html',
})
export class TreatmentKeyComponent implements OnInit, OnDestroy {
  pdfSrc = 'http://localhost:4201/ltnc/assets/pdf/bvptw.pdf';
  key: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.key = params['key'];
      if (this.key === 'dieu-tri-viem-phoi-cong-dong') {
        this.pdfSrc = 'http://localhost:4201/ltnc/assets/pdf/dieutri/dieu-tri-viem-phoi-cong-dong.pdf';
      } else if (this.key === 'dieu-tri-ap-xe-phoi') {
        this.pdfSrc = 'http://localhost:4201/ltnc/assets/pdf/dieutri/dieu-tri-ap-xe-phoi.pdf';
      } else if (this.key === 'dieu-tri-gian-phe-quan') {
        this.pdfSrc = 'http://localhost:4201/ltnc/assets/pdf/dieutri/dieu-tri-gian-phe-quan.pdf';
      } else if (this.key === 'dieu-tri-hen-phe-quan') {
        this.pdfSrc = 'http://localhost:4201/ltnc/assets/pdf/dieutri/dieu-tri-hen-phe-quan.pdf';
      }
    });
  }

  ngOnInit(): void {
    // pdfSrc =
  }

  ngOnDestroy(): void {
  }
}
