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

import {SizesRoutingModule} from './customer-selling-routing.module';
import {SupplierUpdateComponent} from './supplier-update/supplier-update.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule, FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../../shares/shared.module';
import {CustomerSellingComponent} from './customer-selling.component';
import {Angular2CsvModule} from 'angular2-csv';
import {ExcelService} from './excel.service';


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
    FormsModule,
    Angular2CsvModule,
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
    SupplierUpdateComponent
  ],
  declarations: [CustomerSellingComponent, SupplierUpdateComponent],
  providers: [ExcelService],
})
export class CustomerSellingModule {
}
