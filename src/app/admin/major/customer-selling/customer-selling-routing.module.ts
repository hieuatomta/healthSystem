import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CustomerSellingComponent} from './customer-selling.component';

const routes: Routes = [{
  path: '',
  component: CustomerSellingComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SizesRoutingModule { }

export const routedComponents = [
  CustomerSellingComponent,
];
