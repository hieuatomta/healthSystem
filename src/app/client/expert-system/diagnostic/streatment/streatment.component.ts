import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ExpertSystemService} from '../../../../@core/services/expert-system.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./streatment.component.scss'],
  templateUrl: './streatment.component.html',
})
export class StreatmentComponent implements OnInit, OnDestroy {
  pdfSrc = 'http://localhost:4201/ltnc/assets/pdf/bvptw.pdf';
  key: any;
  usersClient: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private expertSystemService: ExpertSystemService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.key = params['key'];
      this.expertSystemService.doSearch1({
        status: 1,
        type: 0,
        code: this.key
      }).subscribe(
        (res) => {
          const data = res.body.data.list;
          if (data?.length === 1) {
            this.pdfSrc = 'http://localhost:4201/ltnc' + data[0].isLink;
          }
          console.log(res);
        },
        (error) => {
          // this.isLoad = false;
        },
      );
    });
    this.usersClient = JSON.parse(localStorage.getItem('usersClient'));
    if (this.usersClient === null) {
      this.router.navigate(['/chan-doan']);
    }
  }

  search() {

  }

  ngOnInit(): void {
    // pdfSrc =
  }

  ngOnDestroy(): void {
  }

  kt() {
    this.router.navigate(['/danh-gia']);
  }
}
