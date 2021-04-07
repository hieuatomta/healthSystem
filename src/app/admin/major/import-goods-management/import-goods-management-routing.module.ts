import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ImportGoodsManagementComponent} from './import-goods-management.component';

const routes: Routes = [{
  path: '',
  component: ImportGoodsManagementComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportGoodsManagementRoutingModule { }

export const routedComponents = [
  ImportGoodsManagementComponent,
];
