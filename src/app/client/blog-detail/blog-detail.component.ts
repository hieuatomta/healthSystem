import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductsService} from '../../@core/services/products.service';
import {HttpHeaders} from '@angular/common/http';

declare var $: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./blog-detail.component.scss'],
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }
  key: any;
  key1: any;
  arr = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productsService: ProductsService,
              private route: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.key = params['key'];
      this.key1 = params['key1'];
      console.log(this.key)
      console.log(this.key1)
    });

    this.productsService.doSearch1({
      page: 0,
      page_size: 10,
      code: this.key
    }).subscribe(res => {
        this.onSuccess(res.body.data, res.headers, 0);
      },
      (error) => {
      });
  }


  onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.arr = data.list;
  }

  ngOnInit(): void {

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
