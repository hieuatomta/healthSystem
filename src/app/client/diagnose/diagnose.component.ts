import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


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

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      mail: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      totalPrice: new FormControl(null, []),
      customOrderDTO: new FormControl(null, []),
      appId: new FormControl(null, []),
    });
  }
}
