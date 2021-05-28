import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LogsEvaluatesComponent} from './logs-evaluates.component';

const routes: Routes = [{
  path: '',
  component: LogsEvaluatesComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsEvaluatesRoutingModule { }

export const routedComponents = [
  LogsEvaluatesComponent,
];
