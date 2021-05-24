import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';


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

  ngOnInit(): void {
    // pdfSrc =
  }
}
