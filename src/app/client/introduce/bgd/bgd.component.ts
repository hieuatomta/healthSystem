import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./bgd.component.scss'],
  templateUrl: './bgd.component.html',
})
export class BgdComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }
  pdfSrc = "assets/pdf/bvptw.pdf";

  ngOnInit(): void {
    // pdfSrc =
  }
}
