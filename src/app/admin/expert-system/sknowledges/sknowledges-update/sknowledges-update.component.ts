import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../../../@core/mock/toastr-service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {CategoriesService} from '../../../../@core/services/categories.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ExpertSystemService} from '../../../../@core/services/expert-system.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-size-update',
  styleUrls: ['./sknowledges-update.component.scss'],
  templateUrl: './sknowledges-update.component.html',
})
export class SknowledgesUpdateComponent implements OnInit {
  lstRole = [];
  listStatus = [
    {name: 'common.status.1', code: 1},
    {name: 'common.status.0', code: 0}
  ];
  listType = [
    {name: 'common.typeDT.1', code: 1},
    {name: 'common.typeDT.0', code: 0}
  ];
  inputSize: any;
  itemRoles: any;
  loading = false;
  title: string;
  data: any;

  ngOnInit(): void {
    this.inputSize = new FormGroup({
      id: new FormControl(this.data?.id, []),
      code: new FormControl(this.data?.code, []),
      name: new FormControl(null, [Validators.required]),
      isLink: new FormControl(this.data?.isLink, []),
      status: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required])
    });
    this.inputSize.get('status').setValue(true);
    if (this.data) {
      this.inputSize.patchValue(this.data);
      const status = this.data.status === 1 ? true : false;
      this.inputSize.get('status').patchValue(status);
    }
    ;
  };
  selectedFiles: FileList;
  value: string | SafeUrl = null;
  pdfSrc: any;
  onFileSelected() {
    const $img: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.inputSize.get('pdfSrc').setValue( e.target.result);
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
  }
  selectFile(event) {
    const $img: any = document.querySelector('#file');
    this.selectedFiles = event.target.files;

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // this.inputSize.get('pdfSrc').setValue( e.target.result);
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
    // const reader = new FileReader();
    //
    // reader.onloadend = (e: any) => {
    //   this.pdfSrc = e.target.result;
    // };

    // reader.readAsArrayBuffer(file);
    // if (event !== null) {
    //   this.selectedFiles = event.target.files;
    //   this.value = this.sanitizer.bypassSecurityTrustUrl(
    //     window.URL.createObjectURL(event.target.files[0])
    //   );
    // }
  }

  constructor(
    private toastr1: ToastrService,
    private toastr: NbToastrService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer,
    public ref: NbDialogRef<SknowledgesUpdateComponent>,
    private expertSystemService: ExpertSystemService) {
  }


  submit() {
    this.inputSize.get('status').patchValue(this.inputSize.get('status').value ? 1 : 0);
    this.inputSize.markAllAsTouched();
    if (this.inputSize.valid) {
      this.loading = true;
      if (this.data == null) {
        console.log(this.inputSize.value);
        this.expertSystemService.insert(this.inputSize.value, this.selectedFiles.item(0)).subscribe(
          (value) => this.ref.close(value),
          (error) => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false
        );
      } else {
        if (this.selectedFiles === null || this.selectedFiles === undefined) {
          this.expertSystemService.update(this.inputSize.value).subscribe(
            (value) => this.ref.close(value),
            (error) => {
              this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
              this.loading = false;
            },
            () => this.loading = false,
          );
        } else {
          this.expertSystemService.updateImg(this.inputSize.value, this.selectedFiles?.item(0)).subscribe(
            (value) => this.ref.close(value),
            (error) => {
              this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
              this.loading = false;
            },
            () => this.loading = false,
          );
        }
      }
    } else {
    }
  }

  cancel() {
    this.ref.close();
  }
}
