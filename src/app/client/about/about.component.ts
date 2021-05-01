import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./about.component.scss'],
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }
  pdfSrc = "assets/pdf/bvptw.pdf";

  ngOnInit(): void {
    // pdfSrc =
  }
}
