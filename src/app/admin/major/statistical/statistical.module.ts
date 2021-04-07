import {NgModule} from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToggleModule,
  NbUserModule,
} from '@nebular/theme';
import {NbMomentDateModule} from "@nebular/moment";

import {ThemeModule} from '../../../@theme/theme.module';

import {SizesRoutingModule} from './statistical-routing.module';
import {StatisticalUpdateComponent} from './statistical-update/statistical-update.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../../shares/shared.module';
import {StatisticalComponent} from './statistical.component';
import {ChartModule} from 'angular2-chartjs';
import {ChartsModule} from '../../demo/charts/charts.module';
import {NgxEchartsModule} from 'ngx-echarts';


@NgModule({
  imports: [
    ThemeModule,
    SizesRoutingModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    Ng2SmartTableModule,
    NbFormFieldModule,
    TranslateModule,
    NgSelectModule, SharedModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NbSpinnerModule, NbToggleModule, ChartModule, ChartsModule, NgxEchartsModule, NbMomentDateModule
  ],
  entryComponents: [
    StatisticalUpdateComponent
  ],
  declarations: [StatisticalComponent, StatisticalUpdateComponent],
})
export class StatisticalModule {
}
