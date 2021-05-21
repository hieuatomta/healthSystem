import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SymptomsService} from '../../@core/services/symptoms.service';
import {Router} from '@angular/router';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./generalSigns.component.scss'],
  templateUrl: './generalSigns.component.html',
})
export class GeneralSignsComponent implements OnInit {
  form: FormGroup;
  Data: Array<any> = [];

  ngOnInit(): void {
    this.symptomsService.doSearchByClient({type: 0, status: 1}).subscribe(res => {
      this.Data = res.body.data.list;
      console.log(res), err => {
        console.log(err);
      };
    });
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private symptomsService: SymptomsService) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    });
  }

  come() {
    this.router.navigate(['/chan-doan']);
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    console.log(this.form.value);
    this.router.navigate(['/chan-doan/dau-hieu-nhan-biet']);
  }
}
