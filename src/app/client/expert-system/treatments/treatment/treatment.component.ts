import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';


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

  ngOnInit(): void {
    // pdfSrc =
  }
}
