import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TypeDiseaseComponent} from './type-disease.component';

const routes: Routes = [{
  path: '',
  component: TypeDiseaseComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SizesRoutingModule { }

export const routedComponents = [
  TypeDiseaseComponent,
];
