import {NgModule} from '@angular/core';
import {
  NbAlertModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSpinnerModule,
  NbButtonModule,
} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {ClientRoutingModule} from './client-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientComponent} from './client.component';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shares/shared.module';
import {HomeClientComponent} from './home_client/home-client.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import {ShopingCartComponent} from './shoping-cart/shoping-cart.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductComponent} from './products/product.component';
import {SearchFilterComponent} from './search-filter/search-filter.component';
import {ListProductComponent} from './list-product/list-product.component';
import {JwPaginationModule} from 'jw-angular-pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import {BlogComponent} from './blog/blog.component';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';
import {ListCategoryComponent} from './listCategory/listCategory.component';
import {RecentPostComponent} from './recent-post/recent-post.component';
import { NewsLetterComponent } from './news-letter/news-letter.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';


@NgModule({
    imports: [
        JwPaginationModule,
        ClientRoutingModule,
        ThemeModule,
        NbMenuModule,
        NbCardModule,
        NbAlertModule,
        FormsModule,
        NbInputModule,
        NbCheckboxModule,
        NbIconModule,
        ReactiveFormsModule,
        NbLayoutModule,
        NbSpinnerModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        ReactiveFormsModule,
        TranslateModule,
        NbButtonModule,
        SharedModule,
        SlideshowModule,
        NgbModule,
        NgSelectModule,
        PdfViewerModule
    ],
  declarations: [
    SearchFilterComponent,
    ClientComponent,
    BlogComponent,
    BlogDetailComponent,
    HomeClientComponent,
    ShopingCartComponent,
    AboutComponent,
    ContactComponent,
    ProductDetailComponent,
    ListProductComponent,
    ProductComponent,
    ListCategoryComponent,
    RecentPostComponent,
    NewsLetterComponent,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Ldch8gZAAAAAOAujSVYWFyoWkTaNgBNzE6qyxwg',
      } as RecaptchaSettings,
    }]
})
export class ClientModule {
}
