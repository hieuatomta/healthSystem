import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductsService} from '../../@core/services/products.service';
import {HttpHeaders} from '@angular/common/http';

declare var $: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./blog.component.scss'],
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  onClick() {
    this.router.navigate(['/trang-chu']);
    // console.log("sa");
  }

  key: any;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productsService: ProductsService,
              private route: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.key = params['key'];
    });
  }

  arr = [];
  onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    // this.page.count = data.totalPages;
    // this.page.offset = page || 0;
    this.arr = data.list;
    console.log(data);
    console.log(this.arr)
    // this.rows = data.list || [];
    // console.log(this.rows);
    // this.obj = this.rows[0];
    // this.inputForm.get('id').setValue(this.rows[0]?.id);
    // this.inputForm.get('cost').setValue(this.rows[0]?.cost);
    // this.inputForm.get('name').setValue(this.rows[0]?.name);
    // this.inputForm.get('imageLink').setValue(this.rows[0]?.DS_Image[0].imageLink);
  }

  ngOnInit(): void {

    this.productsService.doSearch1({
      page: 0,
      page_size: 10,
      code: this.key
    }).subscribe(res => {
        this.onSuccess(res.body.data, res.headers, 0);
        // this.loading = false;
      },
      (error) => {
        // this.loading = false;
      });


    const $topeContainer = $('.isotope-grid');
    const $filter = $('.filter-tope-group');
    // filter items on button click
    $filter.each(function () {
      $filter.on('click', 'button', function () {
        const filterValue = $(this).attr('data-filter');
        $topeContainer.isotope({filter: filterValue});
      });
    });
    // init Isotope
    $(window).on('load', function () {
      const $grid = $topeContainer.each(function () {
        $(this).isotope({
          itemSelector: '.isotope-item',
          layoutMode: 'fitRows',
          percentPosition: true,
          animationEngine: 'best-available',
          masonry: {
            columnWidth: '.isotope-item'
          }
        });
      });
    });

    const isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function () {
      $(this).on('click', function () {
        for (let i = 0; i < isotopeButton.length; i++) {
          $(isotopeButton[i]).removeClass('how-active1');
        }

        $(this).addClass('how-active1');
      });
    });

  }
}
