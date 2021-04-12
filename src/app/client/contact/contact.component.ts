import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./contact.component.scss'],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    function initMap() {
      const uluru = {
        lat: -25.363,
        lng: 131.044
      };
      const grayStyles = [{
        featureType: "all",
        stylers: [{
          saturation: -90
        },
          {
            lightness: 50
          }
        ]
      },
        {
          elementType: 'labels.text.fill',
          stylers: [{
            color: '#ccdee9'
          }]
        }
      ];
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: -31.197,
          lng: 150.744
        },
        zoom: 9,
        // styles: grayStyles,
        scrollwheel: false
      });
    }
  }
}
