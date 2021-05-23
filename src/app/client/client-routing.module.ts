import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeClientComponent} from './home_client/home-client.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ClientComponent} from './client.component';
import {BlogComponent} from './blog/blog.component';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';
import {DiagnoseComponent} from './diagnose/diagnose.component';
import {GeneralSignsComponent} from './generalSigns/generalSigns.component';
import {RadioCheckBoxComponent} from './radioCheckBox/radioCheckBox.component';
import {BgdComponent} from './bgd/bgd.component';
import {KnowledgeComponent} from './knowledge/knowledge.component';
import {KnowledgeKeyComponent} from './knowledge-key/knowledge-key.component';
import {TreatmentComponent} from './treatment/treatment.component';
import {TreatmentKeyComponent} from './treatment-key/treatment-key.component';
import {ClinicalComponent} from './clinical/clinical.component';


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
        path: 'chan-doan/lam-san',
        component: ClinicalComponent,
      },
      {
        path: 'chan-doan/:key',
        component: RadioCheckBoxComponent,
      },
      {
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
