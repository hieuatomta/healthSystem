import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TestDiseaseComponent} from './test-disease.component';

const routes: Routes = [{
  path: '',
  component: TestDiseaseComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SizesRoutingModule { }

export const routedComponents = [
  TestDiseaseComponent,
];
