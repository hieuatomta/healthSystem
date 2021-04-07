import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from '../../@core/mock/toastr-service';
import {TranslateService} from '@ngx-translate/core';
import {HttpHeaders} from '@angular/common/http';
import {ProductsService} from '../../@core/services/products.service';
import {ColorService} from '../../@core/services/color.service';
import {SizeService} from '../../@core/services/size.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

declare var $: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./product-detail.component.scss'],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  key: any;
  obj: any;
  rows: any;
  inputForm: any;
  ls_order = {
    name: null,
    cost: null,
    amount: null,
    id: null,
    color: null,
    size: null,
    imageLink: null,
    totalPrice: null,
    totalPrice1: null,
    totalOrder: null,
    nameSize: null,
  };

  constructor(private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private translateService: TranslateService,
              public productsService: ProductsService,
              private colorService: ColorService,
              private sizeService: SizeService,
              private router: Router) {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.key = params['key'];
    });
    this.search(this.key, 0);
    // this.obj = null;
    // console.log(this.key);
    // for (let i = 0; i < this.lstData.length; i++) {
    //   if (this.lstData[i].code === this.key) {
    //     this.obj = this.lstData[i];
    //     console.log(this.lstData[i]);
    //     console.log(this.obj);
    //   }
    // }
    // if (this.obj === null) {
    //   // chuyen ve trang home bao loi ko tim thay san pham
    //   this.toastr.showToast('danger', 'Thông báo', 'Có lỗi trong quá trình xử lý');
    //   this.router.navigate(['trang-chu']);
    // }
  }

  search(code: any, pageToLoad: number) {
    this.productsService.doSearch1({
      code: code
    }).subscribe(
      (res) => {
        console.log(res);
        this.onSuccess(res.body.data, res.headers, pageToLoad);
      },
      (error) => {
        this.toastr.showToast('danger', 'Thông báo', 'Có lỗi trong quá trình xử lý');
        this.router.navigate(['trang-chu']);
      },
      // () => this.isLoad = false,
    );
  }


  // goi len header de cap nhat gio hang
  thanhToan() {
    if (this.inputForm.valid) {


      const data = {data: null, totalPrice: null, totalOrder: null};

      this.ls_order.id = this.inputForm.get('id').value;
      this.ls_order.size = this.inputForm.get('size').value;
      this.ls_order.amount = this.inputForm.get('amount').value;
      this.ls_order.cost = this.inputForm.get('cost').value;
      this.ls_order.name = this.inputForm.get('name').value;
      this.ls_order.imageLink = this.inputForm.get('imageLink').value;
      this.ls_order.totalPrice = null;
      this.ls_order.totalPrice1 = null;
      this.ls_order.totalOrder = null;
      console.log(this.lstRole1);
      for (let i = 0; i < this.lstRole1?.length; i++) {
        if (this.lstRole1[i].id === this.ls_order.size) {
          this.ls_order.nameSize = this.lstRole1[i].name;
        }
      }
      const data1 = JSON.parse(localStorage.getItem('list_order'));
      let obj = data1?.data;
      if (obj === null || obj === undefined) {
        obj = [];
      }
      if (obj?.length === 0) {
        // data = null;
        this.ls_order.totalPrice1 = null;
        this.ls_order.totalPrice1 = (Number(this.ls_order.amount * (this.ls_order.cost.trim().slice(0, this.ls_order.cost.search('đ') - 1))) * 1000);
        obj.push(this.ls_order);
      } else {
        let a = 0;
        for (let i = 0; i < obj?.length; i++) {
          this.ls_order.totalPrice1 = null;
          this.ls_order.totalPrice1 = (Number(obj[i].amount * (obj[i].cost.trim().slice(0, obj[i].cost.search('đ') - 1))) * 1000);
          if (obj[i].id === this.inputForm.get('id').value && obj[i].size === this.inputForm.get('size').value) {
            this.ls_order.amount = obj[i].amount + this.inputForm.get('amount').value;
            obj.splice(i, 1);
            a = 1;
          }
        }
        if (a === 1) {
          obj.push(this.ls_order);
          a = 0;
        } else {
          obj.push(this.ls_order);
        }
      }
      for (let i = 0; i < obj?.length; i++) {
        this.ls_order.totalOrder += obj[i].amount;
        this.ls_order.totalPrice += (Number(obj[i].amount * (obj[i].cost.trim().slice(0, obj[i].cost.search('đ') - 1))) * 1000);
      }
      data.data = obj;
      data.totalPrice = this.ls_order.totalPrice;
      data.totalOrder = this.ls_order.totalOrder;

      console.log(obj);
      localStorage.setItem('list_order', JSON.stringify(data));
    }
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    // this.page.count = data.totalPages;
    // this.page.offset = page || 0;
    this.rows = data.list || [];
    console.log(this.rows);
    this.obj = this.rows[0];
    this.inputForm.get('id').setValue(this.rows[0]?.id);
    this.inputForm.get('cost').setValue(this.rows[0]?.cost);
    this.inputForm.get('name').setValue(this.rows[0]?.name);
    this.inputForm.get('imageLink').setValue(this.rows[0]?.DS_Image[0].imageLink);
  }

  lstRole1 = [];
  lstRole2 = [];
  getSoLuong = 1;

  soluong(e) {
    let soLuong = this.inputForm.get('amount').value;
    if (e === 0) {
      if (this.inputForm.get('amount').value === 0) {
        this.inputForm.get('amount').setValue(0);
        return;
      }
      soLuong = soLuong - 1;
    } else {
      soLuong = soLuong + 1;
    }
    this.inputForm.get('amount').setValue(soLuong);
    return soLuong;
  }

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      size: new FormControl(null, [Validators.required]),
      amount: new FormControl(1, []),
      status: new FormControl(null, []),
      id: new FormControl(null, []),
      cost: new FormControl(null, []),
      imageLink: new FormControl(null, []),
      name: new FormControl(null, [])
    });
    this.sizeService.queryProductSize(this.key).subscribe(res => {
      this.lstRole1 = res.body.data.list;
    }, err => {
    });


    // doan js xu ly hieu ung
    $('.wrap-slick3').each(function () {
      $(this).find('.slick3').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 6000,

        arrows: true,
        appendArrows: $(this).find('.wrap-slick3-arrows'),
        prevArrow: '<button class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',

        dots: true,
        appendDots: $(this).find('.wrap-slick3-dots'),
        dotsClass: 'slick3-dots',
        customPaging: function (slick, index) {
          const portrait = $(slick.$slides[index]).data('thumb');
          return '<img src=" ' + portrait + ' "/><div class="slick3-dot-overlay"></div>';
        },
      });
    });
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      const nameTab = $(e.target).attr('href');
      $(nameTab).find('.slick2').slick('reinit');
    });
    $('.wrap-slick2').each(function () {
      $(this).find('.slick2').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 6000,
        arrows: true,
        appendArrows: $(this),
        prevArrow: '<button class="arrow-slick2 prev-slick2"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button class="arrow-slick2 next-slick2"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    });
    $('.gallery-lb').each(function () { // the containers for all your galleries
      $(this).magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
          enabled: true
        },
        mainClass: 'mfp-fade'
      });
    });
  }
}
