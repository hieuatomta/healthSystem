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

import {ThemeModule} from '../../../@theme/theme.module';

import {SizesRoutingModule} from './streatments-routing.module';
import {StreatmentsUpdateComponent} from './streatments-update/streatments-update.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../../shares/shared.module';
import {StreatmentsComponent} from './streatments.component';


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
    NbSpinnerModule, NbToggleModule,
  ],
  entryComponents: [
    StreatmentsUpdateComponent
  ],
  declarations: [StreatmentsComponent, StreatmentsUpdateComponent],
})
export class StreatmentsModule {
}
