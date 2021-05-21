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
    });
  }

  ngOnInit(): void {
    // pdfSrc =
  }

  ngOnDestroy(): void {
  }
}
