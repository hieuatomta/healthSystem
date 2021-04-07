import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StatisticalComponent} from './statistical.component';

const routes: Routes = [{
  path: '',
  component: StatisticalComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SizesRoutingModule { }

export const routedComponents = [
  StatisticalComponent,
];
