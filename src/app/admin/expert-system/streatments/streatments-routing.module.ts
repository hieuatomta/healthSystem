import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StreatmentsComponent} from './streatments.component';

const routes: Routes = [{
  path: '',
  component: StreatmentsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SizesRoutingModule { }

export const routedComponents = [
  StreatmentsComponent,
];
