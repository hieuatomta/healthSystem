import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../@core/services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from '../../@core/mock/toastr-service';

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


  constructor(private router: Router,
              private route: ActivatedRoute) {

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
