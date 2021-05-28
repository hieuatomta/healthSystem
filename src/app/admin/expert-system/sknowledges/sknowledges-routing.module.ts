import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SknowledgesComponent} from './sknowledges.component';

const routes: Routes = [{
  path: '',
  component: SknowledgesComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SizesRoutingModule { }

export const routedComponents = [
  SknowledgesComponent,
];
