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
    });
  }

  ngOnInit(): void {
    // pdfSrc =
  }

  ngOnDestroy(): void {
  }
}
