import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../@core/services/users.service';
import {NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./diagnose.component.scss'],
  templateUrl: './diagnose.component.html',
})
export class DiagnoseComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }
  inputForm: any;
  loading: any;
  ngOnInit(): void {
    this.inputForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      mail: new FormControl(null, []),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^\d{10}$/)]),
    });
  }

  constructor(private userService: UsersService,
              private translate: TranslateService,
              private router: Router,
              private toastr: NbToastrService) {
  }

  submit() {
    if (this.inputForm.valid) {
      this.loading = true;
      const data = Object.assign({}, this.inputForm.value);
      console.log(data);
        this.userService.insertClient(data).subscribe(
          (value) => {
            console.log(value);
            localStorage.setItem('usersClient', data);
            this.router.navigate(['/chan-doan/dau-hieu-chung'])
          },
          error => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false,
        );

    } else {
    }
  }
}
