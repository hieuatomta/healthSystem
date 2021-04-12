import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

declare const jQuery: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-header-client',
  styleUrls: ['./client-header.component.scss'],
  templateUrl: './client-header.component.html',
})
export class ClientHeaderComponent implements OnInit, OnDestroy {
  size = 0;
  obj = null;
  totalPrice = null;
  openOrder() {
    const data = JSON.parse(localStorage.getItem('list_order'));
    console.log(data);
    if (data === undefined || data === null || data.data === undefined || data.data === null) {
      this.obj = [];
    } else {
      this.obj = data.data;
      // for (let i = 0; i < this?.obj.length; i++) {
      //   console.log(this.obj[i].amount);
      //   this.size += this.obj[i].amount;
      // }
      this.size = data.totalOrder;
      this.totalPrice = data.totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
      // for (let i = 0; i < this.obj?.length; i++) {
      //
      // }
    }

  }

  sangThanhToan() {
    this.router.navigate(['/thanh-toan']);
    (function ($) {
      $('.js-sidebar').removeClass('show-sidebar');
      $('.js-panel-cart').removeClass('show-header-cart');
    })(jQuery);
  }

  ngOnInit() {
    const data = JSON.parse(localStorage.getItem('list_order'));
    // this.obj = data?.data;
    this.size = data?.totalOrder;
    if (data === undefined || data === null || data.data === undefined || data.data === null) {
      this.obj = [];
    } else {
      this.obj = data.data;
    }
    // this.size = this.obj?.length;
    this.menudacap = this.dequy(0, 0, 1);
    (function ($) {
      let posWrapHeader;
      /*==================================================================
          [ Fixed Header ]*/
      const headerDesktop = $('.container-menu-desktop');
      const wrapMenu = $('.wrap-menu-desktop');

      if ($('.top-bar').length > 0) {
        posWrapHeader = $('.top-bar').height();
      } else {
        posWrapHeader = 0;
      }


      if ($(window).scrollTop() > posWrapHeader) {
        console.log(posWrapHeader);
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top', 0);
      } else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
      }

      $(window).on('scroll', function () {
        if ($(this).scrollTop() > posWrapHeader) {
          $(headerDesktop).addClass('fix-menu-desktop');
          $(wrapMenu).css('top', 0);
        } else {
          $(headerDesktop).removeClass('fix-menu-desktop');
          $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
        }
      });


      /*==================================================================
      [ Menu mobile ]*/
      $('.btn-show-menu-mobile').on('click', function () {
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
      });

      const arrowMainMenu = $('.arrow-main-menu-m');

      for (let i = 0; i < arrowMainMenu.length; i++) {
        $(arrowMainMenu[i]).on('click', function () {
          $(this).parent().find('.sub-menu-m').slideToggle();
          $(this).toggleClass('turn-arrow-main-menu-m');
        });
      }

      $(window).resize(function () {
        if ($(window).width() >= 992) {
          if ($('.menu-mobile').css('display') === 'block') {
            $('.menu-mobile').css('display', 'none');
            $('.btn-show-menu-mobile').toggleClass('is-active');
          }

          $('.sub-menu-m').each(function () {
            if ($(this).css('display') === 'block') {
              console.log('hello');
              $(this).css('display', 'none');
              $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
            }
          });

        }
      });

      /*==================================================================
   [ Cart ]*/
      $('.js-show-cart').on('click', function () {
        $('.js-panel-cart').addClass('show-header-cart');
      });

      $('.js-hide-cart').on('click', function () {
        $('.js-panel-cart').removeClass('show-header-cart');
      });

      /*==================================================================
      [ Cart ]*/
      $('.js-show-sidebar').on('click', function () {
        $('.js-sidebar').addClass('show-sidebar');
      });

      $('.js-hide-sidebar').on('click', function () {
        $('.js-sidebar').removeClass('show-sidebar');
      });

      /*==================================================================
      [ +/- num product ]*/
      $('.btn-num-product-down').on('click', function () {
        const numProduct = Number($(this).next().val());
        if (numProduct > 0) $(this).next().val(numProduct - 1);
      });

      $('.btn-num-product-up').on('click', function () {
        const numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
      });

      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        const nameTab = $(e.target).attr('href');
        $(nameTab).find('.slick2').slick('reinit');
      });
    })(jQuery);
  }

  ngOnDestroy() {
  }

  htmlStrTxt: any;
  cap: any;
  menudacap: any;
  tree = [
    {
      id: 1,
      parenID: 0,
      tendulieu: 'Trang chủ',
      link: 'trang-chu',
      check: false
    },
    {
      id: 2,
      parenID: 0,
      tendulieu: 'Giới thiệu',
      link: 'danh-sach-san-pham',
      check: true
    }, {
      id: 3,
      parenID: 0,
      tendulieu: 'Tin tức',
      link: 'tin-tuc',
      check: true
    }, {
      id: 4,
      parenID: 0,
      tendulieu: 'Khám chữa bệnh',
      link: 'danh-sach-san-pham',
      check: false
    }, {
      id: 5,
      parenID: 0,
      tendulieu: 'Dịch vụ',
      link: 'danh-sach-san-pham',
      check: false
    }, {
      id: 6,
      parenID: 0,
      tendulieu: 'Đào taọ trực tuyến',
      link: 've-chung-toi',
      check: false
    }, {
      id: 7,
      parenID: 0,
      tendulieu: 'Liên lạc',
      link: 'lien-he',
      check: false
    }, {
      id: 8,
      parenID: 3,
      tendulieu: 'Tin tức sự kiện',
      check: false
    },
    {
      id: 9,
      parenID: 3,
      tendulieu: 'Y học thưởng thức',
      check: false
    },
    {
      id: 10,
      parenID: 3,
      tendulieu: 'Ý kiến khách hàng',
      check: false
    },  {
      id: 11,
      parenID: 2,
      tendulieu: 'Ban giám đốc',
      check: false
    },  {
      id: 12,
      parenID: 2,
      tendulieu: 'Lịch sử bệnh viện',
      check: false
    }
    // {
    //   id: 9,
    //   parenID: 0,
    //   tendulieu: 'lv1',
    //   check: true
    // }, {
    //   id: 10,
    //   parenID: 0,
    //   tendulieu: 'lv1',
    //   check: false
    // }, {
    //   id: 11,
    //   parenID: 0,
    //   tendulieu: 'lv1',
    //   check: false
    // }, {
    //   id: 12,
    //   parenID: 0,
    //   tendulieu: 'lv1',
    //   check: false
    // }, {
    //   id: 13,
    //   parenID: 9,
    //   tendulieu: 'lv2',
    //   check: false
    // }, {
    //   id: 14,
    //   parenID: 8,
    //   tendulieu: 'lv4',
    //   check: false
    // }, {
    //   id: 15,
    //   parenID: 8,
    //   tendulieu: 'lv4',
    //   check: false
    // }, {
    //   id: 16,
    //   parenID: 8,
    //   tendulieu: 'lv4',
    //   check: false
    // }
  ];

  dequy(parent, level, a) {
    if (a === 1) {
      this.htmlStrTxt = '<ul class="main-menu">';
    }
    if (a !== 1) {
      this.htmlStrTxt = '<ul class="list_tieu_de">';
    }
    a++;
    for (let x = 0; x < this.tree.length; x++) {
      if (this.tree[x].parenID === parent) {
        this.htmlStrTxt += '<li class="tieu_de level-' + level + '"><a href="/ltnc/' + this.tree[x].link + '" class="nd_tieu_de">' + this.tree[x].tendulieu + '</a>';
        if (this.tree[x].check) {
          if (level !== 0) {
            this.htmlStrTxt += '<span class="caret"><i class="fa fa-caret-right" aria-hidden="true"></i></span>';
          } else {
            this.htmlStrTxt += '<span class="caret"><i class="fa fa-caret-down" aria-hidden="true"></i></span>';
          }
          this.htmlStrTxt += this.dequy(this.tree[x].id, level + 1, 0);
        }
        this.htmlStrTxt += '</li>';
      }
    }
    if (this.cap < level) {
      this.cap = level;
    }
    return this.htmlStrTxt + '</ul>';
  }

  over() {
    $(function () {
      // let cap = $('#menu').attr('data-cap');
      for (let i = 0; i < 4; i++) {
        $('.level-' + i).hover(function () {
          $(this).children('ul').addClass('hienthimenu');
        }, function () {
          $(this).children('ul').removeClass('hienthimenu');
        });
      }
    });
  }

  out() {
  }

  constructor(private router: Router,
  ) {

  }


}
