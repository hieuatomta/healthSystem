import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NewsManagementComponent} from './news-management.component';

const routes: Routes = [{
  path: '',
  component: NewsManagementComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsManagementRoutingModule { }

export const routedComponents = [
  NewsManagementComponent,
];
