import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NewsApprovalManagementComponent} from './news-approval-management.component';

const routes: Routes = [{
  path: '',
  component: NewsApprovalManagementComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsApprovalManagementRoutingModule { }

export const routedComponents = [
  NewsApprovalManagementComponent,
];
