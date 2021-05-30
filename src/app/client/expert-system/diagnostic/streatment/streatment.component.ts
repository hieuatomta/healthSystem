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
  usersClient: any;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // pdfSrc =
  }

  kt() {
    // nho ghi lai data du lieu benh nhan bi benh vao database
    // this.usersClient.nameType = data.name;
    // this.logsEvaluateService.updateClient(this.usersClient).subscribe(
    //   (value) => {
    //     console.log(value);
    //     localStorage.setItem('usersClient', JSON.stringify(value.body.data.list));
    //     this.router.navigate(['/danh-gia']);
    //   },
    //   error => {
    //     this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
    //   },
    // );
    this.router.navigate(['/danh-gia']);
  }
}
