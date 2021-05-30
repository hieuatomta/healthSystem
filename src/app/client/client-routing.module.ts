import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeClientComponent} from './home_client/home-client.component';
import {AboutComponent} from './introduce/about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ClientComponent} from './client.component';
import {BlogComponent} from './news/blog/blog.component';
import {BlogDetailComponent} from './news/blog-detail/blog-detail.component';
import {DiagnoseComponent} from './expert-system/diagnostic/diagnose/diagnose.component';
import {GeneralSignsComponent} from './expert-system/diagnostic/generalSigns/generalSigns.component';
import {RadioCheckBoxComponent} from './expert-system/diagnostic/radioCheckBox/radioCheckBox.component';
import {BgdComponent} from './introduce/bgd/bgd.component';
import {KnowledgeComponent} from './expert-system/knowledges/knowledge/knowledge.component';
import {KnowledgeKeyComponent} from './expert-system/knowledges/knowledge-key/knowledge-key.component';
import {TreatmentComponent} from './expert-system/treatments/treatment/treatment.component';
import {TreatmentKeyComponent} from './expert-system/treatments/treatment-key/treatment-key.component';
import {ClinicalComponent} from './expert-system/diagnostic/clinical/clinical.component';
import {SubclinicalComponent} from './expert-system/diagnostic/subclinical/subclinical.component';
import {EvaluateComponent} from './expert-system/evaluate/evaluate.component';
import {StageComponent} from './expert-system/diagnostic/stage/stage.component';
import {StreatmentComponent} from './expert-system/diagnostic/streatment/streatment.component';


const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'trang-chu',
        component: HomeClientComponent,
      },
      {
        path: 'tin-tuc/:key',
        component: BlogComponent,
      },
      {
        path: 'chi-tiet-tin-tuc/:key',
        component: BlogDetailComponent,
      },
      {
        path: 've-chung-toi',
        component: AboutComponent,
      },
      {
        path: 'tri-thuc',
        component: KnowledgeComponent,
      },
      {
        path: 'dieu-tri',
        component: TreatmentComponent,
      },
      {
        path: 'dieu-tri/:key',
        component: TreatmentKeyComponent,
      },
      {
        path: 'tri-thuc/:key',
        component: KnowledgeKeyComponent,
      },
      {
        path: 'ban-giam-doc',
        component: BgdComponent,
      },
      {
        path: 'chan-doan',
        component: DiagnoseComponent,
      },
      {
        path: 'chan-doan/dau-hieu-chung',
        component: GeneralSignsComponent,
      },
      {
        path: 'chan-doan/dieu-tri/:key',
        component: StreatmentComponent,
      },
      {
        path: 'chan-doan/lam-sang',
        component: ClinicalComponent,
      },
      {
        path: 'chan-doan/giai-doan',
        component: StageComponent,
      },
      {
        path: 'chan-doan/can-lam-sang',
        component: SubclinicalComponent,
      },
      {
        path: 'chan-doan/:key',
        component: RadioCheckBoxComponent,
      },
      {
        path: 'danh-gia',
        component: EvaluateComponent,
      }, {
        path: 'lien-he',
        component: ContactComponent,
      },
      {
        path: '',
        redirectTo: 'trang-chu',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
}
