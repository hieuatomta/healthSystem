import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SubclinicalComponent} from './subclinical.component';

const routes: Routes = [{
  path: '',
  component: SubclinicalComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SizesRoutingModule { }

export const routedComponents = [
  SubclinicalComponent,
];
