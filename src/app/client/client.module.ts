import {NgModule} from '@angular/core';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbRadioModule,
  NbSpinnerModule,
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
import {AboutComponent} from './introduce/about/about.component';
import {ContactComponent} from './contact/contact.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchFilterComponent} from './news/search-filter/search-filter.component';
import {JwPaginationModule} from 'jw-angular-pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import {BlogComponent} from './news/blog/blog.component';
import {BlogDetailComponent} from './news/blog-detail/blog-detail.component';
import {ListCategoryComponent} from './news/listCategory/listCategory.component';
import {RecentPostComponent} from './news/recent-post/recent-post.component';
import {NewsLetterComponent} from './news/news-letter/news-letter.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {DiagnoseComponent} from './expert-system/diagnostic/diagnose/diagnose.component';
import {GeneralSignsComponent} from './expert-system/diagnostic/generalSigns/generalSigns.component';
import {RadioCheckBoxComponent} from './expert-system/diagnostic/radioCheckBox/radioCheckBox.component';
import {BgdComponent} from './introduce/bgd/bgd.component';
import {AgmCoreModule} from '@agm/core';
import {KnowledgeComponent} from './expert-system/knowledges/knowledge/knowledge.component';
import {KnowledgeKeyComponent} from './expert-system/knowledges/knowledge-key/knowledge-key.component';
import {TreatmentComponent} from './expert-system/treatments/treatment/treatment.component';
import {TreatmentKeyComponent} from './expert-system/treatments/treatment-key/treatment-key.component';
import {ClinicalComponent} from './expert-system/diagnostic/clinical/clinical.component';
import {SubclinicalComponent} from './expert-system/diagnostic/subclinical/subclinical.component';
import {EvaluateComponent} from './expert-system/evaluate/evaluate.component';
import {StageComponent} from './expert-system/diagnostic/stage/stage.component';
import {StreatmentComponent} from './expert-system/diagnostic/streatment/streatment.component';


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
    PdfViewerModule,
    NbRadioModule,
    AgmCoreModule
  ],
  declarations: [
    SearchFilterComponent,
    ClientComponent,
    BlogComponent,
    BlogDetailComponent,
    HomeClientComponent,
    AboutComponent, BgdComponent,
    ContactComponent,
    ListCategoryComponent,
    RecentPostComponent,
    NewsLetterComponent, DiagnoseComponent, GeneralSignsComponent, RadioCheckBoxComponent, KnowledgeComponent,
    KnowledgeKeyComponent, TreatmentComponent, TreatmentKeyComponent, ClinicalComponent, SubclinicalComponent, EvaluateComponent, StageComponent, StreatmentComponent
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
