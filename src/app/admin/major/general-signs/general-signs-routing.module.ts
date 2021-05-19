import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GeneralSignsComponent} from './general-signs.component';

const routes: Routes = [{
  path: '',
  component: GeneralSignsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SizesRoutingModule { }

export const routedComponents = [
  GeneralSignsComponent,
];
