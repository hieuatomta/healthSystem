import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./streatment.component.scss'],
  templateUrl: './streatment.component.html',
})
export class StreatmentComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  pdfSrc = 'assets/pdf/bvptw.pdf';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // pdfSrc =
  }

  kt() {
    this.router.navigate(['/dang-gia']);
  }
}
