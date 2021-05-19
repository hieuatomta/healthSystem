import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SymptomsService} from '../../@core/services/symptoms.service';
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./radioCheckBox.component.scss'],
  templateUrl: './radioCheckBox.component.html',
})
export class RadioCheckBoxComponent implements OnInit {
  key: any;
  options = [];
  option;

  ngOnInit(): void {
    this.symptomsService.doSearchByClient({type: 1, status: 1}).subscribe(res => {
      this.options = res.body.data.list;
      console.log(res), err => {
        console.log(err);
      };
    });
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private symptomsService: SymptomsService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.key = params['key'];
      if (this.key?.trim() !== 'dau-hieu-nhan-biet') {
        this.router.navigate(['/trang-chu']);
      } else if (this.key?.trim() === 'dau-hieu-chung') {
        this.router.navigate(['/chan-doan/dau-hieu-chung']);
      }
    });
  }


  submitForm() {
    console.log(this.option);
  }
}
