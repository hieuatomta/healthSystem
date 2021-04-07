import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductsSellingComponent} from './products-selling.component';

const routes: Routes = [{
  path: '',
  component: ProductsSellingComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SizesRoutingModule { }

export const routedComponents = [
  ProductsSellingComponent,
];
