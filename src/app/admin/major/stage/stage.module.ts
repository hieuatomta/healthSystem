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

import {SizesRoutingModule} from './stage-routing.module';
import {StageUpdateComponent} from './stage-update/stage-update.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../../shares/shared.module';
import {StageComponent} from './stage.component';
import { MapPopupComponent } from './map-popup/map-popup.component';
import {TestDiseaseModule} from '../test-disease/test-disease.module';


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
    NbSpinnerModule, NbToggleModule, TestDiseaseModule,
  ],
  entryComponents: [
    StageUpdateComponent
  ],
  declarations: [StageComponent, StageUpdateComponent, MapPopupComponent],
})
export class StageModule {
}
